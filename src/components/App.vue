<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange",:auto="true")
  template(v-for="(sortItem,sortKey) in appList")
    AppTitle(:title="sortKey")
    .grid
      .grid-item(v-for="(item,key) in sortItem",:key="item.id",v-show="item.available && item.exist") 
        v-touch.touch(tag="div",v-on:press="pressItem(sortKey,key)",v-on:tap="openStart(item.url, item.special,sortKey, key)")
        img(slot="icon",:src="item.icon")
        p {{item.name}}
        .choose.ico(tag="div",v-show="item.isSelect") &#xe608;
  template(v-for="(sortItem,sortKey) in appInfos")
    AppTitle(:title="sortItem.appClassify.classifyName")
    .grid
      .grid-item(v-for="(item,key) in sortItem.appInfoList",:key="item.id",v-show="item.status === 1") 
        v-touch.touch(tag="div",v-on:press="pressItem(sortKey,key)",v-on:tap="openStart(item.homeUrl, item.type,sortKey, key)")
        img(slot="icon",:src="item.icon")
        p {{item.name}}
  .delate(v-on:click="delateApp",v-if="selectNumber > 0") 删除
  BottomBar(index="1")
</template>

<script>
import { Swiper } from 'vux'
import AppTitle from './brick/AppTitle'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import { Order } from './Order.js'
import { timeoutDetection, CHANNEL, DATA } from "./method.js" 
import localforage from 'localforage'
//------------------触摸控件------------------
import Vue from 'vue';
import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'});
//-------------------------------------------

//引入图片资源
const $tiangongyuanyuan = require('../assets/tiangongyuanyuan.png'),
      $xinxifabu        = require('../assets/xinxifabu.png'),
      $youjian          = require('../assets/youjian.png'),
      $bangongxitong    = require('../assets/bangongxitong.png');
export default {
  components: {
    Swiper,
    AppTitle,
    TitleBar,
    BottomBar
  },
  data () {
    return {
      index: 0,
      selectNumber:0, //长按选中个数
      appData: null,
      appList: null,
      showList: [""],
      appInfos: {}
    }
  },
  created(){
    timeoutDetection() //超时处理
    //取数据库
    localforage.getItem("appData",(err,appData) => {
      Order.$on('appInfos', (message) => {
        setTimeout(() => {
          this.appInfos = message.appInfos
        }, 0);
      })
      CHANNEL.queryAppStore(JSON.stringify({type:"1"}))
      this.appData = appData; //保存应用数据
      //--------------------------------------------------轮播图处理阶段--------------------------------------------------
      //document.write(appData.showList)
      if( appData && appData.showList ) { //检测缓存是否存在
        this.showList = appData.showList //显示轮播图
        this.appList = appData.appList
        return
      }
      //如果缓存不存在向后台发送获取轮播图数据请求 {type:5}是约定的字段
      //轮播图信号监听
      Order.$on('slidesshow', (message) => {
        setTimeout(() => {
          this.showList = message //显示轮播图
          this.appData.showList = message //保存轮播图数据
          localforage.setItem('appData', this.appData) //把应用列表存储到起来
        },0);
      })
      CHANNEL.slidesshow(JSON.stringify({type:"5"})) //请求轮播数据
      //--------------------------------------------------应用处理阶段--------------------------------------------------
      
      const BanGongURL = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+appData.userData.userName+'&PID='+appData.userData.idCard+'&webService=&SessionID='
      //判断用户标识是否为 1 如果不是则将 协同办公 应用available属性设置为 false
      let officeApplication = {
        url: '',
        available: false
      };
      if(appData.userData.key == "1"){
        officeApplication.url = BanGongURL
        officeApplication.available = true
      }
      let newAppList = {
        "办公应用":{
          "bangongxitong":{
            id:"10004", 
            name:"协同办公", 
            icon:$bangongxitong,
            url: officeApplication.url, 
            special:"url", 
            type:"office",
            detail:"版本号:0.2",
            isSelect:false,
            available: officeApplication.available,
            exist:true
          },
          "youjian":{
            id: "10002", 
            name: "邮件", 
            icon: $youjian,
            url: 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+appData.userData.idCard, 
            special: "url", 
            type: "office", 
            detail:"版本号:1.6",
            isSelect: false,
            available: true,
            exist:true
          },
          "xinxifabu":{
            id: "10001", 
            name: "信息发布", 
            icon: $xinxifabu, 
            url: 'http://info.casic.cs/jeecms2/index/mobile/', 
            special: "url", 
            type:"office" ,
            detail:"版本号:0.8",
            isSelect: false,
            available: true,
            exist:true
          }
        },
        "通讯应用":{
          "tiangongyuanyuan":{
            id: "10000", 
            name: "天工圆圆", 
            icon: $tiangongyuanyuan,
            url: '', 
            special: "open", 
            type: "communication",
            detail:"版本号:1.41",
            isSelect: false,
            available: true,
            exist:true
          },
        }
      }
      this.appList = newAppList
      this.appData.appList = newAppList
    })
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
        "scheme":"linkdood:showlinkdood?id=" + DATA.idCard,
        "name":"linkdood"
      };
      //打开应用
      CHANNEL.opensopApp(JSON.stringify(app1))
    },
    openStart:function(url,special,sortKey,key){ //判断以何种方式打开应用
      const thisApp = this.appList[sortKey][key];
      //判断当前点击项目是否已经被选中
      if(thisApp.isSelect === true){
        thisApp.isSelect = false 
        this.selectNumber--
      }
      else{
        //判断是否有应用被选中
        if(this.selectNumber > 0){
          thisApp.isSelect = true
          this.selectNumber++
        }
        else{
          switch(special){
            case 'open':this.openApp();break; //启动应用 
            case 'url':window.location.href=url;break; //跳转到Url 
          }
        }
        
      }
    },
    pressItem:function(sortKey,key){ //长按app事件
      //将对应的appItem改为可视
      this.appList[sortKey][key].isSelect = true
      //计数加1
      this.selectNumber++
    },
    delateApp:function(){
      const oldList = this.appList;
      let   mark    = false ;//用于标记用户是否有删除app
      for(let Item in oldList){
        for(let item in oldList[Item]) {
          const thisApp = this.appList[Item][item]
          //将没用被用户选择的应用筛选出来放入新的Json对象，如果有选择的标记mark
          if(thisApp.isSelect){ 
            thisApp.exist = false
            thisApp.isSelect = false
            mark = true
          }
        }
        
      }
      if(mark) {  //如果标记mark为真，那就证明有应用被删除了，这时候把新的应用列表写到数据库
        //把应用列表存储到起来
        this.appData.appList = this.appList
        localforage.setItem('appData', this.appData);
      }
      this.selectNumber = 0
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
    height: 20px;
    width: 20px;
    top: -8px;
    right: 8px;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    color: teal;
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
  z-index: 999
}
</style>