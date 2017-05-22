<template lang="pug">
.swiper-box
  TitleBar(title='我的应用',:rightIcon="rightIcon")
  swiper.swiper(:options="swipeOptions",v-if="showList")
    swiperSlide(v-for="slide in showList",:key="slide.id")
      .item(v-on:click="clickSwipe(slide)")
        img(:src="slide.img")
        .info {{slide.title}}
  .swiper-pagination
</template>

<script>
import TitleBar from '../brick/Title'
import { Order } from '../Order.js'
import { DATA, log } from "../method.js" 
import localforage from 'localforage'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
  components: {
    TitleBar,
    swiper,
    swiperSlide
  },
  data () {
    return {
      showList: null,
      rightIcon: 'loading',
      swipeOptions: {
        autoplay: 3500,
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction : false,
        preventClicks : false,
      }
    }
  },
  created() {
    //判断是否为debug模式
    if(DATA.debug){
      this.showList = [{
        url:'http://owo.ink/application/',
        img:'http://myweb-10017157.cossh.myqcloud.com/2017/0518/1.png',
        title: '北京下雪了'
      }]
      this.rightIcon = 'add'
      return
    }
    //--------------------------------------------------轮播图处理阶段--------------------------------------------------
    //轮播图信号监听
    Order.$once('slidesshow', (message) => {
      this.rightIcon = 'add'
      setTimeout(() => {
        this.showList = message //显示轮播图
      },0);
    })
    //请求轮播数据
    DATA.CHANNEL.slidesshow(JSON.stringify({type:"5"})) 
  },
  methods: {
    clickSwipe: function(thisSlide){
      // DATA.iframeURL = thisSlide.url
      // window.location.href = `#/Iframe/${thisSlide.title}`;
      const url = thisSlide.url.replace("http","browser")
      const app1 = {
        "scheme":url,
      };
      DATA.CHANNEL.opensopApp(JSON.stringify(app1))
    }
  }
}
</script>

<style lang='less' scoped>
.swiper-box{
  height: 180px;
  width: 100%;
  position: relative;
  overflow: hidden;
  .swiper, .item, img{
    height: 180px;
    width: 100%;
  }
}
.swiper-pagination{
  position: absolute;
  bottom: 5px;
  right: 5px;
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