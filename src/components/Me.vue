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
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import P42 from './panel/P42'
import {post, timeoutDetection} from "./method.js"
import { Order } from './Order.js'
import localforage from 'localforage'
export default {
  components: {
    TitleBar,
    BottomBar,
    Loading,
    P42,
  },
  methods: {
    quitApp: function(url) { //退出登录
      const _this = this;
      Order.$emit('Loading', 'show')
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.callback.connect(function(receive) {
          //隐藏退出提示
          Order.$emit('Loading', 'hide')
          //收到消息就返回主界面
          window.location.href="#/";
        });
        foo.loginout()
      });
    }
  },
  created(){
    const _this = this
    localforage.getItem("appData",function(err,appData){
      //超时检测
      if(timeoutDetection()) return null
      _this.userName = appData.userData.userName
    })
  },
  data () {
    return {
      list: [
        { icon: '&#xe600;', title: '更改密码', color:'#61c2ff', id:"1000",url:"/ChangePassword"}, 
        { icon: '&#xe629;', title: '帮助', color:'#ffd217', id:"1001",url:"/Help"},
        { icon: '&#xe60e;', title: '当前版本', color:'#1bee47', id:"1002",url:"/Version"}
      ],
      visible: true,
      list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
      value1: ['iPhone'],
      userName: '',
      sexList:["未填写","男","女"],
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
    .quit{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: white;
        border: 1px solid #e5e5e5;
        margin: 20px 0;
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