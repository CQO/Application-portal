<template lang="pug">
.details-box
  TitleBar(title='详细资料',leftIcon="flase")
  .pre-inf
    img(src="../../assets/user.png")
    .inf
        p.name.item {{$route.params.name}}
        p.department.item 科研部
  .phone
    .Pan42(v-on:click="call")
      .item 职位
      .text 产品经理
      
    .Pan42
      .item 手机号码
      .text(v-on:click.stop="call") 18092852085
      .call-box
        .chat.ico(v-on:click.stop="yuanyuan") &#xe60a;
        .mess.ico(v-on:click.stop="sendMes") &#xe619;
</template>

<script>
import TitleBar from '../brick/Title'
import {post} from "../method.js" 
import { QWebChannel } from  "../QTWebChannel"
export default {
  components: {
    TitleBar
  },
  data () {
    return {
      number:"18092852085"
    }
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
      //打电话
      new QWebChannel(navigator.qtWebChannelTransport, (channel) => {
        const foo = channel.objects.content;
        foo.callPhone(this.number)
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
  },
}
</script>

<style lang='less' scoped>
.details,.phone{
  margin: 20px 0;
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
    width: 160px;
    margin: 0 10px;
  }
  .ico{
    margin: 0 10px;
    font-size: 1.2rem;
    color: burlywood;
  }
  .ico:active{
    color: skyblue;
  }
}
.pre-inf{
    display: flex;
    height: 85px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    padding: 0 15px;
    margin: 10px 0;
    img{
        width: 60px;
        height: 60px;
        margin: 13px 0;
        border-radius:5px;
    }
    .item{
        height: 23px;
        line-height: 23px;
        font-size: 0.8rem;
    }
    .inf{
        margin-left: 20px;
    }
    .name{
        height: 50px;
        line-height: 63px;
        font-size: 1.2rem;
    }
    .department{
        color: #b2b2b2;
    }
}
</style>
