<template lang="pug">
.setting
    TitleBar(title='设置',leftIcon="flase")
    P42(v-for="item in list",:icoCode="item.icon",:text="item.title",:color="item.color",:url="item.url",:key="item.id")
</template>

<script>
import TitleBar from '../brick/Title'
import P42 from '../panel/P42'

export default {
  components: {
    TitleBar,
    P42
  },
  data () {
    return {
      list: [
        { title: '更改密码', id:"1000",url:"#"}, 
        { title: '消息免打扰', id:"1001",url:"#"},
      ]
    }
  }
}
</script>

<style lang='less' scoped>
.setting{
    .ver{
        text-align: center;
        height: 500px;
        line-height: 500px;
        font-size: 1.4rem;
        color: #ccc;
    }
}
</style>