<template lang="pug">
.app-store-box
  TitleBar(title='应用商店',leftIcon="flase")
  Search
  Checker(v-model="select",default-item-class="demo1-item",selected-item-class="item-selected")
    checker-item(value="all") 全部
    checker-item(v-for="(item,key) in selectItem",:key="item.id",:value="key") {{item}}
  ul
    li.app-list(v-for="item in classification",:key="item.id")
      img(:src="item.icon")
      .info
        p.name {{item.name}}
        p.detail 版本号:{{item.version}}
      .button.open(v-if="item.installed") 已安装
      .button.down(v-else,v-on:click="installApp(item)") 安装
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import Search from '../brick/Search'
import TitleBar from '../brick/Title'
import localforage from 'localforage'
import { Order } from '../Order.js'
import { timeoutDetection, log, DATA } from "../method.js" 

export default {
  components: {
    Search,
    Checker,
    CheckerItem,
    TitleBar
  },
  data () {
    return {
      select: 'all',
      selectItem: null,
      appStoreList: null,
      appData: null,
      text:"",
      installedAppID:null
    }
  },
  created(){
    const _this = this
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
        //log(appInfoList)
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
            type: element.type
          })
        }, this);
        //存储应用列表信息
        DATA.appInfoList = newList
        setTimeout(() => {
          _this.appStoreList = newList
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
    installApp: function(item){
      const _this = this
      if(item.type === 2){ //判断是否是H5应用
        const json = {
          id: item.id,
          name: item.name,
          icon: item.icon,
          url: item.url,
          status: 1
        }
        if(DATA.appList[this.selectItem[item.classify]]){
          DATA.appList[this.selectItem[item.classify]].push(json)
        }
        else{
          DATA.appList[this.selectItem[item.classify]] = [json]
        }
        DATA.installedAppID.push(item.id)
        //localforage.setItem('appData', this.appData) //把应用列表存储到起来
        Order.$emit("appInstall", DATA.appList);
        DATA.CHANNEL.queryAppStore(JSON.stringify({type:"6",id:item.id,classify:item.classify}))
      }
      else{
        DATA.CHANNEL.installSopApp(JSON.stringify({url:item.downloadUrl}))
      }
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
      //log(newList)
      return newList
    }
  }
}
</script>

<style lang='less' scoped>
.app-store-box{
  .vux-checker-box{
    height: 24px;
    line-height: 24px;
    padding: 8px;
    display: flex;
    background-color: #f4f4f4;
    border-bottom: 1px solid #e5e5e5;
    font-weight: 400;
  }
  .vux-checker-item{
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
</style>