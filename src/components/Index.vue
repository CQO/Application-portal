<template lang="pug">
.login-box(:class="{ two: selectList }",v-if="needLog")
    .logo-box
        img.logo(src="../assets/logo.png")
        p 智慧企业运行平台
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
            li(v-for="(item,num) in selectList",v-on:click="login(item.usbkeyname,num,item.usbkeyidentification,item.unitId)") {{item.unitName}}
    .step
        .login-button(@click="PreLogin()",:class="{ hide: selectList }") 登录
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
import {post,Timestamp} from "./method.js"
import localforage from 'localforage'
import { QWebChannel } from  "./QTWebChannel"
var preData = [0,null]
export default {
  data () {
    return {
      userName: '刘霞',
      password:'123456',
      promptText:'第一步:输入您的用户名和密码',
      selectList:null,
      needLog:true,
      foo: null
    }
  },
  components: {
    Toast,
    Loading
  },
  created(){
    "use strict";
    const _this = this
    new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        _this.foo = channel.objects.content;
    });
    
    const case1 = function(preData){    
      Order.$emit('Loading', 'hide')
      //判断是否取到数据
      if(preData !=="" && preData !==null){
        const Data = JSON.parse(preData);
        switch(Data.length){
          case 0  : Order.$emit('Toast', '登录失败'); break; 
          //如果用户所属的组织只有一个，那么自动帮用户选择登录
          case 1  : const data = Data[0]; _this.login(data.usbkeyname,0,data.usbkeyidentification,data.unitId); break;
          default : _this.promptText = '第二步:请选择所属组织'; _this.selectList = Data;
        }
      }
      else{
        Order.$emit('Toast', '登录信息错误')
      }
    }
    const case2 = function(receive){
        const _this = this
        preData[0] = 0;
        Order.$emit('Loading', 'hide')
          const Data = JSON.parse(receive);
          //判断错误码是否为 0:成功 113:已登录
          if(Data.code == 0 || Data.code == 113){
            //保存登陆用户信息和时间戳
            const nowTime = new Date().getTime()
            const appData ={
              userData:{ //用户信息
                  userName : preData[2],   //用户名
                  idCard   : preData[4], //身份信息
                  key      : preData[5]  //ID
              }, 
              Timestamp: nowTime //时间戳
            }
            Timestamp.value = nowTime
            //保存用户信息
            localforage.setItem('appData', appData,function (err){
              if(err){ Order.$emit('Toast', '缓存用户数据失败'); return null; } //错误处理
              clearInterval(time);
              window.location.href="#/Main"
            });
          }
          else{
            _this.selectList = null
            Order.$emit('Toast', `密码错误:${Data.code}`)
          }
    }
    function pre(){
      _this.foo.log(preData[0])
      switch(preData[0]){
        case 0 : return null; break;
        case 1 : case1(preData[1]); break;
        case 2 : case2(preData[1]); break;
      }
      preData[0] = 0;
    }
    const time = setInterval(pre,1000);
  },
  methods: {
    PreLogin: function(){ //预登录函数
      const _this    = this,
            userName = this.userName,
            password = this.password;
      //判断用户名和密码是否为空
      if(userName === "" || password === ""){ Order.$emit('Toast', '请输入账号和密码') }
      else{
        // userName : 用户名
        // password : 密码
        const postData = {userName:_this.userName,password:_this.password};

        Order.$emit('Loading', 'show')
        //登陆请求
        _this.foo.callback.connect(function(receive) {
            preData = [1,receive]
        });
        _this.foo.preLogin(JSON.stringify(postData))
      }
    },
    login:function(name,num,idCard,unitId){ //登录函数
      const _this    = this,
            postData = {
                usbkeyidentification : idCard,
                password : this.password,
                unitId : unitId,userName:name
            };
      Order.$emit('Loading', 'show')
      _this.foo.callback.connect(function(receive) {
        preData = [2,receive,name,num,idCard,unitId]
      });
      _this.foo.login(JSON.stringify(postData))
    }
  },
}
</script>

<style lang='less' scoped>
.logo-box{
    width: 180px;
    margin: 0 auto;
    height: 180px;
    padding-top: 20px;
    display:block;
    img{
        height: 80px;
        width: 140px;
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
.login-button:active{
    background-color: blue;
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