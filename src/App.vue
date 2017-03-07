<template>
  <div id="app">
    <router-view></router-view>
    <tabbar>
      <tabbar-item link="/">
        <img slot="icon" src="./assets/icon_nav_button.png">
        <span slot="label">通知</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="./assets/icon_nav_msg.png">
        <span slot="label">我的应用</span>
      </tabbar-item>
      <tabbar-item selected link="/Hellow">
        <img slot="icon" src="./assets/icon_nav_article.png">
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="./assets/icon_nav_cell.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
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

body {
  background-color: #f4f4f4;
}
</style>
