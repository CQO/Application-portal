<template lang="pug">
.details-box
  TitleBar(title='个人信息',leftIcon="flase")
  .avatar
    span.text 头像
    img(src="../../assets/user.png")
  .details
    Pa42(item="姓名", :text="name",to="GenderSetting")
    Pa42(item="性别", :text="gender",to="GenderSetting")
  .phone
    .item 手机号码
    input(type="text",v-model="phoneNumber",v-on:change="phoneNumberChange")
</template>

<script>
import Pa42 from '../panel/Pa42'
import TitleBar from '../brick/Title'
import localforage from 'localforage'
import { Order } from '../Order.js'
import { timeoutDetection } from "../method.js" 
import { QWebChannel } from  "../QTWebChannel"


export default {
  components: {
    Pa42,
    TitleBar
  },
  created(){
    if( timeoutDetection() ) { return null} //时间处理
    const _this = this
    Order.$on('getAccountInfo', (msg) => {
      this.name = msg.name
      this.oldPhone = msg.phone
      this.phoneNumber = msg.phone
      switch(msg.gender){
        case 1 : this.gender = "男"; break;
        case 2 : this.gender = "女"; break;
        case 0 : this.gender = "保密"; break;
      }
      this.$forceUpdate()
    })
    new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
      //document.write(channel)
      _this.communication = channel.objects.content;
      _this.communication.callback.connect(function(receive) {
        _this.phoneNumber = "sdsd"
        Order.$emit('getAccountInfo', JSON.parse(receive))
        //_this.$forceUpdate()
      });
      _this.communication.getAccountInfo()
    })
  },
  beforeDestroy(){
    if(this.oldPhone !== this.phoneNumber){
      this.communication.updateAccount(JSON.stringify({type:2, phone:this.phoneNumber}))
    }
  },
  data () {
    return {
      oldPhone:'',
      phoneNumber:'',
      name: '',
      gender: '',
      communication: null
    }
  },
  methods: {
    phoneNumberChange () {
      this.phoneNumber = this.phoneNumber
    }
  },
}
</script>

<style lang='less' scoped>
.details,.phone{
  margin: 20px 0;
}
.phone{
  height: 40px;
  background-color: white;
  line-height: 40px;
  padding: 0 15px;
  font-size: 0.9rem;
  display: flex;
  .item{
    width: 100px;
  }
  input{
    border: none;
    outline: medium;
    text-align: right;
    width: 230px;
  }
}
.avatar{
    display: flex;
    height: 85px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    padding: 0 15px;
    margin: 10px 0;
    .ico{
        width: 30px;
        height: 85px;
        text-align: center;
        line-height: 82px;
        color:#a4a9b2;
        font-size: 1.4rem;
    }
    img{
        width: 65px;
        height: 65px;
        margin: 10px;
        border-radius: 5px;
    }
    .icon{
        font-size: 1.2rem;
    }
    .text{
        width: calc(~"100% - 85px");
        line-height: 85px;
        font-size: 1.2rem;
    }
}
</style>
