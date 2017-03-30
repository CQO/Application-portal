<template lang="pug">
.login-box
    .logo-box
        img.logo(src="../assets/logo.png")
        p 智慧企业平台
    .user-name-box
        .user.ico &#xe60c;
        input(v-model="userName",placeholder="用户名")
    .password-box
        .password.ico &#xe623;
        input(v-model="password",placeholder="密码")
    .login-button(v-on:click="loginIn",v-show="!selectData") 登陆
    .select-list(v-show="selectData")
        .title
            span.ok 选择需要登陆的用户
        ul.list
            li(v-for="item in selectList") {{item.text}}

</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password:'',
      selectList:[
        {text:"王峰 财务部",id:"10000"},
        {text:"王峰 开发一组 科研部",id:"10001"},
        {text:"王峰 开发二组 科研部",id:"10002"},
        {text:"王峰 开发二组 科研部",id:"10002"},
        {text:"王峰 开发二组 科研部",id:"10002"}
      ],
      selectData:null,
    }
  },
  methods: {
    loginIn(){
        console.log("sd");
        this.selectData={};
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
</style>