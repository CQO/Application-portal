<template lang="pug">
.app-box
  Navigation(title="我的应用")
  search(@result-click="resultClick",@on-change="getResult",:results="results",v-model="value",auto-scroll-to-top)
  swiper(:list="baseList",v-model="index",@on-index-change="onIndexChange")
  AppTitle.tongxun-title(title="通讯类")
  .tongxun-box
    .tongxun-app
      img(src="../assets/golf.png")
      p 天宫圆圆
    .tongxun-app
      img(src="../assets/golf.png")
      p 邮件
  AppTitle.bangong-title(title="办公类")
  .tongxun-box
    .tongxun-app
      img(src="../assets/golf.png")
      p 办公系统
    .tongxun-app
      img(src="../assets/golf.png")
      p 信息发布
</template>

<script>
import { Search,Swiper } from 'vux'
import Navigation from './bar/Navigation';
import AppTitle from './bar/AppTitle';

export default {
  components: {
    Search,
    Swiper,
    Navigation,
    AppTitle
  },
  methods: {
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onIndexChange (index) {
      this.index = index
    }
  },
  data () {
    return {
      results: [],
      value: '',
      baseList:[{
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg',
        title: '一朵花'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/2.jpg',
        title: '一辆车'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/3.jpg',
        title: '一次旅行'
      }],
      index:0,

    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 8; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style>
.vux-search-box .vux-search-box, .vux-search-box .weui-search-bar{
  background-color: #f8f8f8;
  
}
.vux-search-box   .weui-search-bar__label{
  background: #dbdbdb;
}
</style>

<style lang='less' scoped>

.tongxun-box{
  display: flex;
  img{
    width: 45px;
    margin: 0 9px;
  }
  p{
    height: 15px;
    line-height: 15px;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 3px;
  }
  .tongxun-app{
    height: 70px;
    width: 70px;
    margin: 15px;
  }
}
</style>