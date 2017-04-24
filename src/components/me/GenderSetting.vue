<template lang="pug">
.gender-setting
    TitleBar(title='性别',leftIcon="flase")
    .option-box(@click="checkGender(3)")
      .text 未设置
      .is-check.ico(v-show="gender == 3") &#xe609;
    .option-box(@click="checkGender(1)")
      .text 男
      .is-check.ico(v-show="gender == 1") &#xe609;
    .option-box(@click="checkGender(2)")
      .text 女
      .is-check.ico(v-show="gender == 2") &#xe609;
</template>

<script>
import TitleBar from '../brick/Title'
import { QWebChannel } from  "../QTWebChannel"
import localforage from 'localforage'
export default {
  components: {
    TitleBar,
  },
  data () {
    return {
      gender:0,
      appData: null
    }
  },
  methods: {
    checkGender (genderID){
      this.gender = genderID
    }
  },
  beforeDestroy(){
    const _this = this
    new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.updateAccount(JSON.stringify({type:3, gander:_this.gender}))
    });
  },
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