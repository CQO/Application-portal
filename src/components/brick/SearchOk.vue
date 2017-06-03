<template>
  <div class="search-box">
    <div class="text-bar">
      <input v-model="searchText" class="text-input" type="text" name="fname"/>
      <div class="button" v-on:click="search">搜索</div>
    </div>
  </div>
</template>

<script>
import { Order } from '../Order.js'
export default {
  data () {
    return {
      searchText:""
    }
  },
  methods: {
    search () {
      Order.$emit('SEARCHOK', this.searchText)
      this.searchText = ''
    }
  },
}
</script>

<style lang="less" scoped>
.search-box{
    height: 30px;
    border-bottom: 1px solid #dfdde8;
    padding: 5px 0;
    .text-bar{
        height: 30px;
        width: 100%;
        margin: 0 auto;
        border-radius: 5px;
        position: relative;
        display: flex;
    }
    .text-input{
        width: calc(~"100% - 60px");
        height: 100%;
        margin: 0 5px;
        border: none;
        padding-left: 5px;
        background-color: #dbdbdb;
        border-radius: 5px;
        font-size: 0.9rem;
    }
    .button {
        line-height: 30px;
        height: 100%;
        width: 40px;
        text-align: center;
        background-color: #dbdbdb;
        border-radius: 5px;
        color: #757575;
        font-size: 14px;
        border: 1px solid #dbdbdb;
    }
    .button:active{
        background-color: aqua;
    }
}
</style>