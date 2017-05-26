"use strict";

const log = function(record){
  const server = 'http://192.168.132.45:2333/',
        obj = new XMLHttpRequest(),
        mess   = {data:record};
  obj.open("POST", server, true);
  obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
  obj.send(JSON.stringify(mess));
};
const get = function(url,fn){
  const obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
  obj.open('GET',url,true);
  obj.onreadystatechange = function(){
    if (obj.readyState === 4) { // readyState==4说明请求已完成
      fn.call(this, obj.responseText);  //从服务器获得数据
    }
  };
  obj.send(null);
};

//剪切字符串
const cutString = function(original,before,after,index){
  index = index || 0;
    if (typeof index === "number") {
      const P = original.indexOf(before, index);
      if (P > -1) {
        if (after) {
          const f = original.indexOf(after, P + 1);
          return (f>-1)? original.slice(P + before.toString().length, f):
          console.error("owo [在文本中找不到 参数三 "+after+"]");
        } 
        else {
          return original.slice(P + before.toString().length);
        }
      } 
      else {
        console.error("owo [在文本中找不到 参数一 " + before + "]");
      }
    } 
    else {
      console.error("owo [sizeTransition:" + index + "不是一个整数!]");
    }
};


const timeoutDetection = function(){
  const nowTime = new Date().getTime();
  //检测距离上次操作是否已经过去1200000毫秒(20分钟)
  if(nowTime - DATA.Timestamp > 7200000){
    if( DATA.Timestamp === null ) { return false;}//数据清楚检测
    window.location.href="#/TimeOut";
    return true;
  }
  DATA.Timestamp = nowTime;
  return false;
};

let DATA = {
  org: { 
    deptName: '综合办公室',
    enname: '刘霞',
    isFirstLogin: '0',
    orderNum: 99999,
    orgCode: '10011001100610011001',
    orgID: '2920082167358987',
    unitId: '936',
    unitName: '内蒙古河西航天科技发展有限公司',
    usbkeyidentification: '150102197503261521',
    usbkeyname: '刘霞',
    userAccount: '3390843' 
  },
  debug: false,
  normal: false,
  CHANNEL: null,
  Timestamp: null,
  orgList:{},
  orgTree : [],
  selectItem: null,
  appList:null,
  installedAppID: null,
  phoneNumber: null,
  telePhone: null,
  iframeURL: null
};

//标记目前是否在获取某项数据
let STATE = {
  getMail : false,
  getBacklog : false,
  getBumph: false
}

import { QWebChannel } from  "./QTWebChannel";
import { Order } from './Order.js';

if(!DATA.debug){
  new QWebChannel(navigator.qtWebChannelTransport, (channel) => {
    if(DATA.CHANNEL === null){
      DATA.CHANNEL = channel.objects.content;
      DATA.CHANNEL.callback.connect(function(receive) {
        const Data = JSON.parse(receive);
        Order.$emit(Data.fName, Data.data);
      });
    }
  });
}

export { get, log, cutString, timeoutDetection, DATA, STATE };