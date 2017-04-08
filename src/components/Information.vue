<template lang="pug">
.details-box
  TitleBar(title='详细资料',leftIcon="flase")
  Pa85
  .phone(v-on:click="call")
    Pan42(item="职位",text="产品经理")
    .message
      p 联系方式
      .chat.ico(v-on:click="yuanyuan") &#xe60a;
      .mess.ico(v-on:click="sendMes") &#xe619;
    Pan42(item="手机号码",text="18092852085")
    
</template>

<script>
import Pa85 from './panel/Pa85'
import Pan42 from './panel/Pan42'
import TitleBar from './bar/Title'
import {post} from "./method.js" 
export default {
  components: {
    Pa85,
    Pan42,
    TitleBar
  },
  methods: {
    sendMes:function(){
      const data={scheme:"sms:"+"000000"+"?body="};
      post("http://localhost:9999/open",data,function(d){
        if(d !=="" && d !==null){
          const Data = JSON.parse(d);
          _this.showList = Data;
        }
        else{
          _this.textAlert = '网络错误'
          _this.showPositionValue = true
        }
      });
    },
    call:function(){
      const data={call:"10086"};
      post("http://localhost:9999/call",data,function(d){
        if(d !=="" && d !==null){
          const Data = JSON.parse(d);
          _this.showList = Data;
        }
        else{
          _this.textAlert = '网络错误'
          _this.showPositionValue = true
        }
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
      //向9999端口发送Post请求打开应用
      post("http://localhost:9999/open",app1,function(date){
        console.log(date)
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
</style>
