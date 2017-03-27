<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="status.showList",v-model="index",@on-index-change="onIndexChange")
  AppTitle.tongxun-title(title="通讯类")
  Grid
    grid-item(v-for="item in status.communication",:key="item")
      img(slot="icon",:src="status.appList[item].icon")
      span(slot="label") {{status.appList[item].name}}
  AppTitle.bangong-title(title="办公类")
  Grid
    grid-item(v-for="item in status.office",:key="item")
      img(slot="icon",:src="status.appList[item].icon")
      span(slot="label") {{status.appList[item].name}}
  BottomBar(index="1")
</template>

<script>
import { Search, Swiper, Grid, GridItem } from 'vux'
import { mapState } from 'vuex'
import AppTitle from './bar/AppTitle'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
export default {
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'status'
  ]),
  methods: {
    onIndexChange (index) {
      this.index = index
    }
  },
  components: {
    Search,
    Swiper,
    AppTitle,
    Grid,
    GridItem,
    TitleBar,
    BottomBar
  }
}
</script>
<style lang='less'>
.app-box{
  .weui-grid{
    width: 95px;
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
.weui-grids{
  .weui-grid__icon{
    width: 45px;
    height: 45px;
  }
}
</style>