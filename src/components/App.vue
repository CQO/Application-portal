<template lang="pug">
.app-box
  .title-normal
    p.text 我的应用
  search(@result-click="resultClick",@on-change="getResult",:results="results",v-model="value",auto-scroll-to-top)
  swiper(:list="baseList",v-model="index",@on-index-change="onIndexChange")
  .tongxun-title.app-title 通讯类
  .tongxun-box
    .tongxun-app
      img(src="../assets/golf.png")
      p 天宫圆圆
    .tongxun-app
      img(src="../assets/golf.png")
      p 邮件
  .bangong-title.app-title 办公类
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

export default {
  components: {
    Search,
    Swiper
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
      value: 'test',
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

<style lang='less' scoped>

.title-normal{
  height: 40px;
  border-bottom: 1px solid #d3d3d3;
  .text{
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
.vux-search-box{
  background-color: #f8f8f8;
  .weui-search-bar__label{
    background: #dbdbdb;
  }
}
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
.app-title{
    background-color: white;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    margin-top: 5px;
    color: #7e7e7e;
    font-size: 0.8rem;
  }
</style>