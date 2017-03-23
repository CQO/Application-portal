<template lang="pug">
  .panel42
    .ico.icon(v-html="icoCode",:style="'color:'+color")
    .text {{text}}
    .ico.enter &#xe659;
</template>

<script>
export default {
  props: {
    icoCode: String,
    text: String,
    color: String
  }
}
</script>

<style lang='less' scoped>
.panel42{
    display: flex;
    height: 42px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    .ico{
        width: 42px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        color:#a4a9b2;
    }
    .icon{
        font-size: 1.2rem;
    }
    .text{
        width: calc(~"100% - 84px");
        line-height: 42px;
        font-size: 0.9rem;
    }
}
</style>