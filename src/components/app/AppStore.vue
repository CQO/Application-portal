<template lang="pug">
.app-store-box
  TitleBar(title='应用商店',leftIcon="ok",:rightIcon="leftIcon")
  Search
  .checker
    .checker-item(v-on:click="select='all'",:class="{ 'item-selected': select=='all' }") 全部
    .checker-item(v-for="(item,key) in selectItem",:class="{ 'item-selected': click(key) }",v-on:click="select=key",:key="key") {{item}}
  vroll.store-list
    li.app-list(v-for="item in classification",:key="item.id")
      img(:src="item.icon")
      .info
        p.name {{item.name}}
        p.detail 版本号:{{item.version}}
      .button.open(v-if="item.installed") 已安装
      .button.down(v-else,v-on:click="installApp(item,$event)") 安装
  Toast
</template>

<script>
import Search from '../brick/Search'
import TitleBar from '../brick/Title'
import localforage from 'localforage'
import { Order } from '../Order.js'
import Toast from '../brick/Toast'
import { timeoutDetection, log, DATA } from "../method.js" 
const $TGYY = require('../../assets/TGYY.png')
export default {
  components: {
    Search,
    TitleBar,
    Toast
  },
  data () {
    return {
      select: 'all',
      selectItem: null,
      appStoreList: null,
      appData: null,
      text:"",
      installedAppID:null,
      leftIcon:"loading",
      downloading: false
    }
  },
  created(){
    const _this = this
    //判断是否为debug模式
    if(DATA.debug){
      this.appStoreList = [
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"},
        {classify:"all",url:"",icon:$TGYY,id:"0",status:"0",version:"0.1.0",name:"测试应用",type:"all"}
      ]
      return
    }
    this.installedAppID = DATA.installedAppID
    //监听应用被删除事件
    Order.$on('delateApp', (message) => {
      this.installedAppID = message
    })
    if( timeoutDetection() ) { return null} //时间处理
    if(DATA.selectItem && DATA.appInfoList){ //缓存判断
      this.selectItem = DATA.selectItem
      this.appStoreList = DATA.appInfoList
    }
    else{
      //----------------------------分类条处理----------------------------
      Order.$on('classifyBeans', (message) => {
        const json = {}
        message.classifyBeans.forEach(function(element) {
          json[element.classifyID + ""] = element.classifyName
        }, this);
        DATA.selectItem = json
        setTimeout(() => {
          this.selectItem = json
        }, 0);
      })
      DATA.CHANNEL.queryAppStore(JSON.stringify({type:"4"}))
      //----------------------------应用列表处理----------------------------
      Order.$on('appStores', (message) => {
        const appInfoList = message.appStore.appInfoList
        let newList = []
        appInfoList.forEach(function(element) {
          newList.push({
            classify: element.classify, //标签ID
            downloadUrl: element.downloadUrl, //原生应用下载列表
            url: element.homeUrl, //H5应用打开链接
            icon: element.icon, //应用图标
            id: element.id, //应用ID
            status: element.status, //应用状态 1:显示
            version: element.version,
            name: element.name,
            type: element.type,
            packageName: element.packageName,
            activityName: element.activityName
          })
        }, this);
        //存储应用列表信息
        DATA.appInfoList = newList
        setTimeout(() => {
          this.appStoreList = newList
          this.leftIcon = "no"
        }, 0);
      })
      DATA.CHANNEL.queryAppStore(JSON.stringify({type:"2"}))
    }
    Order.$on('Search', function(message) {
      _this.text = message
    })
  },
  methods: {
    openStart:function(item){ //判断以何种方式打开应用
      window.location.href=item.homeUrl;
    },
    openApp: function () { //打开应用
      const app1 = {
        "type":2,
        "sopid":"com.vrv.linkDood",
        "pkgpath":"com.vrv.linkDood-1.0.45.sop",
        "scheme":"linkdood:showlinkdood?id=" + this.appData.userData.idCard,
        "name":"linkdood"
      };
      //打开应用
      DATA.CHANNEL.opensopApp(JSON.stringify(app1))
    },
    installApp: function(item,element){
      const _this = this
      let appInformation = {
        id: item.id,
        name: item.name,
        icon: item.icon,
        packageName: item.packageName,
        status: 1
      }
      if(item.type === 2){ //判断是否是H5应用
        appInformation.url = item.url
        DATA.CHANNEL.queryAppStore(JSON.stringify({type:"6",id:item.id,classify:item.classify}))
        DATA.installedAppID.push(item.id)
      }
      else{
        if( this.downloading ) { Order.$emit('Toast', '正在下载请稍后'); return;}
        this.downloading = true
        appInformation.url = item.activityName
        Order.$on('progress', (message)=> {
          element.target.innerHTML = `${message.progress}%`
        })
        Order.$once('downloadApp', (message)=> {
          Order.$off("progress")
          setTimeout(()=>{
            this.downloading = false
            DATA.installedAppID.push(item.id)
            DATA.CHANNEL.queryAppStore(JSON.stringify({type:"6",id:item.id,classify:item.classify}))
            DATA.CHANNEL.installSopApp(item.packageName)
          },0)
        })
        DATA.CHANNEL.downloadApp(item.packageName,item.downloadUrl)
      }
      if(DATA.appList[this.selectItem[item.classify]]){
        DATA.appList[this.selectItem[item.classify]].push(appInformation)
      }
      else{
        DATA.appList[this.selectItem[item.classify]] = [appInformation]
      }
      
      localforage.getItem("appData",(err,appData) => {
        appData.appList = DATA.appList
        appData.installedAppID = DATA.installedAppID
        localforage.setItem('appData', appData)
      })
      Order.$emit("appInstall", DATA.appList);
    },
    click:function(key){
      return this.select == key
    }
  },
  computed: {
    //筛选应用
    classification: function () {
      const newList ={}
      for(let item in this.appStoreList){
        const data = this.appStoreList[item]
        //判断应用列表的类型是否和选择的类型一致
        if(this.select === "all" || data.classify == this.select){
          if(data.status === 1) {
            if(this.text =="" || data.name.indexOf(this.text) > -1) {
              data.installed = this.installedAppID.indexOf(data.id) > -1
              newList[item] = data
            }
          }
        }
      }
      return newList
    }
  }
}
</script>

<style lang='less' scoped>
.app-store-box{
  .checker{
    height: 24px;
    line-height: 24px;
    padding: 8px;
    display: flex;
    background-color: #f4f4f4;
    border-bottom: 1px solid #e5e5e5;
    font-weight: 400;
  }
  .checker-item{
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: blue;
    font-size: 0.7rem;
    margin: 0 5px;
    padding: 0 5px;
  }
  .item-selected{
    background-color: #1865ff;
    border-radius: 20px;
    color: white; 
  }

}
  .app-list{
    display: flex;
    background-color: white;
    img{
      width: 45px;
      height: 45px;
      margin: 9px;
    }
    .info{
      width: calc(~"100% - 150px");
    }
    p{
      height: 30px;
    }
    .name{
      font-size: 0.9rem;
      line-height: 33px;
    }
    .detail{
      font-size: 0.8rem;
      line-height: 30px;
      color: #7b7b7b;
    }
    .button{
      width: 60px;
      height: 30px;
      border-radius: 5px;
      margin: 16px 13px;
      text-align: center;
      line-height: 30px;
      font-size: 0.9rem;
    }
    .button:active{
      background: cornflowerblue;
      color: white;
    }
    .open{
      border: 1px solid black;
    }
    .down{
      color: white;
      background-color: #1865ff;
    }
  }
.store-list{
  height: 443px;
  touch-action: none;
  overflow: hidden;
}
</style>