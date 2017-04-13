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
  Toast
  BottomBar(index="0")
</template>

<script>
import Toast from './brick/Toast'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
import { Order } from './Order.js'
import localforage from 'localforage'
import {get, cutString} from "./method.js" 
//引入图片资源
const $bangongxitong    = require('../assets/bangongxitong.png')
export default {
  components: {
    TitleBar,
    BottomBar,
    Toast
  },
  data () {
    return {
      notice: {}
    }
  },
  methods: {
    //跳转到某个地址
    turn (url) { window.location.href=url; }
  },
  created(){
    const _this = this
    //取出用户数据
    localforage.getItem("appData",function(err,appData){
      //如果能进到这个页面但数据库中存储的 *应用数据* 获取不到，那么原因未知
      if( appData !==null ){
        //拷贝一份 *应用数据* 里的 *用户数据*
        const userData = appData.userData
        if(userData.key == "1"){
          //判断 *应用数据* 中 是否有 *通知数据*
          if(appData.notice){
            //如果有 *通知数据* 直接将它显示出来
            _this.notice = appData.notice
          }
          else{ //在 *应用数据* 中 没有 *通知数据* 那么证明是第一次显示 或者 以前没有拉取成功过 需要拉取数据并保存
            //拉取数据的URL
            const noticeURL = 'http://10.152.36.26:8080/CASIC/interfaces/304DaiBanInterface.jsp?userName='+userData.userName+'&PID='+userData.idCard+'&webService='
            //通过Get请求请求通知数据
            get( noticeURL, function(receive){
              //判断是否GET请求到数据
              if(receive !=="" && receive !==null){
                //给 *应用数据* 的备份 增加 *通知数据*
                appData.noticeData = {
                  xietongbangong:{ // 协同办公项
                    img    : $bangongxitong,
                    name   : '协同办公',
                    text   : cutString(receive,"Title>","<"),
                    time   : cutString(receive,"SentTime>","<"),
                    notice : cutString(receive,"wdNum>","<"),
                    url    : 'http://10.152.36.26:8080/page_m/dblist.jsp?userName=' + userData.userName + '&PID='+ userData.idCard + '&webService='
                  }
                }
                
                // 将 *应用数据* 显示在界面上
                _this.notice = appData.noticeData
                // 将修改后的 *应用数据* 覆盖原来的应用数据
                localforage.setItem('appData', appData,function (err){
                  if(err !== null){ //错误处理
                    Order.$emit('Toast', '数据存储失败')
                  }
                })
              }
              else{
                Order.$emit('Toast', '获取通知数据失败')
              }
            })
          }
        }
      }
      else{
        Order.$emit('Toast', '非法登录')
        window.location.href="#/Quit"
      }
    })
  },
}
</script>

<style lang='less' scoped>
.notice-list{
  height: 100%;
  overflow-y: hidden;
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
      width: 240px;
      height: 30px;
      line-height: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time{
      color: #d3d3d3;
      font-size: 0.6rem;
      text-align: center;
      overflow: hidden;
      position: absolute;
      right: 10px;
      top: 5px;
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
}
</style>