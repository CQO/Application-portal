<template lang="pug">
  .app
    router-view
    tabbar
      tabbar-item(link="/")
        span.ico.tab-ico(slot="icon") 
        span(slot="label") 通知
      tabbar-item(show-dot,link="/App")
        span.ico.tab-ico(slot="icon") 
        span(slot="label") 我的应用
      tabbar-item(selected,link="/Contacts")
        span.ico.tab-ico(slot="icon") 
        span(slot="label") 通讯录
      tabbar-item(badge="2",link="/Me")
        span.ico.tab-ico(slot="icon") 
        span(slot="label") 我
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@font-face {
      font-family: 'owo';
      src: url('./font/owo.eot');
      src: url('./font/owo.eot') format('embedded-opentype'),
           url('./font/owo.woff') format('woff'),
           url('./font/owo.ttf') format('truetype'),
           url('./font/owo.svg') format('svg');
      font-weight: normal;
      font-style: normal;
    }
body {
  background-color: #f4f4f4;
}
.ico{
  font-family: "owo";
  font-style: normal;
  font-weight: normal;
  speak: none;
  display: inline-block;
}
.vux-search-box .vux-search-box, .vux-search-box .weui-search-bar{
  background-color: #f8f8f8;
  
}
.vux-search-box   .weui-search-bar__label{
  background: #dbdbdb;
}
.app .vux-header{
  background-color: rgb(248, 248, 248); 
  
}
.app .vux-header .vux-header-title{
  color:black;
}
.tab-ico{
  color: #a4a9b2;
  font-size: 1.3rem;
}
.weui-bar__item_on .tab-ico,.app .weui-tabbar .weui-bar__item_on .weui-tabbar__label{
  color:#1865ff;
}
.app .vux-header .vux-header-right{
    font-size: 2rem;
    line-height: 2rem;
    top: 5px;
    a{
      color:#1865ff
    }
}
</style>
