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
      .button.open(v-if="item.exist") 打开
      .button.down(v-else,v-on:click="installApp(item,key)") 安装
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import Search from './panel/Search'
import TitleBar from './bar/Title'
import { globalData} from "./method.js" 
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
    TitleBar
  },
  methods: {
    onIndexChange: function(index) {
      this.index = index
    },
    installApp: function(item,key){
      globalData.appList[key].exist = true
    }
  },
  data () {
    return {
      select: 'all',
      appList: globalData.appList,
    }
  },
  computed: {
    //筛选应用
    classification: function () {
      const _this = this;
      if(_this.select === "all"){
        return globalData.appList
      }
      else{
        const newList ={}
        for(let item in globalData.appList){
          //判断应用列表的类型是否和选择的类型一致
          if(globalData.appList[item].type === _this.select){
            newList[item] = globalData.appList[item]
          }
        }
        return newList
      }
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