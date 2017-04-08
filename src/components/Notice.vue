<template lang="pug">
.notice-box
  TitleBar(title='通知')
  ul.notice-list
    li(v-for='item in notice',v-on:click="turn(item.url)")
      img.user-img(:src='item.img')
      .message
        p {{item.name}}
        p.text {{item.text}}
      .time {{item.time}}
      .notice(v-if='item.notice') {{item.notice}}
  Toast(v-model="showPositionValue",type="text",:time="800",:text="textAlert")
  BottomBar(index="0")
</template>

<script>
import { Toast } from 'vux'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
import localforage from 'localforage'
import {get, cutString, globalData} from "./method.js" 
//引入图片资源
const $bangongxitong    = require('../assets/bangongxitong.png')
export default {
  components: {
    TitleBar,
    BottomBar,
    Toast
  },
  methods: {
    turn (url) { //跳转到某个地址
      window.location.href=url;
    }
  },
  created(){
    const _this = this;
    //取出用户名
    const userName = globalData.userData
    if(userName.key === 1){
      //请求通知信息
      get('http://10.152.36.26:8080/CASIC/interfaces/304DaiBanInterface.jsp?userName='+value.userName+'&PID='+value.idCard+'&webService=',function(e){
        if(e !=="" && e !==null){
          _this.notice.xietongbangong.text = cutString(e,"Title>","<");
          //时间处理
          const time = cutString(e,"SentTime>","<");
          _this.notice.xietongbangong.time = time;
          //角标处理
          _this.notice.xietongbangong.notice = cutString(e,"wdNum>","<");
          //改变地址
          _this.notice.xietongbangong.url = 'http://10.152.36.26:8080/page_m/dblist.jsp?userName=' + value.userName + '&PID='+ value.idCard + '&webService='
        }
        else{
          _this.textAlert = '网络错误'
          _this.showPositionValue = true
        }
      })
    }
    else{
      _this.notice = {}
    }
  },
  data () {
    return {
      selected: '通知',
      dbtest:"读本地数据",
      message:"测试消息",
      textAlert:'',//弹出框显示文字
      showPositionValue:false,
      notice: {
        xietongbangong:{name: '协同办公', text: '正在拉取...', time: '', img: $bangongxitong,url:'', notice: ''}
      }
    }
  }
}
</script>

<style lang='less' scoped>
.notice-list{
  height: 100%;
  overflow-y: auto;
  li{
    display: flex;
    height: 65px;
    border-bottom: 1px solid #eaeaea;
    position: relative;
    background-color: white;
    overflow: hidden;
    width: 100%;
    .user-img{
      width: 45px;
      height: 45px;
      margin: 10px;
      overflow: hidden;
    }
    .message{
      margin: 10px;
      width: calc(~'100% - 135px');
      overflow: hidden;
    }
    .text{
      color: #8c8c8c;
      font-size: 0.8rem;
      overflow: hidden;
    }
    .time{
      width: 50px;
      margin: 10px 0;
      color: #d3d3d3;
      font-size: 0.6rem;
      text-align: center;
      overflow: hidden;
    }
    .notice{
      width: 18px;
      height: 18px;
      position: absolute;
      background-color: red;
      top: 2px;
      left: 45px;
      border-radius: 50%;
      color: white;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      overflow: hidden;
    }
  }
  .button{
    position: absolute;
    right: 10px;
    bottom: 60px;
    background-color: cornflowerblue;
    color: antiquewhite;
    height: 40px;
    width: 200px;
    text-align: center;
    line-height: 40px;
    overflow: hidden;
  }
  .duihua{
    position: absolute;
    right: 10px;
    bottom: 110px;
    background-color: cornflowerblue;
    height: 40px;
    width: 200px;
    display: flex;
    line-height: 40px;
    color: antiquewhite;
    font-size: 14px;
    overflow: hidden;
    input{
      width: 120px;
      overflow: hidden;
    }
    .send{
      width: 80px;
      text-align: center;
      overflow: hidden;
    }
  }
  .wangluo{
      position: absolute;
      right: 10px;
      bottom: 160px;
      background-color: cornflowerblue;
      color: antiquewhite;
      height: 40px;
      width: 200px;
      text-align: center;
      line-height: 40px;
      overflow: hidden;
    }
}
</style>