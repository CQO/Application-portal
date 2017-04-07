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
      console.log(obj);
      fn.call(this, obj.responseText);
    }
  };
  obj.send(postData);
};

export {get, cutString, post};