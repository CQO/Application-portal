<template lang="pug">
.app-box
  x-header(:left-options="{showBack: false}") 我的应用
    a(href="#/AppStore",slot="right") +
  search(@result-click="resultClick",@on-change="getResult",:results="results",v-model="value",auto-scroll-to-top)
  swiper(:list="baseList",v-model="index",@on-index-change="onIndexChange")
  AppTitle.tongxun-title(title="通讯类")
  Grid
    grid-item(v-for="item in tongxunList",:key="item")
      img(slot="icon",src="../assets/golf.png")
      span(slot="label") {{item.name}}
  AppTitle.bangong-title(title="办公类")
  Grid
    grid-item(v-for="item in bangongList",:key="item")
      img(slot="icon",src="../assets/golf.png")
      span(slot="label") {{item.name}}
</template>

<script>
import { Search, Swiper, XHeader, Grid, GridItem } from 'vux'
import AppTitle from './bar/AppTitle';
import './img/1.jpg';

export default {
  components: {
    Search,
    Swiper,
    AppTitle,
    XHeader,
    Grid,
    GridItem
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
      tongxunList:[
        {name:"天宫圆圆",src:""},
        {name:"邮件",src:""}
      ],
      bangongList:[
        {name:"办公系统",src:""},
        {name:"信息发布",src:""}
      ],
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

.app-box{
  .weui-grid{
    width:25%;
  }
  .weui-grids:before{
    border-right:none;
  }
  .weui-grids:after{
    border-left:none;
  }
  .weui-grid:before{
    border-right:none;
  }
  .weui-grid:after{
    border-bottom:none;
  }
  
}
</style>