<template lang="pug">
router-link.P42(to="GenderSetting")
  .item {{item}}
  .text {{text}}
  .ico.enter &#xe607;
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
.P42{
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
    color: #b5bac1;
    font-weight: 300;
    text-align: right;
    width: calc(~"100% - 115px");
  }
  .ico{
    width: 30px;
    text-align: center;
    color: #b5bac1;
  }
}
</style>