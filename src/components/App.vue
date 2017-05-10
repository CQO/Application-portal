<template lang="pug">
.app-box
  TitleBar(title='我的应用',:rightIcon="rightIcon")
  .content-box
    .swiper
      swiper(:options="swiperOption")
        swiper-slide(v-for="slide in showList",:key="slide.id")
          a(:href="slide.url")
            img(:src="slide.img")
      .swiper-pagination
    AppPlate
    .placeholder
  BottomBar(index="1")
</template>

<script>
import TitleBar from './brick/Title'
import AppPlate from './app/AppPlate'
import BottomBar from './brick/Bottom'
import { Order } from './Order.js'
import { timeoutDetection, DATA, log } from "./method.js" 
import localforage from 'localforage'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    TitleBar,
    BottomBar,
    swiper,
    swiperSlide,
    AppPlate
  },
  data () {
    return {
      appData: null,
      appList: null,
      showList: null,
      rightIcon: 'loading',
      swiperOption: {
        autoplay: 3500,
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction : false,
        preventClicks : false,
      }
    }
  },
  created(){
    timeoutDetection() //超时处理
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
        setTimeout(() => {
          this.showList = message //显示轮播图
          this.appData.showList = message //保存轮播图数据
          this.rightIcon = 'add'  
        },0);
      })
      //请求轮播数据
      DATA.CHANNEL.slidesshow(JSON.stringify({type:"5"})) 

    })
  }
}
</script>

<style lang='less' scoped>
.swiper,.swiper img{
  height: 200px;
  margin: 2px;
  position: relative;
}
.swiper-pagination{
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>