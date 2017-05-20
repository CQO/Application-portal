<template lang="pug">
.swiper-box
  swipe.swiper(:options="swipeOptions",v-if="showList")
    swipe-item(v-for="slide in showList",:key="slide.id")
      .item(v-on:click="clickSwipe(slide)")
        img(:src="slide.img")
        .info {{slide.title}}
</template>

<script>
import { Order } from '../Order.js'
import { timeoutDetection, DATA, log } from "../method.js" 
import localforage from 'localforage'

import Vue from 'vue'
import VSwipe from 'vswipe'
Vue.use(VSwipe)

export default {
  data () {
    return {
      appData: null,
      appList: null,
      showList: null,
      rightIcon: 'loading',
      swipeOptions: {
        speed: 300,
        auto: 4000,
      }
    }
  },
  created() {
    //判断是否为debug模式
    if(DATA.debug){
      this.showList = [{
        url:'http://owo.ink/application/',
        img:'http://myweb-10017157.cossh.myqcloud.com/2017/0518/1.png'
      }]
      this.rightIcon = 'add'
      return
    }
    //取数据库
    localforage.getItem("appData",(err,appData) => {
      this.appData = appData; //保存应用数据
      //---------------------------------------------------缓存处理阶段---------------------------------------------------
      if( appData && appData.showList ) { //检测缓存是否存在
        this.showList = appData.showList //显示轮播图
        this.appList = appData.appList
        return
      }
      //--------------------------------------------------轮播图处理阶段--------------------------------------------------
      //轮播图信号监听
      Order.$once('slidesshow', (message) => {
        log(message)
        setTimeout(() => {
          this.showList = message //显示轮播图
          this.appData.showList = message //保存轮播图数据
          this.rightIcon = 'add'  
        },0);
      })
      //请求轮播数据
      DATA.CHANNEL.slidesshow(JSON.stringify({type:"5"})) 
    })
  },
  methods: {
    clickSwipe: function(thisSlide){
      DATA.iframeURL = thisSlide.url
      window.location.href = `#/Iframe/${thisSlide.title}`;
    }
  }
}
</script>

<style lang='less' scoped>
.swiper-box{
  height: 180px;
  width: 100%;
  position: relative;
  .swiper, .item, img{
    height: 180px;
    width: 100%;
  }
}

.info{
  position: absolute;
  bottom: 0;
  height: 25px;
  width: 100%;
  background-image: -webkit-linear-gradient(top,rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.8));
  color: white;
  line-height: 25px;
  padding: 0 5px;
}
</style>