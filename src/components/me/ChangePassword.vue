<template lang="pug">
.change-password-box
  TitleBar(title='更改密码',leftIcon="flase")
  .title 当前密码
  input(v-model="searchText",class="text-input",type="text",name="fname",placeholder="当前密码")
  .title 新密码
  input(v-model="searchText",class="text-input",type="text",name="fname",placeholder="新密码")
  .title 重复新密码
  input(v-model="searchText",class="text-input",type="text",name="fname",placeholder="重复新密码")
  .button 确定
</template>


<script>
import TitleBar from '../brick/Title'
export default {
  components: {
    TitleBar
  },
  data () {
    return {
      searchText:""
    }
  },
}
</script>

<style lang='less' scoped>
.change-password-box{
    .title{
        height: 30px;
        line-height: 30px;
        background-color: #f4f4f4;
        font-size: 12px;
        color: grey;
        padding: 0 10px;
    }
    input{
        width: 100%;
        height: 50px;
        border: none;
        padding: 0 10px;
        font-size: 1rem;
    }
    .button{
        width: 160px;
        background-color: cadetblue;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        border-radius: 5px;
        color: white;
        margin-top: 50px;
    }
}
</style>