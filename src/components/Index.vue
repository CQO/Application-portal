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
            li(v-for="(item,num) in selectList",v-on:click="jump(item.unitName,num)") {{item.unitName}}
    .step
        .login-button(v-on:click="loginIn",:class="{ hide: selectList }") 登录
        p {{promptText}}
        .point
            .ico.icon1 &#xe602;
            .ico.icon2 &#xe602;
    .alert-box(v-show="showAlert")
        .main-box
            .text-box
                p 登录失败
                .text {{textAlert}}
            .button(v-on:click="closeAlert") 确定
</template>

<script>
import localforage from 'localforage'

export default {
  data () {
    return {
      userName: '',
      password:'',
      step:'one',
      promptText:'第一步:输入您的用户名和密码',
      selectList:null,
      usbkeyidentification:null,
      userPoint:'用户名',
      userNameError:true,
      passWordPoint:'密码',
      passWordError:true,
      showAlert:false,//控制提醒框是否显示
      textAlert:'',//弹出框显示文字
    }
  },
  methods: {
    post: function (url,data,fn) {
      const postData = JSON.stringify(data);
      const obj = new XMLHttpRequest();
      obj.open("POST", url, true);
      obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
      obj.onreadystatechange = function () {
        if (obj.readyState === 4 ) {  // 304未修改
          fn.call(this, obj.responseText);
        }
      };
      obj.send(postData);
    },
    loginIn: function(){
      const _this = this;
      const postData={userName:this.userName,password:this.password};
      if(_this.passWordError || _this.userNameError){
        _this.textAlert = '账号密码没有输入'
        _this.showAlert = true
      }
      else{
        //登陆请求
        this.post("http://localhost:9999/nameLoginList",postData,function(data){
          //判断是否取到数据
          if(data !=="" && data !==null){
            const Data = JSON.parse(data);
            //document.write(d);
            if(d === "[]"){
              window.location.href="#/Main"
            }
            else{
              this.promptText = '第二步:请选择所属组织';
              //把用户名存储到起来
              localforage.setItem('userName', this.userName, function (err){
                if(err){
                  console.log("数据库操作失败！")
                }
              });
              _this.selectList=Data
            }
          }
          else{
            _this.textAlert = '与服务器连接出现问题！'
            _this.showAlert = true
          }
        });
      }
    },
    jump:function(name,num){
      const _this = this;
      const data={usbkeyidentification:this.selectList[num].usbkeyidentification,password:this.password};
      localforage.setItem('usbkeyidentification', this.selectList[num].usbkeyidentification, function (err){
        
      });
      this.post("http://localhost:9999/login",data,function(d){
        const Data = JSON.parse(d);
      });
        window.location.href="#/Main"
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
    width: 140px;
    margin: 0 auto;
    height: 200px;
    padding-top: 40px;
    img{
        height: 100px;
        width: 100px;
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
