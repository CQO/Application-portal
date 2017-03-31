<template lang="pug">
.login-box(:class="step")
    .logo-box
        img.logo(src="../assets/logo.png")
        p 智慧企业平台
    .user-name-box
        .user.ico &#xe60c;
        input(v-model="userName",placeholder="用户名")
    .password-box
        .password.ico &#xe623;
        input(v-model="password",placeholder="密码")
    
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
</template>

<script>
import localforage from 'localforage'
export default {
  data () {
    return {
      userName: '刘霞',
      password:'123456',
      step:'one',
      promptText:'第一步:输入您的用户名',
      selectList:null,
      usbkeyidentification:null
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
      const data={userName:this.userName,password:this.password};
      localforage.setItem('userName', this.userName, function (err){
        
      });
      this.post("http://localhost:9999/nameLoginList",data,function(d){
        const Data = JSON.parse(d);
        //document.write(d);
        if(d === "[]"){
            window.location.href="#/Main"
        }
        else{
            _this.selectList=Data
        }
        //_this.selectList=Data
      });
    },
    jump(name,num){
      const _this = this;
      const data={usbkeyidentification:this.selectList[num].usbkeyidentification,password:this.password};
      this.post("http://localhost:9999/login",data,function(d){
        const Data = JSON.parse(d);
      });
        window.location.href="#/Main"
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
</style>