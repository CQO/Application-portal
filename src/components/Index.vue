<template lang='pug'>
  .box.chat
    .title 聊天
    .chat-list 
      ul
        li(v-for='item in chatList')
          Avater(v-bind:username='item.name')
          .message
            p.name {{item.name}}
            p.text {{item.lastMessage}}
    .tab
      .chat.tab-item
      .contacts.tab-item
      .me.tab-item
</template>

<script>
import Avater from './avater'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      chatList: [
        { name: '邮箱机器人', id: '10005', lastMessage: '欢迎添加邮箱机器人', time: '12:00' },
        { name: 'Maer', id: '10001', lastMessage: '你只要在桌面上点击鼠标右键，选择“新建文件夹”就行了', time: '9:20' },
        { name: '小米', id: '10002', lastMessage: '测试', time: '昨天' },
        { name: '北京服务点', id: '10004', lastMessage: '哦哦', time: '昨天' },
        { name: '邮箱机器人', id: '10005', lastMessage: '欢迎添加邮箱机器人', time: '12:00' },
        { name: 'Maer', id: '10001', lastMessage: '你只要在桌面上点击鼠标右键，选择“新建文件夹”就行了', time: '9:20' },
        { name: '小米', id: '10002', lastMessage: '测试', time: '昨天' },
        { name: '北京服务点', id: '10004', lastMessage: '哦哦', time: '昨天' },
        { name: '邮箱机器人', id: '10005', lastMessage: '欢迎添加邮箱机器人', time: '12:00' },
        { name: 'Maer', id: '10001', lastMessage: '你只要在桌面上点击鼠标右键，选择“新建文件夹”就行了', time: '9:20' },
        { name: '小米', id: '10002', lastMessage: '测试', time: '昨天' },
        { name: '北京服务点', id: '10004', lastMessage: '哦哦', time: '昨天' }
      ]
    }
  },
  components: {
    Avater
  },
  computed: {
  },
  methods: {

  },
  created () {
    Toast('提示信息')
  }
}
</script>

<style lang='less' scoped>
.title{
  height: 50px;
  background-color: beige;
  line-height: 50px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #194ca0;
}
.chat-list {
  top:50px;
  position:absolute;
  width: 100%;
  height: calc(~"100% - 100px");
  li{
    display: flex;
    padding: 5px;
    width: 100%;
    border-bottom: 1px solid #ecedee;
    .message{
      margin-left: 5px;
      width: 100%;
    }
    .name{
      color: #2b2b2b;
      font-weight: bold;
      height: 22px;
      line-height: 22px;
    }
    .text{
      width: 80%;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #828282;
      height: 20px;
    }
  }
  li:active{
    background-color: #ceedff;
  }
  ul{
    overflow-y: auto;
    height: 100%;
    overflow-x: hidden;
  }
}
.tab{
  height: 50px;
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #dfdfdf;
  .tab-item{
    width: 33.3%;
    height: 100%;
  }
}
</style>
