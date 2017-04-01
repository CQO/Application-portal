<template lang="pug">
.details-box
  TitleBar(title='详细资料',leftIcon="flase")
  Pa85
  .phone
    Pan42(v-for="(item,key) in job", :item="key",:text="item")
  .inonBar
    .chat.ico &#xe60a;
    .mess.ico &#xe619;
</template>

<script>
import Pa85 from './panel/Pa85'
import Pan42 from './panel/Pan42'
import TitleBar from './bar/Title'
export default {
  components: {
    Pa85,
    Pan42,
    TitleBar
  },
  data () {
    return {
      job:{
        职位:"产品经理",
        联系方式:"",
        手机号码:"12312532114"
      }
    }
  }
}
</script>

<style lang='less' scoped>
.details,.phone{
  margin: 20px 0;
}
.inonBar{
  width: 80px;
  position: relative;
  bottom: 99px;
  left: 93px;
  color: #a4a9b2;
  font-size: 1.1rem;
  .ico{
    margin-right: 20px;
  }
}
</style>
