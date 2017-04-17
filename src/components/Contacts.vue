<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .zuzhi 
    a 中国航天科工集团
    p >

  ul.organization
    li(v-for="item in List")
      a(:href="'#/Organization/'+item.orgName + '/' + item.orgID")
        img(src="../assets/Organization.png")
        p.organization-name {{item.orgName}}
        p.organization-number.ico &#xe61b; {{item.subOrgNum}}
        p.organization-people.ico &#xe60c; {{item.subUserNum}}
  BottomBar(index="2")
</template>

<script>
import Search from './brick/Search'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import { Order } from './Order.js'
import {Timestamp} from "./method.js" 
export default {
  components: {
    TitleBar,
    BottomBar,
    Search
  },
  created () {
    const _this = this
    Order.$on('Toast', (message) => {
      this.searchText = message
    })
    const nowTime = new Date().getTime()
    if(nowTime - Timestamp.value > 120000){
      window.location.href="#/TimeOut";
      return null
    }
    Timestamp.value = nowTime
    new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
      const foo = channel.objects.content;
      foo.callback.connect(function(receive) {
        _this.List = JSON.parse(receive).orgs
      });
      foo.getSonOrgs("1")
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
      List:null,
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
        overflow: hidden;
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