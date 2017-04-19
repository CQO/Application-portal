<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange",:auto="true")
  AppTitle(title="办公类")
  .grid
    .grid-item(v-for="(item,key) in appList",:key="item.id",v-show="item.available && item.exist",v-if="item.type == 'office'")
      v-touch.touch(tag="div",v-on:press="pressItem(key)",v-on:tap="openStart(item.url, item.special, key)")
      img(slot="icon",:src="item.icon")
      p {{item.name}}
      .choose.ico(v-show="item.isSelect") &#xe608;
  AppTitle(title="通讯类")
  .grid
    .grid-item(v-for="(item,key) in appList",:key="item.id",v-show="item.available && item.exist",v-if="item.type == 'communication'")
      v-touch.touch(tag="div",v-on:press="pressItem(key)",v-on:tap="openStart(item.url, item.special, key)")
      img(slot="icon",:src="item.icon")
      p {{item.name}}
      .choose.ico(tag="div",v-show="item.isSelect") &#xe608;
  .delate(v-on:click="delateApp",v-if="showDelateButton") 删除
  Toast
  BottomBar(index="1")
</template>

<script>
import { Swiper } from 'vux'
import AppTitle from './brick/AppTitle'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import Toast from './brick/Toast'
import { Order } from './Order.js'
import { post, timeoutDetection} from "./method.js" 
import localforage from 'localforage'
import { QWebChannel } from  "./QTWebChannel"

import Vue from 'vue';
import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'});
var myData = null
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
    BottomBar,
    Toast
  },
  data () {
    return {
      index: 0,
      showList: [],
      userData:null,
      appList  : {
        tiangongyuanyuan:{
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
        bangongxitong:{
          id:"10004", 
          name:"协同办公", 
          icon:$bangongxitong,
          url:'', 
          special:"url", 
          type:"office",
          detail:"版本号:0.2",
          isSelect:false,
          available: false,
          exist:true
        },
        youjian:{
          id: "10002", 
          name: "邮件", 
          icon: $youjian,
          url: '', 
          special: "url", 
          type: "office", 
          detail:"版本号:1.6",
          isSelect: false,
          available: true,
          exist:true
        },
        xinxifabu:{
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
      showDelateButton: false,//显示删除按钮
      selectNumber:0,
      appData:null
    }
  },
  created(){
    const _this = this;
    function pre(){
      if(myData === null){
        setTimeout(pre,1000)
        return null
      }
      const Data = JSON.parse(myData);
      _this.showList  = Data
      _this.appData.showList = Data
      localforage.setItem('appData', _this.appData);
    }
    setTimeout(pre,1000)
    localforage.getItem("appData",function(err,appData){
      //超时检测
      if(timeoutDetection()) return null
      _this.appData = appData
      const userData =  appData.userData
      _this.userData = appData.userData
      //轮播图处理阶段
      if( _this.appData !== null && _this.appData.showList != null){ _this.showList = _this.appData.showList; return null}
      //*应用数据* 或者 *轮播数据* 如果为空那就证明1.出了未知错误 2.第一次获取轮播数据或以前获取时获取失败了
      //向后台发送获取轮播图数据请求 {type:5}是约定的字段
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.callback.connect(function(receive) {
          myData = receive
        });
        foo.slidesshow(JSON.stringify({type:"5"}))
      })
      //--------------------------------------------------应用处理阶段--------------------------------------------------
      if(_this.appData.appList != null){
        _this.appList = _this.appData.appList
      }
      const BanGongURL = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+userData.userName+'&PID='+userData.idCard+'&webService=&SessionID='
      //判断用户标识是否为 1 如果不是则将 协同办公 应用available属性设置为 false
      if(userData.key == "1"){
        _this.appList["bangongxitong"].url = BanGongURL
        _this.appList["bangongxitong"].available = true
      }
      _this.appList["youjian"].url = 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+userData.idCard
      _this.appData.appList = _this.appList
      //--------------------------------------------------------------------------------------------------------------
      //把更改的 *应用数据* 存入数据库
      localforage.setItem('appData', _this.appData,function (err){
        if(err){
          Order.$emit('Toast', '缓存用户数据失败')
        }
      });
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
        "scheme":"linkdood:showlinkdood?id=" + this.userData.idCard,
        "name":"linkdood"
      };
      //打开应用
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.opensopApp(JSON.stringify(app1))
      });
    },
    openStart:function(url,special,key){ //判断以何种方式打开应用
      const _this = this
      //首先判断当前点击项目是否已经被选中
      if(this.appList[key].isSelect === true){
        //如果被选中 那么将它取消选中
        this.appList[key].isSelect = false
        //选中计数减少1
        this.selectNumber--
        if(this.selectNumber === 0){
          //入过已经没有应用被选中了 删除按钮消失
          this.showDelateButton = false
        }
      }
      else{
        //如果它没有被选中，但是在选择模式下
        if(this.showDelateButton === true){
          //将点击项改为选中状态
          this.appList[key].isSelect = true
          //计数加1
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
    pressItem:function(key){ //长按app事件
      //将对应的appItem改为可视
      this.appList[key].isSelect = true
      //显示删除按钮
      this.showDelateButton = true
      //计数加1
      this.selectNumber++
    },
    delateApp:function(){
      const oldList = this.appList,
            _this   = this;
      let   mark    = false ;//用于标记用户是否有删除app
      for(let item in oldList){
        //将没用被用户选择的应用筛选出来放入新的Json对象，如果有选择的标记mark
        if(oldList[item].isSelect){ 
          //将应用标记为不存在
          oldList[item].exist = false
          //将应用标记为未选择
          oldList[item].isSelect = false
          mark = true
        }
      }
      //如果标记mark为真，那就证明有应用被删除了，这时候把新的应用列表写到数据库
      if(mark) {
        //把应用列表存储到起来
        localforage.getItem("appData",function(err,appData){
          appData.appList = _this.appList
          localforage.setItem('appData', appData,function (err){
            if(err){
              Order.$emit('Toast', '缓存用户数据失败')
            }
          });
        })
      }
      //将删除按钮隐藏
      _this.showDelateButton = false
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
}
</style>