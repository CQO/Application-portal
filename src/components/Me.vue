<template lang="pug">
.personal-information
    .title 个人信息
    panel.set(:list="list" type="3")
    .quit 退出
</template>

<script>
import { Panel } from 'vux'
export default {
  components: {
    Panel
  },
  data () {
    return {
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '设置',
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '帮助',
      }]
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
}

</style>