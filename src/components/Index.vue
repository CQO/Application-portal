<template>
<div>
<mt-tabbar>
  <mt-tab-item id="外卖">
    <img slot="icon" src="../assets/quasar-logo.png">
    外卖
  </mt-tab-item>
  <mt-tab-item id="订单">
    <img slot="icon" src="../assets/quasar-logo.png">
    订单
  </mt-tab-item>
  <mt-tab-item id="发现">
    <img slot="icon" src="../assets/quasar-logo.png">
    发现
  </mt-tab-item>
  <mt-tab-item id="我的">
    <img slot="icon" src="../assets/quasar-logo.png">
    我的
  </mt-tab-item>
</mt-tabbar>
</div>

</template>

<script>
import { Tabbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui'
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
  computed: {
  },
  component: {
    Tabbar,
    TabItem,
    TabContainer,
    TabContainerItem
  },
  methods: {

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
