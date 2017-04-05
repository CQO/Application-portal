<template lang="pug">
.app-store-box
  TitleBar(title='应用商店',leftIcon="flase")
  Search
  Checker(v-model="select",default-item-class="demo1-item",selected-item-class="item-selected")
    checker-item(value="all") 全部
    checker-item(value="bangong") 办公类
    checker-item(value="tongxun") 通讯录
  ul
    AppStore(v-for="item in classification",:neme="item.neme",:detail="item.detail",:exist="item.exist",:key="item.id",:icon="item.icon")
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import Search from './panel/Search'
import AppStore from './list/AppStore'
import TitleBar from './bar/Title'
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
    }
  },
  data () {
    return {
      appList:[
        { neme:"协同办公", detail:"112次下载 | 11.6M", icon: $bangongxitong, type:"bangong", exist:true, id:"1004" },
        { neme:"邮件", detail:"252次下载 | 25.3M", icon: $youjian, type:"bangong", exist:true, id:"1002" },
        { neme:"信息发布", detail:"132次下载 | 12.6M", icon: $xinxifabu, type:"bangong", exist:true, id:"1001" },
        { neme:"天工圆圆", detail:"183次下载 | 24.7M", icon: $tiangongyuanyuan, type:"tongxun", exist:true, id:"1000"}        
      ],
      select: 'all',
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
</style>