<template lang="pug">
.Pan42
  .item {{item}}
  .text {{text}}
</template>
<script>
export default {
  props: {
    item: String,
    text: String,
  }
}
</script>
<style lang='less' scoped>
.Pan42{
  height: 42px;
  line-height: 42px;
  padding: 0 15px;
  background-color: white;
  display: flex;
  font-size: 0.9rem;
  border-bottom: 1px solid #eaeaea;
  .item{
    width: 65px;
  }
  .text{
    width: 65px;
    margin: 0 10px;
  }
}
</style>