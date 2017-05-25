<template lang="pug">
.notice-box
  TitleBar(title='通知')
  ul.notice-list
    li(v-for='item in notice',@click="openURL(item)")
      img(:src='item.img')
      .message
        p {{item.name}}
        p.text {{item.text}}
      .time {{item.time}}
      .notice(v-if='item.notice != "0"') {{item.notice}}
  Toast
  BottomBar(index="0")
</template>

<script>

import Toast from './brick/Toast'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import { Order } from './Order.js'
import localforage from 'localforage'
import {get, cutString, timeoutDetection, DATA, log} from "./method.js" 
//引入图片资源
const $XXFB    = require('../assets/XTBG.png'),
      $AQYJ      = require('../assets/YJ.png');

export default {
  components: {
    TitleBar,
    BottomBar,
    Toast
  },
  data () {
    return {
      notice: []
    }
  },
  created(){
    //判断是否为debug模式
    if(DATA.debug){
      const noticeData = { // 协同办公项
        img    : $XXFB,
        name   : '协同办公',
        text   : '这里是邮件的题目',
        time   : '2066年6月6日',
        notice : '99+',
        url    : 'owo.help'
      }
      this.notice.push(noticeData)
      return
    }
    const _this = this
    if(!DATA.org.enname){
      localforage.getItem("appData",(err,appData) => {
        DATA.org = appData.org
        DATA.appList = appData.appList
        DATA.installedAppID = appData.installedAppID
      }) 
    }
    if(timeoutDetection()) { return null } //超时检测
    if(DATA.org.enname === null) { Order.$emit('Toast', '非法登录'); return null; } //空数据检测
    //--------------------------------------------邮件通知获取--------------------------------------------------------
    const YJURL = `http://10.152.36.26:8080/CASIC/interfaces/mailInterface.jsp?PID=${DATA.org.usbkeyidentification}`
    get( YJURL, (receive)=> {
      if(receive ==="" || receive === null ) { Order.$emit('Toast', '获取通知数据失败'); return null } //空数据检测
      const data = JSON.parse(receive)
      const date = Date.parse(data[0].send_date.replace(/-/gi,"/"))
      const AQYJ = { // 安全邮件
        img    : $AQYJ,
        name   : '安全邮件',
        text   : data[0].subject,
        time   : this.getDateDiff(date),
        notice : data[0].count,
        url    : `http://10.152.36.20/secmail/loginapp.do?type=cid&PID=${DATA.org.usbkeyidentification}&type2=Unread`
      }
      // 将 *应用数据* 显示在界面上
      setTimeout(()=> {
        this.notice.push(AQYJ)
      },0)
    })
    if(DATA.org.unitId != "1") { return null } //集团用户检测
    //--------------------------------------------代办通知获取--------------------------------------------------------
    const XXFBURL = 'http://10.152.36.26:8080/CASIC/interfaces/304DaiBanInterface.jsp?userName='+ DATA.org.enname +'&PID='+DATA.org.usbkeyidentification+'&webService='
    //通过Get请求请求通知数据
    get( XXFBURL, (receive)=> {
      if(receive ==="" || receive === null ) { Order.$emit('Toast', '获取通知数据失败'); return null } //空数据检测
      let number = parseInt(cutString(receive,"wdNum>","<"))
      if(number > 99) number = '99+'
      const date = Date.parse(cutString(receive,"SentTime>","<").replace(/-/gi,"/"))
      //给 *应用数据* 的备份 增加 *通知数据*
      const XXFB = { // 协同办公项
        img    : $XXFB,
        name   : '协同办公',
        text   : cutString(receive,"Title>","<"),
        time   : this.getDateDiff(date),
        notice : number,
        url    : 'http://10.152.36.26:8080/page_m/dblist.jsp?userName=' + DATA.org.enname + '&PID='+ DATA.org.usbkeyidentification + '&webService='
      }
      // 将 *应用数据* 显示在界面上
      setTimeout(()=> {
        this.notice.push(XXFB)
      },0)
    })

  },
  methods:{
    openURL: function(item) {
      const url = item.url.replace("http","browser")
      const app1 = {
        "scheme":url,
      };
      DATA.CHANNEL.opensopApp(JSON.stringify(app1))
    },
    getDateDiff: function(nS) {
      let result;
      if(nS < 10000000000) nS = nS * 1000
      const diffValue = new Date().getTime() - nS;
      if (diffValue < 0) {
        return "时间戳错误";
      }
      const monthC = parseInt(diffValue / 2592000000);
      const weekC = parseInt(diffValue / (7 * 86400000));
      const dayC = parseInt(diffValue / 86400000);
      const hourC = parseInt(diffValue / 3600000);
      const minC = parseInt(diffValue / 60000);
      if (monthC >= 1) {
        result = monthC + "月前";
      } else if (weekC >= 1) {
        result = weekC + "周前";
      } else if (dayC >= 1) {
        result = dayC + "天前";
      } else if (hourC >= 1) {
        result = hourC + "小时前";
      } else if (minC >= 1) {
        result = minC + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
    }
  }
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
    img{
      width: 45px;
      height: 45px;
      margin: 10px;
      overflow: hidden;
    }
    .message{
      margin: 10px;
      width: calc(~'100% - 115px');
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
      width: 20px;
      height: 20px;
      position: absolute;
      background-color: red;
      top: 2px;
      left: 45px;
      border-radius: 50%;
      color: white;
      line-height: 20px;
      text-align: center;
      font-size: 10px;
      overflow: hidden;
      font-family: Tahoma;
    }
  }
  li:active{
    background-color: #4899E0;
    color: #FFF;
  }
}
</style>