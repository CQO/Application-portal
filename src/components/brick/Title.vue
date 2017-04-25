<template lang="pug">
  .title-bar
    .add.titleButton.ico(v-bind:class="{ hidden: !leftIcon }",v-on:click="back") &#xe601;
    p.title {{title}}
    router-link.add.titleButton.ico(v-bind:class="{ hidden: !rightIcon }",to="\Store") &#xe626;
</template>

<script>
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
  position: fixed;
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
    width: 45px;
    font-size: 1.4rem;
    color: #1865ff;
  }
  .titleButton:active{
    background-color: aqua;
  }
}
</style>