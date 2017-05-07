"use strict";

const log = function(record){
  const server = 'http://192.168.132.45:2333/',
        obj = new XMLHttpRequest(),
        mess   = {data:record};
  obj.open("POST", server, true);
  obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
  obj.send(JSON.stringify(mess));
}
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


let Timestamp = {value:null};

const timeoutDetection = function(){
  const nowTime = new Date().getTime();
  //检测距离上次操作是否已经过去1200000毫秒(20分钟)
  if(nowTime - Timestamp.value > 7200000){
    if( Timestamp.value === null ) { return false;}//数据清楚检测
    window.location.href="#/TimeOut";
    return true;
  }
  Timestamp.value = nowTime;
  return false;
};


let DATA = {
  userName:'',
  idCard: null,
  unitId: null,
  orgList:{},
  orgTree : [],
  id : 0,
  phoneNumber : null,
  selectItem: null,
  appStoreList: null,
  appList:null,
  installedAppID: null
};

import { QWebChannel } from  "./QTWebChannel";
import { Order } from './Order.js';
let CHANNEL = null;


new QWebChannel(navigator.qtWebChannelTransport, (channel) => {
  if(CHANNEL === null){
    CHANNEL = channel.objects.content;
    CHANNEL.callback.connect(function(receive) {
      const Data = JSON.parse(receive);
      Order.$emit(Data.fName, Data.data);
    });
  }
});

export {get, log, cutString, Timestamp, timeoutDetection, CHANNEL, DATA};