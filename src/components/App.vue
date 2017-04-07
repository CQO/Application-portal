<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange",:auto="true")
  AppTitle.bangong-title(title="办公类")
  Grid
    grid-item(v-for="item in office",:key="item")
      img(slot="icon",:src="appList[item].icon",v-on:click="openStart(appList[item].url, appList[item].special)")
      span(slot="label",v-on:click="openStart(appList[item].url, appList[item].special)") {{appList[item].name}}
  AppTitle.tongxun-title(title="通讯类")
  Grid
    grid-item(v-for="item in communication",:key="item")
      img(slot="icon",:src="appList[item].icon",v-on:click="openStart(appList[item].url, appList[item].special)")
      span(slot="label",v-on:click="openStart(appList[item].url, appList[item].special)") {{appList[item].name}}
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
      communication:['tiangongyuanyuan'],
      office:['bangongxitong','youjian', 'xinxifabu'],
      appList:{
        tiangongyuanyuan:{id:"10000", name:"天工圆圆", icon:$tiangongyuanyuan,url:'#', special:"open"},
        xinxifabu:{id:"10001", name:"信息发布", icon:$xinxifabu, url:'http://info.casic.cs/jeecms2/index/mobile/', special:"url"},
        youjian:{id:"10002", name:"邮件", icon:$youjian,url:'', special:"url"},
        bangongxitong:{id:"10004", name:"协同办公", icon:$bangongxitong,url:'', special:"url"}
      },
      showList:[
        {url: 'https://translate.google.cn/',img: $1,title: ''},
        {url: 'https://translate.google.cn/', img: $2, title: ''}
      ],
      textAlert:'',//弹出框显示文字
      showPositionValue:false,
    }
  },
  created(){
    const _this = this;
    //请求轮播图数据
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
    //获取用户名
    localforage.getItem('userData', function (err, value) {
      _this.appList.youjian.url = 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+value.idCard
      _this.appList.bangongxitong.url = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+value.userName+'&PID='+value.idCard+'&webService=&SessionID='
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
        "scheme":"linkdood:showlinkdood?id=110108198512314993&pwd=123456",
        "name":"linkdood"
      };
      //向9999端口发送Post请求打开应用
      post("http://localhost:9999/open",app1,function(date){
        console.log(date)
      });
    },
    openStart:function(url,special){ //判断以何种方式打开应用
      //document.write(url)
      switch(special){
        case 'open':this.openApp();break; //启动应用
        case 'url':window.location.href=url;break; //跳转到Url
      }
    },
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
.weui-grids{
  .weui-grid__icon{
    width: 45px;
    height: 45px;
  }
}
</style>