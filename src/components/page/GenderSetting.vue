<template lang="pug">
.gender-setting(v-bind:class="classObject")
    TitleBar(title='性别',leftIcon="flase")
    .option-box
      .text 未设置
      .is-check.ico &#xe609;
    .option-box
      .text 男
      .is-check.ico &#xe609;
    .option-box
      .text 女
      .is-check.ico &#xe609;
</template>

<script>
import TitleBar from '../bar/Title'

export default {
  components: {
    TitleBar,
  },
  data () {
    return {
      classObject:"sdsd"
    }
  },
  methods: {
    checkGender (){

    }
  }
}
</script>

<style lang='less' scoped>
.gender-setting{
  .option-box{
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeedee;
  }
  .is-check{
    color: chartreuse;
  }
}
</style>