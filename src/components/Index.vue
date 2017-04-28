<template lang="pug">
.login-box(:class="{ two: selectList }",@click.stop="selectList = null")
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
import {Timestamp, CHANNEL, DATA} from "./method.js"
import localforage from 'localforage'

var preData = [0,null]
export default {
  data () {
    return {
      userName: '朱光晨',
      password:'123456',
      selectList:null,
      foo: null
    }
  },
  components: {
    Toast,
    Loading
  },
  created(){
    //清空全局变量
    preData = [0,null]
    if(DATA.userName) this.userName = DATA.userName //智能保存用户名

  },
  beforeMount(){
    //预登录方法
    const stepOne = (receive) => {
      preData[0] = 0

    }
        //正式登陆方法
    const stepTwo = (receive) => {
        preData[0] = 0;
        Order.$emit('Loading', 'hide')
        const Res = receive.receive;
        //判断错误码是否为 0:成功 113:已登录
        if(Res.code == 0 || Res.code == 113){
          //保存登陆用户信息和时间戳
          const nowTime = new Date().getTime()
          const appData = {
            userData:{ //用户信息
              userName : receive.userName,   //用户名
              idCard   : receive.idCard, //身份信息
              key      : receive.key,  //ID
              unitName : receive.unitName,
              gender   : 3

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
          this.selectList = null
          switch(Res.code){
            case 112:  Order.$emit('Toast', `用户名或密码错误`); break;
            default :  Order.$emit('Toast', `登录失败 Code:${Res.code}`)
          }
        }
    }
    //定时器
    const time = setInterval(() => {
      switch(preData[0]){
        case 0 : return null; break;
        case 2 : stepTwo(preData[1]); break;
      }
    },1000);
  },
  methods: {
    PreLogin: function() { //预登录函数
      const _this    = this,
            userName = this.userName,
            password = this.password;
      DATA.userName = userName
      //判断用户名和密码是否为空
      //if( userName === '' || password === '' ) Order.$emit('Toast', '请输入账号和密码'); return null;
      //预登录信号监听
      Order.$on('preLogin', (message) => {
        setTimeout( ()=>{
          Order.$emit('Loading', 'hide')
          //判断是否取到数据
          if(message !=="" && message !==null){
            const Data = message
            switch(Data.length){
              case 0  : Order.$emit('Toast', '登录失败'); break; 
              //如果用户所属的组织只有一个，那么自动帮用户选择登录
              case 1  : const data = Data[0]; this.login(data.usbkeyname,data.usbkeyidentification,data.unitId,data.unitName); break;
              default : this.selectList = Data;
            }
          }
          else{
            Order.$emit('Toast', '登录信息错误')
          }
        },0);
      })
      Order.$emit('Loading', 'show')
      CHANNEL.preLogin( `{"userName":"${this.userName}","password":"${this.password}"}` )
    },
    login:function(name,idCard,unitId, unitName){ //登录函数
      const postData = {
        usbkeyidentification : idCard, //身份证
        password : this.password, //密码
        unitId : unitId, //
        userName:name,
      };
      DATA.unitId = unitId //保存unitId
      DATA.idCard = idCard //保存身份证信息
      Order.$emit('Loading', 'show')
      //登录信号监听
      Order.$on('login', function(message) {
        const data = {
          receive:message,
          userName:name,
          idCard:idCard,
          key:unitId,
          unitName: unitName
        }
        preData = [2,data]
      })
      CHANNEL.login(JSON.stringify(postData))
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
    height: 240px;
    background-color: white;
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
    }
    .ok{
        color: cornflowerblue;
        line-height: 40px;
        margin-left: 10px;
    }
    .list{
        height: 160px;
        overflow-y: auto;
        user-select:none;
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