<template lang="pug">
.app-plate
  vroll.scroll(ref="iscroll",:options="{preventDefault: false}")
    template(v-for="(sortItem,sortKey) in appList")
      AppTitle(:title="sortKey")
      .grid
        .grid-item(v-for="(item,key) in sortItem",:key="item.id") 
          v-touch.touch(tag="div",v-on:press="pressItem(item)",v-on:tap="openStart(item)")
          img(slot="icon",:src="item.icon")
          p {{item.name}}
          .choose.ico(tag="div",v-show="item.isSelect") &#xe608;
        .clear
  .delate.ico(v-on:click="delateApp",v-if="selectNumber > 0") &#xe6ff;
  Toast
</template>

<script>
import AppTitle from '../brick/AppTitle'
import { Order } from '../Order.js'
import { timeoutDetection, DATA, log, recover, CHANNEL } from "../method.js" 
import Toast from '../brick/Toast'
import localforage from 'localforage'
import { QWebChannel } from  "../QTWebChannel"


//引入图片资源
const $TGYY = require('../../assets/TGYY.png'),
      $XXFB    = require('../../assets/XXFB.png'),
      $YJ      = require('../../assets/YJ.png'),
      $XTBG    = require('../../assets/XTBG.png'),
      $GWGL    = require('../../assets/GWGL.png');
export default {
  components: {
    AppTitle,
    Toast
  },
  data () {
    return {
      selectNumber:0, //长按选中个数
      appData: null,
      appList: {},
      installedAppID: []
    }
  },
  created(){
    //判断是否为debug模式
    if(DATA.debug){
      this.appList = {
        "办公应用": [
          { id:100004, type: 2 , name: "安全邮件", icon: $YJ, homeUrl: 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+DATA.org.usbkeyidentification, main:false },
          { id:100003, type: 2 , name: "信息发布", icon: $XXFB, homeUrl: 'http://info.casic.cs/jeecms2/index/mobile/', main:true}
        ],
        "通讯应用":[
          { id:100002, type: 2 , name: "天工圆圆", icon:$TGYY, homeUrl: "linkdood:showlinkdood?id={{usbkeyidentification}}", main:true },
        ]
      }
      return
    }
    //监听应用安装通知
    Order.$on('appInstall', (message) => {
      this.installedAppID = DATA.installedAppID
      setTimeout(()=>{
        this.appList = message
      },0)
    })
    //防止内存数据被清空
    if(!DATA.org.enname === "测试用户"){
      localforage.getItem("appData",(err,appData) => {
        DATA.org = appData.org
        DATA.appList = appData.appList
        DATA.installedAppID = appData.installedAppID
        this.appList = appData.appList
      })
      return;
    }
    if(false){
      this.appList = DATA.appList
    }
    else{
      //生成默认应用列表
      this.appList = {
        "办公应用": [
          { id:100004, type: 2 , name: "安全邮件", icon: $YJ, homeUrl: 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID={{idCard}}', main:true },
          { id:100003, type: 2 , name: "信息发布", icon: $XXFB, homeUrl: 'http://info.casic.cs/jeecms2/index/mobile/', main:true}
        ],
        "通讯应用":[
          { id:100002, type: 1 , name: "天工圆圆", icon:$TGYY, homeUrl: "linkdood:showlinkdood?id={{idCard}}", main:true },
        ]
      }
      this.installedAppID = ["100004","100003","100002"]
      //--------------------------------------------------集团用户判断--------------------------------------------------
      if(DATA.org.unitId == "1"){
        const officeAppUrl = 'http://10.152.36.33:8080/portal/menu.jsp?userName={{userName}}&PID={{idCard}}&webService=&SessionID='
        this.appList["办公应用"].unshift({ id:100000, type: 2, name: "协同办公", icon: $XTBG, homeUrl: officeAppUrl, main: true })
        this.installedAppID.push("100000")
      }
      else{
        const GWGLURL = 'casicoa:showOA?pid={{idCard}}&sessionID=54545333'
        this.appList["办公应用"].unshift({ id:100001, type: 1, name: "公文管理", icon: $GWGL, homeUrl: GWGLURL, main: true })
        this.installedAppID.push("100000")
      }
      DATA.appList = this.appList //存储
    }

    //--------------------------------------------------处理在线应用--------------------------------------------------
    Order.$once('appInfos', (message) => {
      let newAppList = this.appList
      //整理数据
      message.appInfos.forEach(function(element) {
        const className = element.appClassify.classifyName //应用分类名称
        element.appInfoList.forEach(function(item) {
          if(item.type === 1) item.homeUrl = item.activityName
          //应用列表是否包含此分类检测
          if(newAppList[className] === undefined){ newAppList[className] = []}
          newAppList[className].push(item)
          this.installedAppID.push(item.id)
        }, this);
      }, this);
      DATA.appList = this.appList
      DATA.installedAppID = this.installedAppID 
      //存储数据
      setTimeout(() => {
        this.appList = newAppList
        const iscroll = this.$refs.iscroll
        iscroll.refresh()
        localforage.getItem("appData",(err,appData) => {
          appData.org = DATA.org
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
      //调用统计接口
      const statisticalData = JSON.stringify({type:"8",appType: "2",appID: thisApp.id + "", orgID: DATA.org.orgID, unitID: DATA.org.unitId, orgCode: DATA.org.orgCode})
      CHANNEL.queryAppStore(statisticalData)
      //判断当前点击项目是否已经被选中
      if(thisApp.isSelect === true){
        thisApp.isSelect = false 
        this.selectNumber--
        return
      }
      //判断是否有应用被选中
      if(this.selectNumber > 0){
        if(thisApp.main) {Order.$emit('Toast', '系统应用不可卸载！'); return;} //如果是系统应用不可删除
        thisApp.isSelect = true
        this.selectNumber++
        return
      }
      let newUrl = thisApp.homeUrl
      newUrl = newUrl.replace("{{idCard}}",DATA.org.usbkeyidentification)
      newUrl = newUrl.replace("{{userName}}",DATA.org.enname)
      //如果是H5应用使用无地址栏浏览器打开
      if( thisApp.type === 2 ){ newUrl = newUrl.replace("http","browser") }
      //打开应用
      const app =  { "scheme": newUrl }
      CHANNEL.opensopApp(JSON.stringify(app))
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
      let   mark    = false ;  //用于标记用户是否有删除app
      this.installedAppID = [] //清空已安装应用列表
      let newList = {}
      for(let item in DATA.appList){
        DATA.appList[item].forEach(function(element,index) {
          //将没用被用户选择的应用筛选出来放入新的Json对象，如果有选择的标记mark
          if(element.isSelect){
            mark = true
            CHANNEL.uninstallSopApp(element.packageName.split("-")[0])
            CHANNEL.queryAppStore(JSON.stringify({type:"7",id:element.id}))
          }
          else{
            if(!newList[item])  newList[item] = []
            newList[item].push(element)
            this.installedAppID.push(element.id)
          }
        }, this);
      }
      if(mark) {  //如果标记mark为真，那就证明有应用被删除了，这时候把新的应用列表写到数据库
        DATA.installedAppID = this.installedAppID
        Order.$emit("delateApp", this.installedAppID);
        DATA.appList = newList
        localforage.getItem("appData",(err,appData) => {
          appData.appList = newList
          appData.installedAppID = DATA.installedAppID
          localforage.setItem('appData', appData)
        })
        setTimeout(() => {
          this.appList = DATA.appList
          this.$refs.iscroll.refresh()
        }, 0);
      }
      this.selectNumber = 0
      Order.$emit('Toast', '应用卸载成功！');
    }
  },
  activated(){
    const iscroll = this.$refs.iscroll
    iscroll.refresh()
  }
}
</script>

<style lang='less' scoped>
.app-plate{
  height: 100%;
}
.scroll{
  touch-action: none;
  overflow: hidden;
  height: 290px;
}
.grid{
  .grid-item{
    width: 75px;
    margin: 7px;
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
    height: 1rem;
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
  right: 10px;
  bottom: 60px;
  background-color: #99CC33;
  color: white;
  width: 45px;
  text-align: center;
  height: 45px;
  border-radius: 50%;
  line-height: 45px;
  z-index: 999;
  font-size: 1.2rem;
  box-shadow: 1px 2px 1px #888888;
}
</style>