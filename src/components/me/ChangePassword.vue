<template lang="pug">
.change-password-box
  TitleBar(title='更改密码',leftIcon="flase")
  .title 当前密码
  input(v-model="oldPassword", type="text", placeholder="当前密码")
  .title 新密码
  input(v-model="password", type="text", placeholder="新密码")
  .title 重复新密码
  input(v-model="repeatPassword", type="text", placeholder="重复新密码")
  .button(v-on:click="verification") 确定
  Loading(text="正在登录...")
</template>


<script>
import TitleBar from '../brick/Title'
import Loading from '../brick/Loading'
import { Order } from '../Order.js'
import Toast from '../brick/Toast'
export default {
  components: {
    TitleBar,
    Loading
  },
  methods: {
    //更改密码验证
    verification () { 
      if(this.new !== this.news) return null; //密码验证
      new QWebChannel(navigator.qtWebChannelTransport, (channel) => {
        const foo = channel.objects.content;
        foo.callback.connect( (receive) => {
          const Data = JSON.parse(receiveData);
          switch(Data.code){
            case 543 : Order.$emit('Toast', '原密码不正确')
          }
        });
        const data = {oldPwd : this.oldPassword, newPwd : this.password}
        foo.changedPwd(JSON.stringify(data))
      })
    }
  },
  data () {
    return {
      oldPassword:"",
      password:"",
      repeatPassword:""
    }
  },
}
</script>

<style lang='less' scoped>
.change-password-box{
    .title{
        height: 30px;
        line-height: 30px;
        background-color: #f4f4f4;
        font-size: 12px;
        color: grey;
        padding: 0 10px;
    }
    input{
        width: 100%;
        height: 50px;
        border: none;
        padding: 0 10px;
        font-size: 1rem;
    }
    .button{
        width: 160px;
        background-color: cadetblue;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        border-radius: 5px;
        color: white;
        margin-top: 50px;
    }
}
</style>