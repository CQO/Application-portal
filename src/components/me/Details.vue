<template lang="pug">
.details-box
  TitleBar(title='个人信息',leftIcon="flase")
  .avatar
    span.text 头像
    img(src="../../assets/user.png")
  .details
    Pa42(item="姓名", :text="name",to="TimeOut")
    Pa42(item="性别", text="未填写",to="GenderSetting")
  .phone
    .item 手机号码
    input(type="text",v-model="phoneNumber",v-on:change="phoneNumberChange")
</template>

<script>
import Pa42 from '../panel/Pa42'
import TitleBar from '../brick/Title'
import localforage from 'localforage'
import { timeoutDetection } from "../method.js" 
export default {
  components: {
    Pa42,
    TitleBar
  },
  created(){
    if( timeoutDetection() ) { return null} //时间处理
    localforage.getItem("appData",(err,appData) =>{
      this.name = appData.userData.userName
      this.phoneNumber = appData.userData.phoneNumber
    })
  },
  data () {
    return {
      phoneNumber:'',
      name: ''
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
