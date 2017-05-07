<template lang="pug">
.app-plate
  template(v-for="(sortItem,sortKey) in appList")
    AppTitle(:title="sortKey")
    .grid
      .grid-item(v-for="(item,key) in sortItem",:key="item.id") 
        v-touch.touch(tag="div",v-on:press="pressItem(item)",v-on:tap="openStart(item)")
        img(slot="icon",:src="item.icon")
        p {{item.name}}
        .choose.ico(tag="div",v-show="item.isSelect") &#xe608;
      .clear
  .delate(v-on:click="delateApp",v-if="selectNumber > 0") 删除
  Toast
</template>

<script>
import AppTitle from '../brick/AppTitle'
import { Order } from '../Order.js'
import { timeoutDetection, CHANNEL, DATA, log } from "../method.js" 
import Toast from '../brick/Toast'
import localforage from 'localforage'
//------------------触摸控件------------------
import Vue from 'vue';
import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'});
//-------------------------------------------

//引入图片资源
const $TGYY = require('../../assets/TGYY.png'),
      $XXFB        = require('../../assets/XXFB.png'),
      $YJ          = require('../../assets/YJ.png'),
      $XTBG    = require('../../assets/XTBG.png');
export default {
  components: {
    AppTitle,
    Toast
  },
  data () {
    return {
      index: 0,
      selectNumber:0, //长按选中个数
      appData: null,
      appList: {},
      showList: [""],
      installedAppID: []
    }
  },
  created(){
    Order.$on('appInstall', (message) => {
      this.appList = {} //不知道为什么需要清除一次
      this.appList = message
    })
    this.appList = {
      "办公应用": [
        { id:10002, name: "邮件", icon: $YJ, url: 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+DATA.idCard, status: 1, main:true },
        { id:10001, name: "信息发布", icon: $XXFB, url: 'http://info.casic.cs/jeecms2/index/mobile/', status: 1, main:true}
      ],
      "通讯应用":[
        { id:10003, name: "天宫圆圆", icon:$TGYY, url: "#", status: 1, main:true },
      ]
    }
    this.installedAppID = ["10002","10001","10003"]
    //--------------------------------------------------集团用户判断--------------------------------------------------
    if(DATA.unitId == "1"){
      const officeAppUrl = 'http://10.152.36.26:8080/portal/menu.jsp?userName='+DATA.userName+'&PID='+DATA.idCard+'&webService=&SessionID='
      this.appList["办公应用"].unshift({ 
        id:10004, 
        name: "协同办公", 
        icon: $XTBG, 
        url: officeAppUrl,
        status: 1, 
        main: true 
      })
      this.installedAppID.push("10004")
    }
    DATA.appList = this.appList //存储
    //--------------------------------------------------处理在线应用--------------------------------------------------
    Order.$on('appInfos', (message) => {
      let newAppList = this.appList
      
      //整理数据
      message.appInfos.forEach(function(element) {
        const className = element.appClassify.classifyName //应用分类名称
        element.appInfoList.forEach(function(item) {
          //将此应用的ID添加到已安装应用名单
          const newAppData = {
            id: item.id,
            name: item.name,
            icon: item.icon,
            url: item.homeUrl,
            status: 1
          }
          //应用列表是否包含此分类检测
          if(newAppList[className] === undefined){ newAppList[className] = []}
          newAppList[className].push(newAppData)
          this.installedAppID.push(item.id)
        }, this);
      }, this);
      //存储数据
      setTimeout(() => {
        this.appList = {} //不知道为什么需要清空一次
        this.appList = newAppList
        DATA.appList = this.appList
        DATA.installedAppID = this.installedAppID
        localforage.getItem("appData",(err,appData) => {
          appData.appList = newAppList
          appData.installedAppID = this.installedAppID
          localforage.setItem('appData', appData)
        })
      }, 0);
    })
    CHANNEL.queryAppStore(JSON.stringify({type:"1"}))
  },
  methods: {
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
      if(thisApp.main) {Order.$emit('Toast', '系统应用不可卸载！');} //如果是系统应用不可删除
      else{
        //将对应的appItem改为可视
        thisApp.isSelect = true
        //计数加1
        this.selectNumber++
      }
    },
    delateApp:function(){
      const _appList = this.appList
      let   mark    = false ;  //用于标记用户是否有删除app
      this.installedAppID = [] //清空已安装应用列表
      for(let item in _appList){
        _appList[item].forEach(function(element,index) {
          //将没用被用户选择的应用筛选出来放入新的Json对象，如果有选择的标记mark
          if(element.isSelect){
            //删除数组中的一项
            if(_appList[item].length > 1) { _appList[item].splice(index,1) }
            //删除Json中的属性
            else{ delete _appList[item] }
            setTimeout(()=>{
              CHANNEL.queryAppStore(JSON.stringify({type:"7",id:element.id}))
            },0)
            mark = true
          }
          else{
            this.installedAppID.push(element.id + "")
          }
        }, this);
      }
      if(mark) {  //如果标记mark为真，那就证明有应用被删除了，这时候把新的应用列表写到数据库
        DATA.installedAppID = this.installedAppID
        Order.$emit("delateApp", this.installedAppID);
        setTimeout(() => {
          //this.appList = {} //不知道为什么需要清空一次
          this.appList = _appList
          localforage.getItem("appData",(err,appData) => {
            appData.appList = newAppList
            appData.installedAppID = this.installedAppID
            localforage.setItem('appData', appData)
          })
        }, 0);
      }
      this.selectNumber = 0
      Order.$emit('Toast', '应用卸载成功！');
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
    },
    down:function(){
        log("sdsdsd")
    }
  }
}
</script>

<style lang='less' scoped>
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
    overflow: hidden;
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
</style>