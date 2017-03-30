<template lang="pug">
.details-box
  TitleBar(title='详细资料',leftIcon="flase")
  Pa85
  .details
    Pan42(v-for="(item,key) in data",:item="key",:text="item")
  .phone
    Pan42(v-for="(item,key) in job", :item="key",:text="item")
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
      data:{
        地区:"江苏 南京",
        个性签名:"",
      },
      job:{
        职位:"产品经理",
        性别:"",
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
</style>
