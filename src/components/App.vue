<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange",:auto="true")
  template(v-for="(sortItem,sortKey) in appList")
    AppTitle(:title="sortKey")
    .grid
      .grid-item(v-for="(item,key) in sortItem",:key="item.id",v-show="item.status == 1") 
        v-touch.touch(tag="div",v-on:press="pressItem(item)",v-on:tap="openStart(item)")
        img(slot="icon",:src="item.icon")
        p {{item.name}}
        .choose.ico(tag="div",v-show="item.isSelect") &#xe608;
      .clear
  .placeholder
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
      $officeApp    = require('../assets/bangongxitong.png');
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
      onlionAppID: {},
    }
  },
  created(){
    timeoutDetection() //超时处理
    //取数据库
    localforage.getItem("appData",(err,appData) => {
      this.appData = appData; //保存应用数据
      //---------------------------------------------------缓存处理阶段---------------------------------------------------
      if( appData && appData.showList ) { //检测缓存是否存在
        this.showList = appData.showList //显示轮播图
        this.appList = appData.appList
        return
      }
      //----------------------------------------------------------------------------------------------------------------

      //--------------------------------------------------轮播图处理阶段--------------------------------------------------
      //轮播图信号监听
      Order.$on('slidesshow', (message) => {
        setTimeout(() => {
          this.showList = message //显示轮播图
          this.appData.showList = message //保存轮播图数据     
        },0);
      })
      //请求轮播数据
      CHANNEL.slidesshow(JSON.stringify({type:"5"})) 

      //--------------------------------------------------应用处理阶段--------------------------------------------------
      this.appList = {
        "办公应用": [
          { id:"10002", name: "邮件", icon: $youjian, url: 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+appData.userData.idCard, status: 1, main:true },
          { id:"10001", name: "信息发布", icon: $xinxifabu, url: 'http://info.casic.cs/jeecms2/index/mobile/', status: 1, main:true}
        ],
        "通讯应用":[
          { id:"10003", name: "天宫圆圆", icon:$tiangongyuanyuan, url: "#", status: 1, main:true },
        ]
      }
      //--------------------------------------------------集团用户判断--------------------------------------------------
      if(appData.userData.key == "1"){
        const officeAppUrl = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+appData.userData.userName+'&PID='+appData.userData.idCard+'&webService=&SessionID='
        this.appList["办公应用"].unshift({ 
          id:"10004", 
          name: "协同办公", 
          icon: $officeApp, 
          url: officeAppUrl,
          status: 1, 
          main: true 
        })
      }

      //--------------------------------------------------处理在线应用--------------------------------------------------
      Order.$on('appInfos', (message) => {
        const _this = this
        //整理数据
        message.appInfos.forEach(function(element) {
          const className = element.appClassify.classifyName //应用分类名称
          element.appInfoList.forEach(function(item) {
            //将此应用的ID添加到已安装应用名单
            _this.onlionAppID[item.id] = 1                   //  |--------------------------------------------|
            const newAppData = {                             //  |   message                                  |
              id: item.id,                                   //  |                  |---------------------|   |
              name: item.name,                               //  |  |----------|    |  element            |   |
              icon: item.icon,                               //  |  | element  |    |   |--------------|  |   |
              url: item.homeUrl,                             //  |  |----------|    |   |     item     |  |   |
              status: 1                                      //  |                  |   |--------------|  |   |
            }                                                //  |                  |---------------------|   |
                                                             //  |--------------------------------------------|
            //应用列表是否包含此分类检测                              message:原始数据  element:分类应用层 item:应用个体
            if(this.appList[className] === undefined){ this.appList[className] = []}
            this.appList[className].push(newAppData)
          }, this);
        }, this);
        //存储数据
        setTimeout(() => {
          this.appData.appList = this.appList
          this.appData.onlionAppID = this.onlionAppID
          localforage.setItem('appData', this.appData) 
        }, 0);
      })
      CHANNEL.queryAppStore(JSON.stringify({type:"1"}))
    })
  },
  methods: {
    onIndexChange: function(index) { //轮播图
      this.index = index
    },
    openStart:function(thisApp){ //判断以何种方式打开应用

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
          if(thisApp.url === '#'){
            if(!DATA.idCard) DATA.idCard = this.appData.userData.idCard
            const app1 = {
              "type":2,
              "sopid":"com.vrv.linkDood",
              "pkgpath":"com.vrv.linkDood-1.0.45.sop",
              "scheme":"linkdood:showlinkdood?id=" + DATA.idCard,
              "name":"linkdood"
            };
            //打开应用
            CHANNEL.opensopApp(JSON.stringify(app1))
          }
          else{
            window.location.href = thisApp.url;
          }
        }
      }
    },
    pressItem:function(thisApp){ //长按app事件
      if(thisApp.main) return //如果是系统应用不可删除
      //将对应的appItem改为可视
      thisApp.isSelect = true
      //计数加1
      this.selectNumber++
    },
    delateApp:function(){
      let   mark    = false ;  //用于标记用户是否有删除app
      for(let Item in this.appList){
        for(let thisApp in this.appList[Item]) {
          //将没用被用户选择的应用筛选出来放入新的Json对象，如果有选择的标记mark
          if(this.appList[Item][thisApp].isSelect){ 
            this.appList[Item][thisApp].status = 0
            this.appData.onlionAppID[this.appList[Item][thisApp].id] = 0
            CHANNEL.queryAppStore(JSON.stringify({type:"7",id:this.appList[Item][thisApp].id}))
            this.appList[Item][thisApp].id = 'x'
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
    },
    openUrl:function(url){
      if(url) {
        window.location.href = url
      }
      else{
        const app1 = {
          "type":2,
          "sopid":"com.vrv.linkDood",
          "pkgpath":"com.vrv.linkDood-1.0.45.sop",
          "scheme":"linkdood:showlinkdood?id=" + DATA.idCard,
          "name":"linkdood"
        };
        //打开应用
        CHANNEL.opensopApp(JSON.stringify(app1))
      }
    }
  }
}
</script>

<style lang='less'>
.grid{
  .grid-item{
    width: 75px;
    margin: 10px;
    position: relative;
    float:left;
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
  position: fixed;
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
.placeholder{
  height: 50px;
}
.clear{
  clear: both;
}
</style>