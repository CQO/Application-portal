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
      .button.open(v-if="item.exist") 已安装
      .button.down(v-else,v-on:click="installApp(item,key)") 安装
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import Search from './panel/Search'
import AppStore from './list/AppStore'
import TitleBar from './bar/Title'
import localforage from 'localforage'
//引入图片资源
const $tiangongyuanyuan = require('../assets/tiangongyuanyuan.png'),
      $xinxifabu        = require('../assets/xinxifabu.png'),
      $youjian          = require('../assets/youjian.png'),
      $bangongxitong    = require('../assets/bangongxitong.png');
export default {
  components: {
    Search,
    Checker,
    CheckerItem,
    AppStore,
    TitleBar
  },
  methods: {
    onIndexChange (index) {
      this.index = index
    },
    installApp:function(item,key){
      const _this = this
      let Data = _this.localforageData
      Data[item.appName] = {
        id:item.id,
        name: item.name,
        icon: item.icon,
        special: item.special,
        type: item.type,
        isSelect:false
      }
      //把应用列表存储到起来
      localforage.setItem('appList', Data, function (err){
        _this.appList[key].exist = true
      });
      console.log(item)
    }
  },
  created(){
    const _this = this
    localforage.getItem('appList', function (err, value) {
      _this.localforageData = value
      for(let item in _this.appList){
        for(let myApp in value){
          if(_this.appList[item].appName === myApp){
            _this.appList[item].exist =true
            break
          }
        }
      }
    })
  },
  data () {
    return {
      appList:[
        { name:"协同办公", appName:"bangongxitong", detail:"版本号:1.41", icon: $bangongxitong,special:"url", type:"office", exist:false,url:'', id:"1004" },
        { name:"邮件", appName:"youjian", detail:"版本号:0.10", icon: $youjian,special:"url", type:"office", exist:false,url:'', id:"1002" },
        { name:"信息发布", appName:"xinxifabu", detail:"版本号:1.01", icon: $xinxifabu,special:"url", type:"office", exist:false, id:"1001",url:'http://info.casic.cs/jeecms2/index/mobile/', },
        { name:"天工圆圆", appName:"tiangongyuanyuan", detail:"版本号:2.36", icon: $tiangongyuanyuan, special:"open", type:"communication", exist:false, url:'', id:"1000"}        
      ],
      select: 'all',
      localforageData: ''
    }
  },
  computed: {
    //筛选应用
    classification: function () {
      const _this = this;
      return this.appList.filter(function (list) {
        //判断筛选条件是否为显示全部
        if(_this.select === "all"){
          return true
        }
        else if(list.type === _this.select){
          return true
        }
      })
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
    .open{
      border: 1px solid black;
    }
    .down{
      color: white;
      background-color: #1865ff;
    }
  }
</style>