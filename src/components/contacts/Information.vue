<template lang="pug">
.details-box
  TitleBar(title='详细资料',leftIcon="flase")
  Pa85
  .phone
    Pan42(item="职位",text="产品经理")
    .message
      p 联系方式
      .chat.ico(v-on:click="yuanyuan") &#xe60a;
      .mess.ico(v-on:click="sendMes") &#xe619;
    .Pan42(v-on:click="call")
      .item 手机号码
      .text 18092852085
    
</template>

<script>
import Pa85 from '../panel/Pa85'
import Pan42 from '../panel/Pan42'
import TitleBar from '../brick/Title'
import {post} from "../method.js" 
export default {
  components: {
    Pa85,
    Pan42,
    TitleBar
  },
  methods: {
    sendMes:function(){
      const data={scheme:"sms:"+"18092852085"+"?body="};
      //发短信
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.opensopApp(JSON.stringify(data))
      });
    },
    call:function(){
      const data={call:this.text};
      //打电话
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.callPhone(JSON.stringify(data))
      });
    },
    yuanyuan:function(){
      const app1 = {
        "type":2,
        "sopid":"com.vrv.linkDood",
        "pkgpath":"com.vrv.linkDood-1.0.45.sop",
        "scheme":"linkdood:showlinkdood?id=110108198512314993&pwd=123456",
        "name":"linkdood"
      };
      //打开应用
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.opensopApp(JSON.stringify(app1))
      });
    }
  }
}
</script>

<style lang='less' scoped>
.details,.phone{
  margin: 20px 0;
}
.message{
  height: 42px;
  line-height: 42px;
  padding: 0 15px;
  background-color: white;
  display: flex;
  font-size: 0.9rem;
  border-bottom: 1px solid #eaeaea;
  p{
    width: 65px;
  }
  .ico{
    margin: 0 10px;
    font-size: 1.2rem;
    color: burlywood;
  }
}
.Pan42{
  height: 42px;
  line-height: 42px;
  padding: 0 15px;
  background-color: white;
  display: flex;
  font-size: 0.9rem;
  border-bottom: 1px solid #eaeaea;
  .item{
    width: 65px;
  }
  .text{
    width: 65px;
    margin: 0 10px;
  }
}
</style>
