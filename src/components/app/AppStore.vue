<template lang="pug">
.app-store-box
  TitleBar(title='应用商店',leftIcon="flase")
  Search
  Checker(v-model="select",default-item-class="demo1-item",selected-item-class="item-selected")
    checker-item(value="all") 全部
    checker-item(v-for="(item,key) in selectItem",:value="key") {{item}}
  ul
    li.app-list(v-for="(item,key) in classification",:key="item.id")
      img(:src="item.icon")
      .info
        p.name {{item.name}}
        p.detail 版本号:{{item.version}}
      .button.open(v-if="item.exist") {{item.status}}
      .button.down(v-else,v-on:click="installApp(item,key)") 安装
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import Search from '../brick/Search'
import TitleBar from '../brick/Title'
import localforage from 'localforage'
import { Order } from '../Order.js'
import { timeoutDetection } from "../method.js" 
import { CHANNEL } from "../method.js" 
//引入图片资源
const $tiangongyuanyuan = require('../../assets/tiangongyuanyuan.png'),
      $xinxifabu        = require('../../assets/xinxifabu.png'),
      $youjian          = require('../../assets/youjian.png'),
      $bangongxitong    = require('../../assets/bangongxitong.png');
export default {
  components: {
    Search,
    Checker,
    CheckerItem,
    TitleBar
  },
  created(){
    const _this = this
    if( timeoutDetection() ) { return null} //时间处理
    localforage.getItem("appData",function(err,appData){
      //document.write(appData.onlionAppID)
      _this.appData = appData
      if(appData.selectItem){
        _this.selectItem = appData.selectItem
        _this.appList = appData.appInfoList
      }
      else{
        Order.$on('classifyBeans', (message) => {
          const json = {}
          message.classifyBeans.forEach(function(element) {
            json[element.classifyID + ""] = element.classifyName
          }, this);
          _this.appData.selectItem = json
          localforage.setItem('appData', _this.appData) //把应用列表存储到起来
          setTimeout(() => {
            _this.selectItem = json
          }, 0);
        })
        CHANNEL.queryAppStore(JSON.stringify({type:"4"}))
        Order.$on('appStores', (message) => {
          _this.appData.appInfoList = message.appStore.appInfoList
          localforage.setItem('appData', _this.appData) //把应用列表存储到起来
          setTimeout(() => {
            _this.appList = message.appStore.appInfoList
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
    installApp: function(item,key){
      if(item.type === 2){ //判断是否是H5应用
        this.appData.onlionAppID += `[${item.id}]`
        const json = {
          id: item.id,
          name: item.name,
          icon: item.icon,
          url: item.homeUrl,
          status: 1
        }
        //document.write(this.selectItem[item.classify])
        if(this.appData.appList[this.selectItem[item.classify]]){
          this.appData.appList[this.selectItem[item.classify]].push(json)
        }
        else{
          this.appData.appList[this.selectItem[item.classify]] = [json]
        }
        localforage.setItem('appData', this.appData) //把应用列表存储到起来
        CHANNEL.queryAppStore(JSON.stringify({type:"6",id:item.id,classify:item.classify}))
      }
    }
  },
  data () {
    return {
      select: 'all',
      selectItem: null,
      appList: {},
      appData: null,
      text:""
    }
  },
  computed: {
    //筛选应用
    classification: function () {
      const _this = this;
      const newList ={}
      for(let item in _this.appList){
        //判断应用列表的类型是否和选择的类型一致
        if(_this.select === "all" || _this.appList[item].classify == _this.select){
          if(_this.appList[item].status === 1) {
            if(_this.text =="" || _this.appList[item].name.indexOf(_this.text) > -1) {
              newList[item] = _this.appList[item]
              if(_this.appData.onlionAppID.indexOf(`[${_this.appList[item].id}]`) > -1) newList[item].exist = true
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