<template lang="pug">
.login-box(:class="{ two: selectList }",v-if="needLog")
    .logo-box
        img.logo(src="../assets/logo.png")
        p 智慧企业平台
    .user-name-box
        .user.ico &#xe60c;
        input(v-model="userName",placeholder="用户名")
    .password-box
        .password.ico &#xe623;
        input(type="password",v-model="password",placeholder="密码")
    
    .select-list(v-show="selectList")
        .title
            span.ok 选择需要登陆的用户
        ul.list
            li(v-for="(item,num) in selectList",v-on:click="jump(item.usbkeyname,num,item.usbkeyidentification,item.unitId)") {{item.unitName}}
    .step
        .login-button(@click="loginIn()",:class="{ hide: selectList }") 登录
        p {{promptText}}
        .point
            .ico.icon1 &#xe602;
            .ico.icon2 &#xe602;
    Loading(text="正在登录...")
    Toast
</template>

<script>
import Loading from './brick/Loading'
import Toast from './brick/Toast'
import { Order } from './Order.js'
import {post, globalData} from "./method.js"
export default {
  data () {
    return {
      userName: '刘霞',
      password:'123456',
      promptText:'第一步:输入您的用户名和密码',
      selectList:null,
      needLog:false
    }
  },
  components: {
    Toast,
    Loading
  },
  created(){
    const _this = this;
    if(globalData.successful === false){
      post("http://localhost:9999/getLoginStatus","",function(receive){
        if(receive!==null && receive != ""){
          const Data = JSON.parse(receive);
          globalData.userData = {
            userName : Data.userName,
            idCard   : Data.usbkeyidentification,
            password : Data.password,
            key      : Data.unitId,
          }
          window.location.href="#/Main"
        }
        else{
          _this.needLog = true
        }
      })
    }
    else{
      _this.needLog = true
    }
  },
  methods: {
    loginIn: function(){ //登录函数
      const _this    = this,
            postData = {userName:this.userName,password:this.password};
      //判断用户名和密码是否为空
      if(_this.userName === "" || _this.password === ""){ Order.$emit('Toast', '请输入账号密码') }
      else{
        Order.$emit('Loading', 'show')
        //登陆请求
        post("http://localhost:9999/nameLoginList",postData,function(receive){
          Order.$emit('Loading', 'hide')
          //判断是否取到数据
          if(receive !=="" && receive !==null){
            const Data = JSON.parse(receive);
            if(Data.length === 0){
              Order.$emit('Toast', '用户名或密码错误')
            }
            else{
              if(Data.length === 1){
                const data = Data[0]
                _this.jump(data.usbkeyname,0,data.usbkeyidentification,data.unitId)
              }
              else{
                _this.promptText = '第二步:请选择所属组织'
                _this.selectList=Data
              }
            }
          }
          else{
            Order.$emit('Toast', '登录失败')
          }
        });
      }
    },
    jump:function(name,num,idCard,unitId){
      const _this = this;
      Order.$emit('Loading', 'show')
      const data={usbkeyidentification:idCard,password:this.password,unitId:unitId,userName:name};
      post("http://localhost:9999/login",data,function(d){
        Order.$emit('Loading', 'hide')
        const Data = JSON.parse(d);
        if(Data.code == 0){
          const userData ={userName:name, idCard:idCard, key:unitId}
          //保存用户信息
          globalData.userData = userData
          globalData.successful = true
          window.location.href="#/Main"
        }
        else{
          Order.$emit('Toast', '密码错误！')
          _this.selectList = null
        }
      });
    }
  },
}
</script>

<style lang='less' scoped>
.logo-box{
    width: 160px;
    margin: 0 auto;
    height: 180px;
    padding-top: 60px;
    display:block;
    img{
        height: 80px;
        width: 120px;
        margin: 0 20px;
    }
    p{
        color: #099dff;
        font-size: 22px;
        text-align: center;
    }
}
.user-name-box,.password-box{
    width: 300px;
    height: 50px;
    border: 1px solid #099dff;
    border-radius: 5px;
    margin: 20px auto;
    display: flex;
    input{
        height: 50px;
        border: 0;
        background-color: #f4f4f4;
        width: 245px;
        font-size: 1rem;
        padding: 0;
    }
    .ico{
        height: 50px;
        width: 50px;
        font-size: 1.2rem;
        text-align: center;
        line-height: 50px;
        color: #a4a9b2;
    }
}
.select-list{
    height: 200px;
    background-color: white;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 90%;
    border-radius: 5px;
    .title{
        height: 40px;
        background-color: #dcd6d6;
        border-radius: 5px 5px 0 0;
    }
    .ok{
        line-height: 40px;
        margin-left: 10px;
        color: cadetblue;
    }
    .list{
        height: 160px;
        overflow-y: auto;
        li{
            padding: 10px;
            border-bottom: 1px solid #dcecec;
            text-align: center;
        }
    }
}
.login-button{
    width: 300px;
    height: 50px;
    border-radius: 5px;
    margin: 40px auto;
    background-color: #099dff;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 1.4rem;
}
.step{
    width: 100%;
    text-align: center;
    color: #ccc;
}
.icon1{
    color: blue;
}
.two{
    .icon1{
        color: #ccc;
    }
    .icon2{
        color: blue;
    }
}
.hide{
    visibility:hidden;
}
</style>