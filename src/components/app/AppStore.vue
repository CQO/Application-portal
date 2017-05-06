<template lang="pug">
.app-store-box
  TitleBar(title='应用商店',leftIcon="flase")
  Search
  Checker(v-model="select",default-item-class="demo1-item",selected-item-class="item-selected")
    checker-item(value="all") 全部
    checker-item(v-for="(item,key) in selectItem",:value="key") {{item}}
  ul
    li.app-list(v-for="item in classification",:key="item.id")
      img(:src="item.icon")
      .info
        p.name {{item.name}}
        p.detail 版本号:{{item.version}}
      .button.open(v-if="appData.installedAppID.indexOf(item.id)>-1") 已安装
      .button.down(v-else,v-on:click="installApp(item)") 安装
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import Search from '../brick/Search'
import TitleBar from '../brick/Title'
import localforage from 'localforage'
import { Order } from '../Order.js'
import { CHANNEL, timeoutDetection, log } from "../method.js" 

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
      appStoreList: {},
      appData: null,
      text:""
    }
  },
  created(){
    const _this = this
    if( timeoutDetection() ) { return null} //时间处理
    localforage.getItem("appData",(err,appData) => {
      //log(appData.installedAppID)
      this.appData = appData
      if(appData.selectItem){ //缓存判断
        this.selectItem = appData.selectItem
        this.appStoreList = appData.appInfoList
      }
      else{
        //----------------------------分类条处理----------------------------
        Order.$on('classifyBeans', (message) => {
          const json = {}
          message.classifyBeans.forEach(function(element) {
            json[element.classifyID + ""] = element.classifyName
          }, this);
          this.appData.selectItem = json
          setTimeout(() => {
            this.selectItem = json
          }, 0);
        })
        CHANNEL.queryAppStore(JSON.stringify({type:"4"}))

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
          this.appData.appInfoList = newList
          localforage.setItem('appData', this.appData) //把应用列表存储到起来
          setTimeout(() => {
            this.appStoreList = newList
          }, 0);
        })
        CHANNEL.queryAppStore(JSON.stringify({type:"2"}))
      }
    })
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
      CHANNEL.opensopApp(JSON.stringify(app1))
    },
    installApp: function(item){
      const _this = this
      log(item)
      if(item.type === 2){ //判断是否是H5应用
        const json = {
          id: item.id,
          name: item.name,
          icon: item.icon,
          url: item.homeUrl,
          status: 1
        }
        if(this.appData.appList[this.selectItem[item.classify]]){
          this.appData.appList[this.selectItem[item.classify]].push(json)
        }
        else{
          this.appData.appList[this.selectItem[item.classify]] = [json]
        }
        this.appData.installedAppID.push(item.id)
        localforage.setItem('appData', this.appData) //把应用列表存储到起来
        CHANNEL.queryAppStore(JSON.stringify({type:"6",id:item.id,classify:item.classify}))
      }
      else{
        //CHANNEL.log(item)
        CHANNEL.installSopApp(JSON.stringify({url:item.downloadUrl}))
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