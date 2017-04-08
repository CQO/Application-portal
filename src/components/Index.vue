<template lang="pug">
.login-box(:class="step")
    .logo-box
        img.logo(src="../assets/logo.png")
        p 智慧企业平台
    .user-name-box(:class="{ error: userNameError }")
        .user.ico &#xe60c;
        input(v-model="userName",:placeholder="userPoint",v-on:change.stop="checkUserName")
    .password-box(:class="{ error: passWordError }")
        .password.ico &#xe623;
        input(type="password",v-model="password",:placeholder="passWordPoint",v-on:change.stop="checkPassWord")
    
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
import localforage from 'localforage'
import {post} from "./method.js" 
import Loading from './brick/Loading'
import Toast from './brick/Toast'
import { Order } from './Order.js'
import {globalData} from "./method.js"
export default {
  data () {
    return {
      userName: '刘霞',
      password:'123456',
      step:'one',
      promptText:'第一步:输入您的用户名和密码',
      selectList:null,
      usbkeyidentification:null,
      userPoint:'用户名',
      userNameError:false,
      passWordPoint:'密码',
      passWordError:false,
      textAlert:'',//弹出框显示文字
      showPositionValue:false
    }
  },
  components: {
    Toast,
    Loading
  },
  methods: {
    loginIn: function(){
      const _this = this;
      const postData={userName:this.userName,password:this.password};
      if(_this.passWordError || _this.userNameError){
        Order.$emit('Toast', '请输入账号密码')
      }
      else{
        Order.$emit('Loading', 'show')
        //登陆请求
        post("http://localhost:9999/nameLoginList",postData,function(data){
          Order.$emit('Loading', 'hide')
          //判断是否取到数据
          if(data !=="" && data !==null){
            const Data = JSON.parse(data);
            if(Data.length === 0){
              Order.$emit('Toast', '用户名或密码错误')
            }
            else{
              if(Data.length === 1){
                const data = Data[0]
                _this.jump(data.usbkeyname,0,data.usbkeyidentification,data.unitId)
              }
              _this.step = "two"
              _this.promptText = '第二步:请选择所属组织'
              _this.selectList=Data
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
      const data={usbkeyidentification:idCard,password:this.password};
      post("http://localhost:9999/login",data,function(d){
        Order.$emit('Loading', 'hide')
        const Data = JSON.parse(d);
        if(Data.code == 0){
          const userData ={userName:name, idCard:idCard, key:unitId}
          //把用户名存储到起来
          localforage.setItem('userData', userData, function (err){
            globalData.userData = userData
            window.location.href="#/Main"
          });
        }
        else{
          Order.$emit('Toast', '密码错误！')
          _this.selectList = null
        }
      });
    },
    checkUserName:function(){
      //判断用户名是否正确
      if(this.userName === ''){
        this.userPoint = '用户名不能为空！'
        this.userNameError = true
      }
      else{
        this.userPoint = '用户名'
        this.userNameError = false
      }
    },
    checkPassWord:function(){
      //判断用户名是否正确
      if(this.userName === ''){
        this.passWordPoint = '密码不能为空！'
        this.passWordError = true
      }
      else{
        this.passWordPoint = '密码'
        this.passWordError = false
      }
    },
    closeAlert:function () {
      //将弹出框隐藏
      this.showAlert = false
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
.one{
    .icon1{
        color: blue;
    }
}
.two{
    .icon2{
        color: blue;
    }
}
.hide{
    visibility:hidden;
}
.error {
    border-color: cadetblue;
}
</style>

<style scoped>
.alert-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.main-box {
    position: absolute;
    height: 150px;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    width: 80%;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.text-box p {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 1.2rem;
}
.text-box .text {
    text-align: center;
    color: #999;
    height: 70px;
    overflow-y: auto;
    overflow-x: hidden;
}
.button{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 1.4rem;
    color: darkorchid;
    border-top: 1px solid beige;
}
</style>
