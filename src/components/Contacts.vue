<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .zuzhi 
    a 中国航天科工集团
    p >

  ul.organization
    li(v-for="item in listCheck")
      a(:href="'#/Organization/'+item")
        img(src="../assets/Organization.png")
        p.organization-name {{item}}
        p.organization-number.ico &#xe61b; 0
        p.organization-people.ico &#xe60c; 24
  BottomBar(index="2")
</template>

<script>
import Search from './brick/Search'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import { Order } from './Order.js'
export default {
  components: {
    TitleBar,
    BottomBar,
    Search
  },
  created () {
    Order.$on('Toast', (message) => {
      this.searchText = message
    })
  },
  computed: {
    //筛选应用
    listCheck: function () {
      const _this = this
      return this.List.filter(function (text) {
        return text.indexOf(_this.searchText) >= 0
      })
    }
  },
  data () {
    return {
      List:['办公厅','计划部','科研部','科质部'],
      searchText:""
    }
  },
}
</script>


<style lang='less' scoped>
.organization{
    height: 381px;
    li{
        height: 61px;
        background-color: white;
        display: flex;
        border-bottom: 1px solid #eaeaea;
    }
    a{
      display: flex;
      width: 100%;
    }
    img{
        height: 45px;
        width: 45px;
        margin: 8px;
    }
    .organization-name{
        height: 61px;
        line-height: 61px;
        width: calc(~"100% - 160px");
        font-size: 0.9rem;
    }
    .ico{
        height: 61px;
        line-height: 61px;
        width: 40px;
        color: #a4a9b2;
        text-align: center;
        font-size: 0.9rem;
    }
}
.zuzhi{
    height:45px;
    display: flex;
    line-height: 45px;
    font-size: 0.8rem;
    a{
        color: #2c84ff;
        margin: 0 10px;
    }
    p{
        color: #787878
    }
}
</style>