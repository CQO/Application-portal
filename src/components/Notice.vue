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
  BottomBar(index="0")
</template>

<script>
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
import localforage from 'localforage'
export default {
  name: 'page-tabbar',
  components: {
    TitleBar,
    BottomBar
  },
  methods: {
    turn (url) {
      window.location.href=url;
    }
  },
  created(){
    const _this = this;
    function get(url,fn){
      const obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
      obj.open('GET',url,true);
      obj.onreadystatechange=function(){
        if (obj.readyState === 4 && obj.status === 200 || obj.status === 304) { // readyState==4说明请求已完成
          fn.call(this, obj.responseText);  //从服务器获得数据
        }
      };
      obj.send(null);
    }
    localforage.getItem('userName', function (err, value) {
      _this.userName = value;
    });
    localforage.getItem('usbkeyidentification', function (err, value) {
      _this.usbkeyidentification = value;
    });
    /**/
	  function cutString(original,before,after,index){
      index = index || 0;
      if (typeof index === "number") {
        const P = original.indexOf(before, index);
        if (P > -1) {
          if (after) {
            const f = original.indexOf(after, P + 1);
            return (f>-1)? original.slice(P + before.toString().length, f):
            console.error("owo [在文本中找不到 参数三 "+after+"]");} 
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
        };
    }
    get('http://10.152.36.26:8080/CASIC/interfaces/304DaiBanInterface.jsp?userName='+this.userName+'&PID='+this.usbkeyidentification+'&webService=',function(e){
      _this.notice.xietongbangong.text = cutString(e,"Title>","<");
      //时间处理
      const time = cutString(e,"SentTime>","<");
      _this.notice.xietongbangong.time = time;
      //角标处理
      _this.notice.xietongbangong.notice = cutString(e,"wdNum>","<");;
    })
  },
  data () {
    return {
      selected: '通知',
      dbtest:"读本地数据",
      message:"测试消息",
      usbkeyidentification:'',
      userName:'',
      notice: {
        xietongbangong:{name: '协同办公', text: '正在拉取...', time: '', img: 'http://xn--9tr.com/vrv/304/bangongxitong.png',url:'http://10.152.36.26:8080/page_m/dblist.jsp?userName='+this.userName+'&PID='+this.usbkeyidentification+'&webService=', notice: ''}
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