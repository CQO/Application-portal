<template lang="pug">
.login-box(:class="step")
    .logo-box
        img.logo(src="../assets/logo.png")
        p 智慧企业平台
    .user-name-box
        .user.ico &#xe60c;
        input(v-model="userName",:placeholder="userCard")
    .password-box
        .password.ico &#xe623;
        input(v-model="password",placeholder="密码")
    
    .select-list(v-show="selectList")
        .title
            span.ok 选择需要登陆的用户
        ul.list
            li(v-for="item in selectList") {{item.unitName}}
    .step
        .login-button(v-on:click="loginIn") {{buttonText}}
        p {{promptText}}
        .point
            .ico.icon1 &#xe602;
            .ico.icon2 &#xe602;
            .ico.icon3 &#xe602;
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password:'',
      step:'one',
      buttonText:'登录',
      promptText:'第一步:输入您的用户名',
      userCard:'用户名',
      selectList:null,
    }
  },

  methods: {
    post: function (url,data) {
      const postData = JSON.stringify(data);
      const obj = new XMLHttpRequest();
      obj.open("POST", url, true);
      obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
      obj.onreadystatechange = function () {
        if (obj.readyState === 4 && (obj.status === 200 || obj.status === 304)) {  // 304未修改
          document.write(obj.responseText);
        }
      };
      obj.send(data);
    },
    loginIn(){
      switch(this.step){
        case 'one':{
          const data={userName:this.userName};
          //this.post("http://localhost:9999/nameLoginList",data);
          this.selectList=[
            {'enname':'刘霞','unitId':'11','deptName':'惯性公司,综合管理部','unitName':'南京研发中心移动安全研发部研发一部','usbkeyname':'刘霞','userAccount':'2324324','usbkeyidentification':'123456','isFirstLogin':'0','orderNum':1,'orgCode':'10011013','orgID':'11'},
            {'enname':'刘霞','unitId':'11','deptName':'惯性公司,综合管理部','unitName':'南京研发中心移动安全研发部研发一部','usbkeyname':'刘霞','userAccount':'2324324','usbkeyidentification':'123456','isFirstLogin':'0','orderNum':1,'orgCode':'10011013','orgID':'11'}
          ];
          this.promptText='第二步:请输入您所属组织架构';
          this.step='two';
          break;
        }
        case 'two':{
          const data={usbkeyidentification:"",password:"1212"};
          //this.post("http://localhost:9999/login",data);
          this.selectList=null;
          this.userCard = "身份证";
          this.buttonText = "登录"
          this.promptText='第三步:请填写您的身份证和密码';
          this.step='three';
          break;
        }
      }

      const data={usbkeyidentification:"",password:"1212"};
      //this.post("http://localhost:9999/login",data);
    }
  },
}
</script>

<style lang='less' scoped>
.logo-box{
    width: 140px;
    margin: 0 auto;
    height: 200px;
    padding-top: 60px;
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
            border-bottom: 1px solid cyan;
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
    position: absolute;
    bottom: 0;
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
.three{
    .icon3{
        color: blue;
    }
}
</style>