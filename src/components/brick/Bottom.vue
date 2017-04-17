<template lang="pug">
  .bottomBar
    .item.notice(@click="noticeTabClick",v-bind:class="{ active: index==='0' }")
      .ico &#xe630;
      .name 通知
    .item.app(@click="appTabClick",v-bind:class="{ active: index==='1' }")
      .ico &#xe622;
      .name 我的应用
    .item.contacts(@click="contactsTabClick",v-bind:class="{ active: index==='2' }")
      .ico &#xe664;
      .name 通讯录
    .item.me(@click="meTabClick",v-bind:class="{ active: index==='3' }")
      .ico &#xe60c;
      .name 我
</template>
<script>
export default {
  props: {
    index: String,
  },  
  methods: {
    //通知标签点击事件
    noticeTabClick() {
      this.tabIndex='通知'
      window.location.href="#/Main"
    },
    //我的应用标签点击事件
    appTabClick () {
      this.tabIndex='我的应用'
      window.location.href="#/App"
    },
    //增加应用事件
    addApp () {
      this.tabIndex = '应用商店'
      window.location.href="#/"
      //将标题栏右边按钮隐藏
      this.rightIcon = {isActive:false}
      //将标题栏左边按钮显示
      this.leftIcon = {isActive:true,ico:"&#xe601;"}
    },
    comeBack () {
      this.tabIndex = '我的应用'
      //将标题栏右边按钮隐藏
      this.leftIcon = {isActive:false}
      //将标题栏左边按钮显示
      this.rightIcon = {isActive:true,ico:"&#xe601;"}
      window.location.href="#/"
    },
    contactsTabClick () {
      this.tabIndex='通讯录'
      this.rightIcon = {isActive:false}
      window.location.href="#/Contacts"
    },
    meTabClick () {
      this.tabIndex='我'
      this.rightIcon = {isActive:false}
      window.location.href="#/Me"
    }
  },
}
</script>
<style lang='less' scoped>
/*底部栏目切换栏*/
.bottomBar{
  border-top: 1px solid #dfdde8;
  height:50px;
  background:#f7f7fa;
  width:100%;
  position:fixed;
  z-index:5;
  bottom: 0;
  display: flex;
  z-index: 9999;
  .item{
    width: 25%;
    height: 100%;
    .ico{
      width: 100%;
      text-align: center;
      color: #999;
      height: 30px;
      line-height: 1.6;
      font-size: 1.4rem;
    }
    .name{
      width: 100%;
      text-align: center;
      color: #999;
      font-size: 10px;
      line-height: 20px;
      height: 20px;
    }
  }
  .active{
    .ico, .name{
      color: blueviolet;
    }
  }
}
@media screen and (max-height: 200px){
  .bottomBar{
    display: none
  }
}
</style>