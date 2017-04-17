<template lang="pug">
.app-store-box
  TitleBar(title='应用商店',leftIcon="flase")
  Search
  Checker(v-model="select",default-item-class="demo1-item",selected-item-class="item-selected")
    checker-item(value="all") 全部
    checker-item(value="office") 办公类
    checker-item(value="communication") 通讯录
  ul
    li.app-list(v-for="(item,key) in classification",:key="item.id")
      img(:src="item.icon")
      .info
        p.name {{item.name}}
        p.detail {{item.detail}}
      .button.open(v-if="item.exist",v-on:click="openStart(item.url, item.special)") 打开
      .button.down(v-else,v-on:click="installApp(item,key)") 安装
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import Search from '../panel/Search'
import TitleBar from '../brick/Title'
import { post} from "../method.js" 
import localforage from 'localforage'
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
    localforage.getItem("appData",function(err,appData){
      _this.appData = appData
      _this.appList = appData.appList
    })
  },
  methods: {
    onIndexChange: function(index) {
      this.index = index
    },
    openStart:function(url,special){ //判断以何种方式打开应用
      switch(special){
        case 'open':this.openApp();break; //启动应用
        case 'url':window.location.href=url;break; //跳转到Url
      }
    },
    openApp: function () { //打开应用
      const app1 = {
        "type":2,
        "sopid":"com.vrv.linkDood",
        "pkgpath":"com.vrv.linkDood-1.0.45.sop",
        "scheme":"linkdood:showlinkdood?id="+this.idCard,
        "name":"linkdood"
      };
      //打开应用
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.opensopApp(JSON.stringify(app1))
      });
    },
    installApp: function(item,key){
      this.appList[key].exist = true
      this.appData.appList = this.appList
      localforage.setItem('appData', this.appData,function (err){
        if(err){
          Order.$emit('Toast', '缓存用户数据失败')
        }
      })
    }
  },
  data () {
    return {
      select: 'all',
      appList: {},
      appData: null
    }
  },
  computed: {
    //筛选应用
    classification: function () {
      const _this = this;
      const newList ={}
      for(let item in _this.appList){
        //判断应用列表的类型是否和选择的类型一致
        if(_this.select === "all" || _this.appList[item].type === _this.select){
          if(_this.appList[item].available === true) {
            newList[item] = _this.appList[item]
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