<template lang="pug">
.personal-information
  TitleBar(title='我')
  .title 个人信息
  router-link.information(to="\Details")
    img(src="../assets/user.png")
    p.name {{userName}} 
    .ico &#xe659;
  .title 操作
  P42(v-for="item in list",:icoCode="item.icon",:text="item.title",:color="item.color",:url="item.url",:key="item.id")
  .quit(v-on:click="quitApp") 退出登录
  Loading(text="正在退出...")
  BottomBar(index="3")
</template>

<script>
import Loading from './brick/Loading'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
import P42 from './panel/P42'
import localforage from 'localforage'
import {post} from "./method.js"
import { Order } from './Order.js'
export default {
  components: {
    TitleBar,
    BottomBar,
    Loading,
    P42
  },
  methods: {
    quitApp: function(url) { //退出登录
      const _this = this;
      const postData={userName:this.userName,password:this.password};
      Order.$emit('Loading', 'show')
      post("http://localhost:9999/loginout",postData,function(data){
        //隐藏退出提示
        Order.$emit('Loading', 'hide')
        //收到消息就返回主界面
        window.location.href="#/Quit";
      });
    }
  },
  created(){
    const _this = this;
    //获取用户名
    localforage.getItem('userData', function (err, value) {
      if(value){
        _this.userName = value.userName;
      }
    });
  },
  data () {
    return {
      list: [
        { icon: '&#xe600;', title: '设置', color:'#61c2ff', id:"1000",url:"/Sett"}, 
        { icon: '&#xe629;', title: '帮助', color:'#ffd217', id:"1001",url:"/Help"},
        { icon: '&#xe60e;', title: '当前版本', color:'#1bee47', id:"1002",url:"/Version"}
      ],
      userName:"未登录",
      sexList:["保密","男","女"],
      sex:""
    }
  }
}
</script>


<style lang='less' scoped>
.personal-information{
    .title{
      height: 30px;
      line-height: 30px;
      color: #a8a8a8;
      padding-left: 10px;
      font-size: 0.8rem;
      background-color: #f4f4f4;
    }
    .set{
        margin:0;
    }
    .quit{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: white;
        border: 1px solid #e5e5e5;
        margin: 20px 0;
    }
    .weui-cells{
      font-size: 0.9rem;
    }
    .information{
      height: 61px;
      display: flex;
      background-color: white;
      img{
        height: 45px;
        width: 45px;
        margin: 8px;
        border-radius: 5px;
      }
      .name{
        width: calc(~"100% - 90px");
        line-height: 61px;
        font-size: 0.9rem;
      }
      .ico{
        line-height: 60px;
        color: #a4a9b2;
      }
    }
}
</style>