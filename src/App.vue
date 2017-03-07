<template lang="pug">
  .app
    router-view
    tabbar
      tabbar-item(link="/")
        img(slot="icon" src="./assets/icon_nav_button.png")
        span(slot="label") 通知
      tabbar-item(show-dot,link="/App")
        img(slot="icon",src="./assets/icon_nav_msg.png")
        span(slot="label") 我的应用
      tabbar-item(selected,link="/Contacts")
        img(slot="icon",src="./assets/icon_nav_article.png")
        span(slot="label") 通讯录
      tabbar-item(badge="2",link="/Me")
        img(slot="icon",src="./assets/icon_nav_cell.png")
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
      src: url('./font/owo.eot?17615682');
      src: url('./font/owo.eot?17615682#iefix') format('embedded-opentype'),
           url('./font/owo.woff?17615682') format('woff'),
           url('./font/owo.ttf?17615682') format('truetype'),
           url('./font/owo.svg?17615682#owo') format('svg');
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
</style>
