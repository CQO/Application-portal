<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .organization-bar
    template(v-for="(item, key) in tree")
        a(v-on:click="clickTree(item, key)") {{item.name}}
        span >
  ul.organization(v-if="List")
    li(v-for="item in List.orgs",v-on:click="load(item.orgName,item.orgID)")
      img(src="../assets/Organization.png")
      p.organization-name {{item.orgName}}
      p.organization-number.ico &#xe61b; {{item.subOrgNum}}
      p.organization-people.ico &#xe60c; {{item.subUserNum}}
    Organization(v-for="item in List.orgusers",:name="item.enName",:text="item.orgName")
    .placeholder
  .load(v-else)
    img(src="../assets/loading.gif")
  BottomBar(index="2")
</template>

<script>
import Search from './brick/Search'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import Organization from './list/Organization'
import { Order } from './Order.js'
import {timeoutDetection, orgData} from "./method.js" 
export default {
  components: {
    TitleBar,
    BottomBar,
    Search,
    Organization
  },
  created () {
    Order.$on('Toast', (message) => { this.searchText = message }) //注册搜索
    //超时检测
    if(timeoutDetection()) return null
    this.clickTree({name:"中国航天科工集团",id:"1"},0)
  },
  methods: {
    load:function(name,id){
      const _this = this
      this.List = null
      new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
        const foo = channel.objects.content;
        foo.callback.connect( function(receive) {
          orgData.orgTree.push({name:name,id:id})
          orgData.orgList[id] = JSON.parse(receive)
          _this.List = orgData.orgList[id]
          _this.tree = orgData.orgTree
        });
        foo.getSonOrgs(id)
      })
    },
    clickTree:function(item, key){

      if(orgData.orgList[item.id] !== undefined){
        orgData.orgTree = orgData.orgTree.slice(0,key + 1)
        this.List = orgData.orgList[item.id]
        this.tree = orgData.orgTree
      }
      else{
        orgData.orgTree = orgData.orgTree.slice(0,key + 1)
        this.tree = orgData.orgTree
        this.load(item.name,item.id)
      }  
    }
  },
  data () {
    return {
      List:null,
      searchText:"",
      tree:null
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
.load{
    display: flex;
    justify-content: center;
}
.organization-bar{
    height:45px;
    display: flex;
    line-height: 45px;
    font-size: 0.8rem;
    overflow: hidden;
    a {
        color: #2c84ff;
        margin: 0 10px;
    }
    p {
        color: #787878
    }
}
.placeholder{
  height: 50px;
}
</style>