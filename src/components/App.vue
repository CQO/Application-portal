<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange",:auto="true")
  AppTitle.bangong-title(title="应用列表")
  .grid
    .grid-item(v-for="(item,key) in appList",:key="item")
      v-touch.touch(tag="div",v-on:press="pressItem(key)",v-on:tap="openStart(item.url, item.special)")
      img(slot="icon",:src="item.icon")
      p {{item.name}}
      .choose.ico(v-show="item.isSelect",v-on:click="exit(key)") &#xe608;
  .delate(v-on:click="delateApp",v-if="showDelateButton") 删除
  Toast(v-model="showPositionValue",type="text",:time="800",:text="textAlert")
  BottomBar(index="1")
</template>

<script>
import { Swiper, Grid, GridItem, Toast } from 'vux'
import Search from './panel/Search'
import AppTitle from './bar/AppTitle'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
import localforage from 'localforage'
import {post} from "./method.js" 

//引入图片资源
const $tiangongyuanyuan = require('../assets/tiangongyuanyuan.png'),
      $xinxifabu        = require('../assets/xinxifabu.png'),
      $youjian          = require('../assets/youjian.png'),
      $bangongxitong    = require('../assets/bangongxitong.png'),
      $1                = require('../assets/1.png'),
      $2                = require('../assets/2.png');
export default {
  data () {
    return {
      index: 0,
      appList:{},
      showList:[
        // {url: 'https://translate.google.cn/',img: $1,title: ''},
        // {url: 'https://translate.google.cn/', img: $2, title: ''}
      ],
      textAlert:'',//弹出框显示文字
      showPositionValue:false,
      showDelateButton:false,//显示删除按钮
      idCard:0
    }
  },
  created(){
    const _this = this;
    //请求轮播图数据
    //---------------------------------------------------------
    const data={type:5};
    post("http://localhost:9999/appRequest",data,function(d){
      if(d !=="" && d !==null){
        const Data = JSON.parse(d);
        _this.showList = Data;
      }
      else{
        _this.textAlert = '网络错误'
        _this.showPositionValue = true
      }
    });
    //---------------------------------------------------------

    //获取应用列表
    localforage.getItem('appList', function (err, value) {
      //如果没有取得数据，给应用列表一个默认值
      if(err !== null || value === "" ||value === null){
        _this.appList = {
          tiangongyuanyuan:{id:"10000", name:"天工圆圆", icon:$tiangongyuanyuan,url:'#', special:"open", type:"communication", isSelect:false},
          xinxifabu:{id:"10001", name:"信息发布", icon:$xinxifabu, url:'http://info.casic.cs/jeecms2/index/mobile/', special:"url", type:"office" ,isSelect:false},
          youjian:{id:"10002", name:"邮件", icon:$youjian,url:'', special:"url", type:"office", isSelect:false},
          bangongxitong:{id:"10004", name:"协同办公", icon:$bangongxitong,url:'', special:"url", type:"office", isSelect:false}
        }
        localforage.setItem('appList', _this.appList);
      }
      else{
        //取到数据则使用数据库中存储的数据
        _this.appList = value
      }
    });
    //获取用户名
    localforage.getItem('userData', function (err, value) {
      _this.idCard = value.idCard
      if(value.key !== 1){
        _this.appList.bangongxitong = {}
      }
      else{
        _this.appList.bangongxitong.url = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+value.userName+'&PID='+value.idCard+'&webService=&SessionID='
      }
      _this.appList.youjian.url = 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+value.idCard
    });
  },
  methods: {
    onIndexChange (index) { //轮播图
      this.index = index
    },
    openApp: function () { //打开应用
      const app1 = {
        "type":2,
        "sopid":"com.vrv.linkDood",
        "pkgpath":"com.vrv.linkDood-1.0.45.sop",
        "scheme":"linkdood:showlinkdood?id="+this.idCard,
        "name":"linkdood"
      };
      //向9999端口发送Post请求打开应用
      post("http://localhost:9999/open",app1,function(date){
        console.log(date)
      });
    },
    openStart:function(url,special){ //判断以何种方式打开应用
      switch(special){
        case 'open':this.openApp();break; //启动应用
        case 'url':window.location.href=url;break; //跳转到Url
      }
    },
    pressItem:function(key){ //长按app事件
      //将对应的appItem改为可视
      this.appList[key].isSelect = true
      //显示删除按钮
      this.showDelateButton = true
    },
    delateApp:function(){
      const oldList = this.appList,
            _this   = this;
      let   newList = {},
            mark    = false ;//用于标记用户是否有删除app
      for(let item in oldList){
        //将没用被用户选择的应用筛选出来放入新的Json对象，如果有选择的标记mark
        if(!oldList[item].isSelect){ newList[item] = oldList[item] }
        else{ mark = true; }
      }
      //如果标记mark为真，那就证明有应用被删除了，这时候把新的应用列表写到数据库
      if(mark) {
        //把应用列表存储到起来
        localforage.setItem('appList', newList, function (err){
          _this.appList = newList
        });
      }
      //将删除按钮隐藏
      _this.showDelateButton = false
    },
    exit:function(key){
      //将对应的appItem改为不可视
      this.appList[key].isSelect = false
      //隐藏删除按钮
      this.showDelateButton = false
    }
  },
  components: {
    Search,
    Swiper,
    AppTitle,
    Grid,
    GridItem,
    TitleBar,
    BottomBar,
    Toast
  }
}
</script>

<style lang='less'>
.app-box{
  .weui-grid{
    width: 75px;
    margin: 20px 10px;
    padding: 0;
  }
  .weui-grids:before{
    border-right:none;
  }
  .weui-grids:after{
    border-left:none;
  }
  .weui-grid:before{
    border-right:none;
  }
  .weui-grid:after{
    border-bottom:none;
  }
}

.grid{
  display: flex;
  .grid-item{
    width: 75px;
    margin: 10px;
    position: relative;
  }
  .touch{
    position: absolute;
    height: 100%;
    width: 100%;
  }
  img{
    height: 45px;
    margin: 0 15px;
  }
  p{
    width: 75px;
    text-align: center;
    font-size: 0.9rem;
  }
  .choose{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    top: 0;
    line-height: 70px;
    text-align: center;
    font-size: 2rem;
    color: aqua;
  }
}
.delate{
  position: absolute;
  right: 0;
  top: 0;
  background-color: #f8f8f8;
  color: blue;
  width: 60px;
  text-align: center;
  height: 45px;
  line-height: 45px;
}
</style>