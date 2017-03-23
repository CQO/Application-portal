<template lang="pug">
.personal-information
  TitleBar(title='我')
  .title 个人信息
  .information
    img(src="../assets/user.png")
    p.name 罗杰斯
    .ico &#xe659;
  .title 操作
  P42(v-for="item in list",:icoCode="item.icon",:text="item.title",:color="item.color")
  .quit 退出登录
  BottomBar(index="3")
</template>

<script>
import { Panel, XHeader } from 'vux'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
import P42 from './panel/P42'
export default {
  components: {
    Panel,
    XHeader,
    TitleBar,
    BottomBar,
    P42
  },
  data () {
    return {
      list: 
      [
        { icon: '&#xe600;', title: '设置', color:'#61c2ff'}, 
        { icon: '&#xe629;', title: '帮助', color:'#ffd217'},
        { icon: '&#xe60e;', title: '当前版本', color:'#1bee47'}
      ]
    }
  }
}
</script>


<style lang='less' scoped>
.personal-information{
    .title{
      height: 30px;
      line-height: 30px;
      color: #a8a8a8;
      padding-left: 10px;
      font-size: 0.8rem;
      background-color: #f4f4f4;
    }
    .set{
        margin:0;
    }
    .quit{
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: white;
        border: 1px solid #e5e5e5;
        margin: 20px 0;
    }
    .weui-cells{
      font-size: 0.9rem;
    }
    .information{
      height: 61px;
      display: flex;
      background-color: white;
      img{
        height: 45px;
        width: 45px;
        margin: 8px;
        border-radius: 5px;
      }
      .name{
        width: calc(~"100% - 90px");
        line-height: 61px;
        font-size: 0.9rem;
      }
      .ico{
        line-height: 60px;
        color: #a4a9b2;
      }
    }
}

</style>