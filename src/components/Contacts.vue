<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .organization-bar
    template(v-for="(item, key) in tree")
      span.organization-item(v-on:click="clickTree(item, key)") {{item.orgName }}
      span >
  vroll.organization(ref="iscroll",v-if="List",v-show="!searchResult",:options="{click: true,scrollbars: true}")
    li(v-for="item in List.depts",v-on:click="load(item,true)",:key="item.orgID")
      img(src="../assets/Organization.png")
      p.organization-name {{item.orgName}}
      p.organization-number.ico &#xe61b; {{item.subOrgNum}}
      p.organization-people.ico &#xe60c; {{item.subUserNum}}
    Organization(v-for="item in List.entUsers",:key="item.id",:name="item.enName",:text="item.orgName",:enMobile="item.enMobile",:duty="item.duty",:telPhone="item.telPhone")
  .load(v-else)
    img(src="../assets/loading.gif")
  .search-result(v-if="searchResult")
    .search-result-title
      span 共搜索到了{{searchResult.length}}条结果
      .close.ico(@click.stop="searchResult = null") &#xe697;
    Organization(v-for="item in searchResult",:key="item.id",:name="item.enName",:text="item.orgName",:enMobile="item.enMobile",:duty="item.duty",:telPhone="item.telPhone")
  BottomBar(index="2")
</template>

<script>
import Search from './brick/SearchOk'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import Organization from './list/Organization'
import { Order } from './Order.js'
import { timeoutDetection, DATA, log } from "./method.js" 
import localforage from 'localforage'

export default {
  components: {
    TitleBar,
    BottomBar,
    Search,
    Organization
  },
  created () {
    timeoutDetection() //超时检测

    //取数据库数据
    localforage.getItem("appData",(err,appData) => {
      if(DATA.org.unitId == 1)  appData.userData.unitName = "集团公司总部"
      this.load({
        orgName: appData.userData.unitName,
        orgID: DATA.org.unitId,
        subOrgNum: 666,
        subUserNum: 666,
      },true)
    })
  },
  beforeMount(){
    //注册搜索
    Order.$on('searchEnOS',(message) => {
      //定时器
      setTimeout( ()=>{
        this.searchResult = message.entUsers
      },0); 
      
    }) 
    //注册搜索
    Order.$on('SEARCHOK',(message) => {
      if(message){
        const enOS = { enterId: 602, orgId: DATA.org.unitId + "" ,type: 2, name:message }
        DATA.CHANNEL.queryEnOS(JSON.stringify(enOS));
      }
      else{
        this.searchResult = null
      }
    }) 
  },
  activated(){
    const iscroll = this.$refs.iscroll
    iscroll.refresh()
  },
  methods: {
    load:function(Data,addTree){ //拉取层级数据
      this.List = null //显示加载动画
      //预登录信号监听
      
      Order.$once('queryEnOS', (message) => {
        DATA.kkkkkkkkid = Data.orgID
        setTimeout( ()=>{          
          this.List = message //显示层级数据
          if(addTree) {
            DATA.orgTree.push(Data) //层级树增加一层
            this.tree = DATA.orgTree //显示层级树
          }
          if(message.entUsers.length > 0){
            //人员排序
            message.entUsers.sort((a,b) =>{
              return (a.orderNum < b.orderNum) ? -1 : 1
            })
          }
        },0); 
     
      })
      log(Data.kkkkkkkkid)
      //判断组织数是否为空
      if( Data.subOrgNum === 0 ) {
        //服务器说 组织 和 人员数 都为空那就请求组织吧
        if( Data.subUserNum === 0) {
          //请求组织信息
          const enOS = { enterId: 602, orgId: Data.kkkkkkkkid + "" ,type: 4 }
          DATA.CHANNEL.queryEnOS(JSON.stringify(enOS));
          return
        }
        //请求人员信息
        const enOS = { enterId: 602, orgId: Data.kkkkkkkkid + "",type: 3 }
        DATA.CHANNEL.queryEnOS(JSON.stringify(enOS)); 
      }
      else {
        //请求组织信息
        const enOS = { enterId: 602, orgId: Data.kkkkkkkkid + "" ,type: 4 }
        DATA.CHANNEL.queryEnOS(JSON.stringify(enOS));
      }
    },
    clickTree:function(item, key){
      //保存截取的层级树
      DATA.orgTree = DATA.orgTree.slice(0,key + 1)
      //显示层级树
      this.tree = DATA.orgTree
      //刷新所在层级的ID
      DATA.kkkkkkkkid = item.id 
      this.load(item,false)
    },
  },
  data () {
    return {
      List: null,
      tree:"",
      searchResult: null
    }
  },
}
</script>

<style lang='less' scoped>

.organization{
	  touch-action: none;
	  text-size-adjust: none;
    overflow: hidden;
    height: 400px;
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
    img{
      margin: auto;
      position: absolute;
      top: 0; 
      left: 0; 
      bottom: 0; 
      right: 0;
    }
}
.organization-bar{
    height:30px;
    line-height: 30px;
    font-size: 0.8rem;
    overflow-x: scroll;
    .organization-item {
        color: #2c84ff;
        margin: 0 5px;
    }
    p {
        color: #787878
    }
}
.search-result {
  background-color: rgba(248, 248, 248, 1);
  position: absolute;
  top: 45px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .search-result-title{
    height: 30px;
    line-height: 30px;
    background-color: gainsboro;
    color: ivory;
    padding-left: 10px;
    position: relitive;
    .close{
      position: absolute;
      right: 5px;
      font-size: 1.2rem;
      color: cadetblue;
    }
  }
}

</style>