<template lang="pug">
.details-box
  TitleBar(title='个人信息',leftIcon="flase")
  P85
  .details
    Pa42(v-for="(item,key) in data",:item="key",:text="item")
  .phone
    Pa42(item="手机号码",:text="phoneNumber")
</template>

<script>
import P85 from './panel/P85'
import Pa42 from './panel/Pa42'
import TitleBar from './bar/Title'
export default {
  components: {
    P85,
    Pa42,
    TitleBar
  },
  data () {
    return {
      data:{
        姓名:"罗杰斯",
        性别:"未填写",
      },
      phoneNumber:"12312532114"
    }
  }
}
</script>

<style lang='less' scoped>
.details,.phone{
  margin: 20px 0;
}
</style>
