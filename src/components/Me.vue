<template lang="pug">
.personal-information
  XHeader(:left-options="{showBack: false}") 我
  .title 个人信息
  .information.weui-cell_access
    img(src="../assets/golf.png")
    p.name 罗杰斯
    span.weui-cell__ft
  .title 操作
  panel.set(:list="list" type="3")
  .quit 退出登录
</template>

<script>
import { Panel, XHeader } from 'vux'
export default {
  components: {
    Panel,
    XHeader
  },
  data () {
    return {
      list: 
      [
        { src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff', title: '设置', }, 
        { src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff', title: '帮助', },
        { src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff', title: '当前版本', }
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
        margin-left: 10px;
        font-size: 0.8rem;
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
      }
      .name{
        width: calc(~"100% - 90px");
        line-height: 61px;
        font-size: 0.9rem;
      }
      .weui-cells{
        font-size: 0.9rem;
      }
    }
}

</style>