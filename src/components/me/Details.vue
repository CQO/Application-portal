<template lang="pug">
.details-box
  TitleBar(title='个人信息',leftIcon="ok",:rightIcon="rightIcon")
  .avatar
    span.text 头像
    img(src="../../assets/user.png")
  .details#details
    .P42
      .item 姓名
      .text {{name}}
      .ico.enter &#xe607;
    .P42(v-on:click.stop="showCheck = true")
      .item 性别
      .text {{gender}}
      .ico.enter &#xe607;
  .phone
    .item 手机号码
    input(type="number",v-model="phoneNumber")
  .phone
    .item 固定电话
    input(type="number",v-model="telPhone")
  .check-box(v-if="showCheck")
    .title
      .button(v-on:click="changeGender") 确定
    .gender-box
      .item(v-on:click.stop = "id = 0")
        span 保密
        .ico(v-show="id == 0") &#xe609;
      .item(v-on:click.stop = "id = 1")
        span 男
        .ico(v-show="id == 1") &#xe609;
      .item(v-on:click.stop = "id = 2")
        span 女
        .ico(v-show="id == 2") &#xe609;
</template>

<script>
import Pa42 from '../panel/Pa42'
import TitleBar from '../brick/Title'
import { Order } from '../Order.js'
import { timeoutDetection, DATA, log } from "../method.js" 
var myData = null

export default {
  components: {
    Pa42,
    TitleBar
  },
  created(){
    //if( timeoutDetection() ) { return null} //时间处理
    //退出信号监听
    Order.$on('getAccountInfo', (message)=> {
      setTimeout(()=>{
        this.name = message.name
        this.oldPhone = message.phone
        this.phoneNumber = message.phone
        this.oldTelPhone = message.telPhone
        this.telPhone = message.telPhone
        this.id = message.gender
        switch(message.gender){
          case 1 : this.gender = "男"; break;
          case 2 : this.gender = "女"; break;
          case 0 : this.gender = "保密"; break;
        }
        this.rightIcon = 'save'
      },0)
    })
    Order.$on('TITLEBUTTONCLICK', (message)=> {
      DATA.CHANNEL.updateAccount(JSON.stringify({
        type:2, 
        phone:this.phoneNumber ,
        telPhone: this.telPhone 
      }))
    })
    DATA.CHANNEL.getAccountInfo()
  },
  data () {
    return {
      oldPhone:'',
      phoneNumber:'',
      oldTelPhone:null,
      telPhone:'',
      name: '',
      gender: '',
      id:0,
      showCheck:false,
      rightIcon:"loading"
    }
  },
  methods: {
    changeGender () {
      switch(this.id){
        case 1 : this.gender = "男"; break;
        case 2 : this.gender = "女"; break;
        case 0 : this.gender = "保密"; break;
      }
      DATA.CHANNEL.updateAccount( JSON.stringify({type:3, gander: this.id}) )
      this.showCheck = false
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
.P42{
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
    color: #b5bac1;
    font-weight: 300;
    text-align: right;
    width: calc(~"100% - 115px");
  }
  .ico{
    width: 30px;
    text-align: center;
    color: #b5bac1;
  }
}
.P42:active{
    background-color: aqua;
}
.check-box{
  position: absolute;
  bottom: 0px;
  height: 160px;
  width: 100%;
  background-color: #f8f8f8;
  .title{
    background-color:gainsboro;
    height:40px;
    line-height:40px;
    display: flex;
    justify-content: Flex-end;
    .button{
      width:50px;
      text-align: center;
    }
  }
  .gender-box{
    height: 150px;
  }
  .item{
    height: 39px;
    text-align: center;
    line-height: 39px;
    border-bottom: 1px solid #dfdde8;
    .ico{
      color: yellow;
    }
  }
}
</style>
