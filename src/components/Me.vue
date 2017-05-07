<template lang="pug">
.personal-information
  TitleBar(title='我')
  .content-box
    .title 个人信息
    router-link.information(to="\Details")
      img(src="../assets/user.png")
      p.name {{userName}} 
      .ico &#xe659;
    .title 操作
    P42(v-for="item in list",:icoCode="item.icon",:text="item.title",:color="item.color",:url="item.url",:key="item.id")
    .quit(v-on:click="quitApp") 退出登录
  Loading(text="正在退出...")
  BottomBar(index="3")
</template>

<script>
import Loading from './brick/Loading'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import P42 from './panel/P42'
import {timeoutDetection, DATA, CHANNEL} from "./method.js"
import { Order } from './Order.js'
import localforage from 'localforage'
export default {
  components: {
    TitleBar,
    BottomBar,
    Loading,
    P42,
  },
  methods: {
    quitApp: function(url) { //退出登录
      Order.$emit('Loading', 'show')
      //退出信号监听
      Order.$on('loginout', function(message) {
        Order.$emit('Loading', 'hide') //隐藏退出提示
        window.location.href=`#/Quit/${DATA.userName}` //返回主界面
        location.reload() //刷新页面以清空变量数据
      })
      CHANNEL.loginout()
    }
  },
  created(){
    if(timeoutDetection()) return null
    if(DATA.userName){
      this.userName = DATA.userName
    }
    else{
      localforage.getItem("appData",(err,appData) => {
        this.userName = appData.userData.userName
      })
    }
    
  },
  data () {
    return {
      list: [
        { icon: '&#xe600;', title: '更改密码', color:'#61c2ff', id:"1000",url:"/ChangePassword"}, 
        { icon: '&#xe629;', title: '帮助', color:'#ffd217', id:"1001",url:"/Help"},
        { icon: '&#xe60e;', title: '当前版本', color:'#1bee47', id:"1002",url:"/Version"}
      ],
      userName: ''
    }
  }
}
</script>


<style lang='less' scoped>
.personal-information{
    .title{
      height: 30px;
      line-height: 30px;
      color: #a8a8a8;
      padding-left: 10px;
      font-size: 0.8rem;
      background-color: #f4f4f4;
    }
    .quit{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: white;
        border: 1px solid #e5e5e5;
        margin: 20px 0;
    }
    .quit:active{
        background-color: aqua;
    }
    .information{
      height: 61px;
      display: flex;
      background-color: white;
      img{
        height: 45px;
        width: 45px;
        margin: 8px;
        border-radius: 5px;
      }
      .name{
        width: calc(~"100% - 90px");
        line-height: 61px;
        font-size: 0.9rem;
      }
      .ico{
        line-height: 60px;
        color: #a4a9b2;
      }
    }
    .information:active{
        background-color: aqua;
    }
}
</style>