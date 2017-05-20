<template lang="pug">
.app-box
  TitleBar(title='我的应用',:rightIcon="rightIcon")
  .content-box
    SwiperBox
    AppPlate
    .placeholder
  BottomBar(index="1")
</template>

<script>
import TitleBar from './brick/Title'
import AppPlate from './app/AppPlate'
import SwiperBox from './app/SwiperBox'
import BottomBar from './brick/Bottom'
import { Order } from './Order.js'
import { timeoutDetection, DATA, log } from "./method.js" 
import localforage from 'localforage'

import Vue from 'vue'
import VSwipe from 'vswipe'
Vue.use(VSwipe)

export default {
  components: {
    TitleBar,
    BottomBar,
    AppPlate,
    SwiperBox
  }
}
</script>

<style lang='less' scoped>
.app-box{
  width: 100%;
  height: calc(~"100% - 95px");
  overflow: hidden;
}
</style>