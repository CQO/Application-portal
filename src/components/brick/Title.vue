<template lang="pug">
  .title-bar
    .titleButton.ico(v-bind:class="{ hidden: !leftIcon }",v-on:click="back") &#xe601;
    p.title {{title}}
    router-link.titleButton.ico(v-if="rightIcon === 'add'",to="\Store") &#xe626;
    .titleButton(v-if="rightIcon === 'save'",v-on:click="save") 保存
</template>

<script>
import { Order } from '../Order.js'
export default {
    props: {
        title: String,
        leftIcon:String,
        rightIcon:String
    },
    methods: {
      back () {
        history.go(-1);
      },
      save () {
        Order.$emit('TITLEBUTTONCLICK', 'save')
      }
  },
}

</script>

<style lang='less' scoped>
/*标题栏样式*/
.title-bar{
  height:45px;
  line-height:45px;
  background:#f8f8f8;
  width:100%;
  text-align:center;
  border-bottom: 1px solid #dfdde8;
  display: flex;
  position: sticky;
  z-index: 99;
  top: 0;
  .title{
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    font-family: -apple-system-font,Helvetica Neue,sans-serif;
    width: calc(~"100% - 90px");
    margin: 0;
  }
  /*标题栏按钮样式*/
  .titleButton{
    height: 45px;
    line-height: 45px;
    width: 45px;
    font-size: 1rem;
    color: #1865ff;
  }
  .ico{
    font-size: 1.4rem;
  }
  .titleButton:active{
    background-color: aqua;
  }
}
</style>