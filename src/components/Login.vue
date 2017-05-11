<template lang="pug">
.login-box
    .logo-box
        img(src="../assets/logo.png")
        p 智慧企业运行平台
    .user-name-box(:class="{ hide: selectList }")
        .user.ico &#xe60c;
        input(v-model="userName",placeholder="用户名")
    .password-box(:class="{ hide: selectList }")
        .password.ico &#xe623;
        input(type="password",v-model="password",placeholder="密码")
    .select-list(v-show="selectList")
        .title
            span.ok 选择需要登陆的用户
            .close.ico(@click.stop="selectList = null") &#xe697;
        ul.list
            li(v-for="item in selectList",v-on:click="login(item.usbkeyname,item.usbkeyidentification,item.unitId,item.unitName)") {{item.unitName}}
    .step
        .login-button(@click.stop="PreLogin()",:class="{ hide: selectList }") 登录
        .point
            .ico(:class = "{ active:!selectList }") &#xe602;
            .ico(:class = "{ active:selectList }") &#xe602;
    Loading(text="正在登录")
    Toast
</template>

<script>
import Loading from './brick/Loading'
import Toast from './brick/Toast'
import { Order } from './Order.js'
import {Timestamp, DATA, log} from "./method.js"
import localforage from 'localforage'

export default {
  data () {
    return {
      userName: '',
      password: '',
      selectList: null
    }
  },
  components: {
    Toast,
    Loading
  },
  created(){
    if(this.$route.params.name) this.userName = this.$route.params.name //智能保存用户名
  },
  methods: {
    PreLogin: function() { //预登录函数
      //判断用户名和密码是否为空
      if( this.userName === '' || this.password === '' ){ Order.$emit('Toast', '请正确输入账号和密码'); return null; }
      //预登录信号监听
      Order.$once('preLogin', (message) => {
        setTimeout( ()=>{
          Order.$emit('Loading', 'hide')
          if(!message) {Order.$emit('Toast', '返回数据为空！');return;}
          switch(message.length){ //判断同名用户数量
            case 0  : Order.$emit('Toast', '登录失败'); break; 
            //如果用户所属的组织只有一个，那么自动帮用户选择登录
            case 1  : const data = message[0]; this.login(data.usbkeyname,data.usbkeyidentification,data.unitId,data.unitName); break;
            default : this.selectList = message;
          }
        },0);
      })
      Order.$emit('Loading', 'show')
      DATA.CHANNEL.preLogin( `{"userName":"${this.userName}","password":"${this.password}"}` )
    },
    login:function(userName,idCard,unitId, unitName){ //登录函数
      DATA.unitId = unitId //保存unitId
      DATA.idCard = idCard //保存身份证信息
      DATA.userName = userName //存储登录的用户名
      Order.$emit('Loading', 'show')
      //登录信号监听
      Order.$once('login', function(message) {
        setTimeout(()=>{
          Order.$emit('Loading', 'hide')
          const Res = message;
          function loginSuccess(){
            const nowTime = new Date().getTime()
            const appData = {
              userData:{ //用户信息
                userName : userName,   //用户名
                idCard   : idCard, //身份信息
                unitId   : unitId,  //ID
                unitName : unitName
              }, 
              Timestamp: nowTime //时间戳
            }
            Timestamp.value = nowTime
            //保存用户信息
            localforage.setItem('appData', appData, function (err){
              if(err){ Order.$emit('Toast', '缓存用户数据失败'); return null; } //错误处理
              window.location.href="#/Main"
            });
          }
          //判断错误码是否为 0:成功 113:已登录
          switch(Res.code){
            case 0  :  loginSuccess(); break;
            case 113:  loginSuccess(); break;
            case 112:  Order.$emit('Toast', `用户名或密码错误`); break;
            default :  Order.$emit('Toast', `登录失败 Code:${Res.code}`)
          }
          this.selectList = null
        },0)
      })
      DATA.CHANNEL.login(JSON.stringify({
        usbkeyidentification : idCard, //身份证
        password : this.password, //密码
        unitId : unitId, //
        userName: userName,
      }))
    },
    focus:function(){
      this.showLogin = false
    },
    blur:function(){
      this.showLogin = true
    }
  },
}
</script>

<style lang='less' scoped>
.logo-box{
    width: 180px;
    margin: 0 auto;
    height: 180px;
    padding-top: 40px;
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
    height: 280px;
    margin: 0 auto;
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    width: 90%;
    border-radius: 5px;
    .title{
        height: 40px;
        background-color: #dcd6d6;
        border-radius: 5px 5px 0 0;
        position:relative;
        .ico{
            color: cadetblue;
            position: absolute;
            right: 7px;
            top: 7px;
        }
    }
    .ok{
        color: cadetblue;
        line-height: 40px;
        margin-left: 10px;
    }
    .list{
        overflow-y: auto;
        user-select:none;
        background-color: white;
        li{
            padding: 10px;
            border-bottom: 1px solid #dcecec;
            text-align: center;
        }
        li:active{
            background-color: #4899E0;
            color: #FFF;
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
.ico{
    font-size: 1.4rem;
    color: #ccc;
}
.active{
    color: blue;
}

.hide{
    visibility:hidden;
}
</style>