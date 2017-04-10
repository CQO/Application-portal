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
import {get, cutString, globalData} from "./method.js" 
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
      notice: {
        xietongbangong:{name: '协同办公', text: '正在拉取...', time: '', img: $bangongxitong,url:'', notice: ''}
      }
    }
  },
  methods: {
    //跳转到某个地址
    turn (url) { window.location.href=url; }
  },
  created(){
    const _this = this
    localforage.getItem("userData",function(err,value){
      if( value !==null && value !== "" ){
        if(value.key == "1"){
          localforage.getItem("notice",function(err,noticeData){
            if( noticeData !==null && noticeData !== "" ){
              _this.notice = value
            }
            else{
              const noticeURL = 'http://10.152.36.26:8080/CASIC/interfaces/304DaiBanInterface.jsp?userName='+userData.userName+'&PID='+userData.idCard+'&webService='
              //请求通知信息
              get( noticeURL, function(receive){
                if(receive !=="" && receive !==null){
                  let noticeData = {}
                  noticeData.xietongbangong.text = cutString(receive,"Title>","<");
                  //时间处理
                  let time = cutString(receive,"SentTime>","<")
                  noticeData.xietongbangong.time = time
                  //角标处理
                  noticeData.xietongbangong.notice = cutString(receive,"wdNum>","<");
                  //改变地址
                  noticeData.xietongbangong.url = 'http://10.152.36.26:8080/page_m/dblist.jsp?userName=' + userData.userName + '&PID='+ userData.idCard + '&webService='
                  _this.notice = noticeData
                  localforage.setItem('notice', noticeData,function (err){
                    if(err){
                      Order.$emit('Toast', '缓存用户数据失败')
                    }
                  });
                }
                else{
                  Order.$emit('Toast', '网络错误')
                }
              })
            }
          })
        }
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
      top: 10px;
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