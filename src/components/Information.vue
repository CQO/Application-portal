<template lang="pug">
.details-box
  TitleBar(title='详细资料',leftIcon="flase")
  Pa85
  .phone
    Pan42(v-for="(item,key) in job", :item="key",:text="item",:key="item")
  .inonBar
    .chat.ico &#xe60a;
    .mess.ico(v-on:click="sendMes") &#xe619;
</template>

<script>
import Pa85 from './panel/Pa85'
import Pan42 from './panel/Pan42'
import TitleBar from './bar/Title'
import {post} from "./method.js" 
export default {
  components: {
    Pa85,
    Pan42,
    TitleBar
  },
  methods: {
    sendMes:function(){
      const data={schem:"sms:"+"000000"};
      post("http://localhost:9999/open",data,function(d){
        if(d !=="" && d !==null){
          const Data = JSON.parse(d);
          _this.showList = Data;
        }
        else{
          _this.textAlert = '网络错误'
          _this.showPositionValue = true
        }
      });
    }
  },
  data () {
    return {
      job:{
        职位:"产品经理",
        联系方式:"",
        手机号码:"12312532114"
      }
    }
  }
}
</script>

<style lang='less' scoped>
.details,.phone{
  margin: 20px 0;
}
.inonBar{
  width: 80px;
  position: relative;
  bottom: 99px;
  left: 93px;
  color: #a4a9b2;
  font-size: 1.1rem;
  .ico{
    margin-right: 20px;
  }
}
</style>
