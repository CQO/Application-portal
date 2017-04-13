<template lang="pug">
.details-box
  TitleBar(title='个人信息',leftIcon="flase")
  P85
  .details
    Pa42(item="姓名", :text="name",to="GenderSetting")
    Pa42(item="性别", text="未填写",to="GenderSetting")
  .phone
    .item 手机号码
    input(type="text",v-model="phoneNumber",v-on:change="phoneNumberChange")
</template>

<script>
import P85 from './panel/P85'
import Pa42 from './panel/Pa42'
import TitleBar from './bar/Title'
import localforage from 'localforage'
export default {
  components: {
    P85,
    Pa42,
    TitleBar
  },
  created(){
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
</style>
