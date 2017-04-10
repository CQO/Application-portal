<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange",:auto="true")
  AppTitle(title="办公类")
  .grid
    .grid-item(v-for="(item,key) in appList",:key="item.id",v-show="item.available && item.exist",v-if="item.type == 'office'")
      v-touch.touch(tag="div",v-on:press="pressItem(key)",v-on:tap="openStart(item.url, item.special)")
      img(slot="icon",:src="item.icon")
      p {{item.name}}
      .choose.ico(v-show="item.isSelect",v-on:click="exit(key)") &#xe608;
  AppTitle(title="通讯类")
  .grid
    .grid-item(v-for="(item,key) in appList",:key="item.id",v-show="item.available && item.exist",v-if="item.type == 'communication'")
      v-touch.touch(tag="div",v-on:press="pressItem(key)",v-on:tap="openStart(item.url, item.special)")
      img(slot="icon",:src="item.icon")
      p {{item.name}}
      .choose.ico(v-show="item.isSelect",v-on:click="exit(key)") &#xe608;
  .delate(v-on:click="delateApp",v-if="showDelateButton") 删除
  Toast
  BottomBar(index="1")
</template>

<script>
import { Swiper } from 'vux'
import AppTitle from './bar/AppTitle'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
import Toast from './brick/Toast'
import { Order } from './Order.js'
import { post, globalData} from "./method.js" 

import Vue from 'vue';
import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'});

export default {
  components: {
    Swiper,
    AppTitle,
    TitleBar,
    BottomBar,
    Toast
  },
  data () {
    return {
      index: 0,
      showList: [],
      appList:globalData.appList,
      showDelateButton: false,//显示删除按钮
    }
  },
  created(){
    const _this = this;
    //如果数据为空则请求轮播图数据
    if(globalData.showList.length === 0){
      post("http://localhost:9999/appRequest",{type:5},function(receiveData){
        if(receiveData !=="" && receiveData !==null){
          const Data = JSON.parse(receiveData);
          globalData.showList = Data
          _this.showList = globalData.showList
        }
        else{
          _this.showList = [
            {url: 'http://www.casic.com.cn/n101/index.html',img: 'http://puge-10017157.cossh.myqcloud.com/tianzhi/c.png',title: ''},
            {url: 'http://www.casic.com.cn/n101/index.html', img: 'http://puge-10017157.cossh.myqcloud.com/tianzhi/d.png', title: ''}
          ]
          Order.$emit('Toast', '网络错误！')
        }
      });
    }
    else{
      _this.showList = globalData.showList
    }
    // 根据用户数据生成链接
    //-------------------------------------------------------------------
    const userData = globalData.userData
    //document.write(userData.key)
    //如果身份不是所属组织将不会看到办公系统
    if( userData.key != "1" ){ 
      globalData.appList["bangongxitong"].available = false
      _this.appList["bangongxitong"].available = false
    }
    else{
      //判断办公系统应用是否存在,存在则改变其URL
      if(_this.appList.bangongxitong !== undefined){
        _this.appList.bangongxitong.url = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+userData.userName+'&PID='+userData.idCard+'&webService=&SessionID='
        globalData.appList.bangongxitong.url = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+userData.userName+'&PID='+userData.idCard+'&webService=&SessionID='
      }
    }
    if(_this.appList.youjian !== undefined){
      _this.appList.youjian.url = 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+userData.idCard
      globalData.appList.youjian.url = 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+userData.idCard
    }
    //-------------------------------------------------------------------
  },
  methods: {
    onIndexChange: function(index) { //轮播图
      this.index = index
    },
    openApp: function () { //打开应用
      const app1 = {
        "type":2,
        "sopid":"com.vrv.linkDood",
        "pkgpath":"com.vrv.linkDood-1.0.45.sop",
        "scheme":"linkdood:showlinkdood?id="+globalData.userData.idCard,
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
      let   mark    = false ;//用于标记用户是否有删除app
      for(let item in oldList){
        //将没用被用户选择的应用筛选出来放入新的Json对象，如果有选择的标记mark
        if(oldList[item].isSelect){ 
          //将应用标记为不存在
          globalData.appList[item].exist = false
          //将应用标记为未选择
          globalData.appList[item].isSelect = false
        }
        else{ mark = true; }
      }
      //如果标记mark为真，那就证明有应用被删除了，这时候把新的应用列表写到数据库
      if(mark) {
        //把应用列表存储到起来
        _this.appList = globalData.appList
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
  }
}
</script>

<style lang='less'>
.grid{
  display: flex;
  .grid-item{
    width: 75px;
    margin: 10px;
    position: relative;
  }
  .grid-item:active{
    background-color: aquamarine;
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