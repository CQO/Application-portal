"use strict";
const get = function(url,fn){
  const obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
  obj.open('GET',url,true);
  obj.onreadystatechange = function(){
    if (obj.readyState === 4 && obj.status === 200 || obj.status === 304) { // readyState==4说明请求已完成
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

const post = function (url,data,fn) {
  const postData = JSON.stringify(data);
  const obj = new XMLHttpRequest();
  obj.open("POST", url, true);
  obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
  obj.onreadystatechange = function () {
    if (obj.readyState === 4 ) {  // 304未修改
      fn.call(this, obj.responseText);
    }
  };
  obj.send(postData);
};

//引入图片资源
const $tiangongyuanyuan = require('../assets/tiangongyuanyuan.png'),
      $xinxifabu        = require('../assets/xinxifabu.png'),
      $youjian          = require('../assets/youjian.png'),
      $bangongxitong    = require('../assets/bangongxitong.png');

let globalData = {
  userData : {userName:'测试用户', idCard:666666666, key:223, phoneNumber:18092852085},
  successful : false,
  showList : [],
  appList  : {
    tiangongyuanyuan:{
      id: "10000", 
      name: "天工圆圆", 
      icon: $tiangongyuanyuan,
      url: '', 
      special: "open", 
      type: "communication",
      detail:"版本号:1.41",
      isSelect: false,
      available: true,
      exist:true
    },
    bangongxitong:{
      id:"10004", 
      name:"协同办公", 
      icon:$bangongxitong,
      url:'', 
      special:"url", 
      type:"office",
      detail:"版本号:0.2",
      isSelect:false,
      available: true,
      exist:true
    },
    youjian:{
      id: "10002", 
      name: "邮件", 
      icon: $youjian,
      url: '', 
      special: "url", 
      type: "office", 
      detail:"版本号:1.6",
      isSelect: false,
      available: true,
      exist:true
    },
    xinxifabu:{
      id: "10001", 
      name: "信息发布", 
      icon: $xinxifabu, 
      url: 'http://info.casic.cs/jeecms2/index/mobile/', 
      special: "url", 
      type:"office" ,
      detail:"版本号:0.8",
      isSelect: false,
      available: true,
      exist:true
    }
  },
  notice : {
    xietongbangong:{name: '协同办公', text: '正在拉取...', time: '', img: $bangongxitong,url:'', notice: ''}
  }
};
export {get, cutString, post, globalData};