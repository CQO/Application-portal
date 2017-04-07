<template lang="pug">
.details-box
  TitleBar(title='个人信息',leftIcon="flase")
  P85
  .details
    Pa42(v-for="(item,key) in inf",:item="key",:text="item",:key="item")
  .phone
    Pa42(item="手机号码",:text="phoneNumber")
</template>

<script>
import P85 from './panel/P85'
import Pa42 from './panel/Pa42'
import TitleBar from './bar/Title'
import localforage from 'localforage'
export default {
  components: {
    P85,
    Pa42,
    TitleBar
  },
  created(){
    const _this = this;
    //获取用户名
    localforage.getItem('userName', function (err, value) {
      if(value){
        _this.inf.name = value;
      }
    });
  },
  data () {
    return {
      inf:{
        name:"未登录",
        "性别":"未填写",
      },
      phoneNumber:""
    }
  }
}
</script>

<style lang='less' scoped>
.details,.phone{
  margin: 20px 0;
}
</style>
