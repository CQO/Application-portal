<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .organization-bar
    template(v-for="(item, key) in tree")
        span.organization-item(v-on:click="clickTree(item, key)") {{item.name}}
        span >
  ul.organization(v-if="List && !searchResult")
    li(v-for="item in List.depts",v-on:click="load(item)",:key="item.orgID")
      img(src="../assets/Organization.png")
      p.organization-name {{item.orgName}}
      p.organization-number.ico &#xe61b; {{item.subOrgNum}}
      p.organization-people.ico &#xe60c; {{item.subUserNum}}
    Organization(v-for="item in List.entUsers",:name="item.enName",:text="item.orgName",:enMobile="item.enMobile",:duty="item.duty",:telPhone="item.telPhone")
    .placeholder
  .load(v-else)
    img(src="../assets/loading.gif")
  .search-result(v-if="searchResult")
    Organization(v-for="item in searchResult",:name="item.enName",:text="item.orgName",:enMobile="item.enMobile",:duty="item.duty",:telPhone="item.telPhone")
    .placeholder
  BottomBar(index="2")
</template>

<script>
import Search from './brick/SearchOk'
import TitleBar from './brick/Title'
import BottomBar from './brick/Bottom'
import Organization from './list/Organization'
import { Order } from './Order.js'
import {timeoutDetection, DATA, CHANNEL} from "./method.js" 
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
    //判断是否层级树缓存
    if(DATA.orgTree.length > 0) { 
      this.tree = DATA.orgTree //显示层级树
      this.List = DATA.orgList[DATA.id] //显示层级数据
      return
    }
    //取数据库数据
    localforage.getItem("appData",(err,appData) => {
      this.load({
        orgName: appData.userData.unitName,
        orgID: appData.userData.key,
        subOrgNum: 666,
        subUserNum: 666,
      })
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
        const enOS = { enterId: 602, orgId: DATA.unitId + "" ,type: 2, name:message }
        CHANNEL.queryEnOS(JSON.stringify(enOS));
      }
      else{
        this.searchResult = null
      }
    }) 
  },
  methods: {
    load:function(Data){ //拉取层级数据
      this.List = null //显示加载动画
      //预登录信号监听
      Order.$once('queryEnOS', (message) => {
        //document.write("*")
        //定时器
        setTimeout( ()=>{
          //clearInterval(this.interval) //清除定时器
          DATA.orgTree.push({name:Data.orgName, id:Data.orgID}) //层级树增加一层
          let thisData = message
          if(thisData.entUsers.length > 0){
            //人员排序
            thisData.entUsers.sort((a,b) =>{
              return (a.orderNum < b.orderNum) ? -1 : 1
            })
          }
          CHANNEL.log(`----------message------------`)
          CHANNEL.log(Data)
          DATA.orgList[Data.orgID] = thisData //保存层级数据
          this.List = DATA.orgList[Data.orgID] //显示层级数据
          this.tree = DATA.orgTree //显示层级树
        },0); 
        
      })
      //判断组织数是否为空
      if( Data.subOrgNum === 0 ) {
        //服务器说 组织 和 人员数 都为空那就请求组织吧
        if( Data.subUserNum === 0) {
          //请求组织信息
          const enOS = { enterId: 602, orgId: Data.orgID + "" ,type: 4 }
          CHANNEL.log(`[通讯录]请求组织信息`)
          CHANNEL.queryEnOS(JSON.stringify(enOS));
          return
        }
        //请求人员信息
        const enOS = { enterId: 602, orgId: Data.orgID + "",type: 3 }
        CHANNEL.log(`[通讯录]请求人员信息`)
        CHANNEL.queryEnOS(JSON.stringify(enOS)); 
      }
      else {
        //请求组织信息
        const enOS = { enterId: 602, orgId: Data.orgID + "" ,type: 4 }
        CHANNEL.log(`[通讯录]请求组织信息`)
        CHANNEL.queryEnOS(JSON.stringify(enOS));
      }
    },
    clickTree:function(item, key){
      //保存截取的层级树
      DATA.orgTree = DATA.orgTree.slice(0,key + 1)
      //显示组织信息
      CHANNEL.log(item.id)
      this.List = DATA.orgList[item.id]
      //显示层级树
      this.tree = DATA.orgTree
      //刷新所在层级的ID
      DATA.id = item.id 
    }
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
  top: 87px;
  bottom: 50px;
  left: 0;
  right: 0;
}
.placeholder{
  height: 50px;
}
</style>