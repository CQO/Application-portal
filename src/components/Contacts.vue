<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .organization-bar
    template(v-for="(item, key) in tree")
        a(v-on:click="clickTree(item, key)") {{item.name}}
        span >
  ul.organization(v-if="List")
    li(v-for="item in List.depts",v-on:click="load(item)",:key="item.orgID")
      img(src="../assets/Organization.png")
      p.organization-name {{item.orgName}}
      p.organization-number.ico &#xe61b; {{item.subOrgNum}}
      p.organization-people.ico &#xe60c; {{item.subUserNum}}
    Organization(v-for="item in List.entUsers",:name="item.enName",:text="item.orgName",:enMobile="item.enMobile",:duty="item.duty")
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
import {timeoutDetection, DATA, CHANNEL} from "./method.js" 
import localforage from 'localforage'
var contactsData = null;
export default {
  components: {
    TitleBar,
    BottomBar,
    Search,
    Organization
  },
  created () {
    timeoutDetection() //超时检测
    //定时器
    this.interval = setInterval( ()=>{
      if(contactsData === null){ return null }
      // CHANNEL.log("------定时器------")
      // CHANNEL.log(contactsData)
      DATA.id = contactsData.id //存储所在层级的ID
      DATA.orgTree.push({name:contactsData.name,id:DATA.id}) //层级树增加一层
      DATA.orgList[DATA.id] = contactsData.data //保存层级数据
      this.List = DATA.orgList[DATA.id] //显示层级数据
      this.tree = DATA.orgTree //显示层级树
      contactsData = null //清空标识变量
    },1000); 
    //判断是否层级树缓存
    if(DATA.orgTree.length > 0) { 
      this.tree = DATA.orgTree //显示层级树
      this.List = DATA.orgList[DATA.id] //显示层级数据
      return
    }
    //取数据库数据
    localforage.getItem("appData",(err,appData) => {
      const data = {
        orgName: appData.userData.unitName,
        orgID: appData.userData.key,
        subOrgNum: 666,
        subUserNum: 666,
      }
      this.load(data)
    })
   
  },
  beforeDestroy(){
    clearInterval(this.interval)
  },
  methods: {
    load:function(Data){ //拉取层级数据
      this.List = null //显示加载动画
      //预登录信号监听
      Order.$on('queryEnOS', function(message) {
        contactsData = {
          data:message,
          name:Data.orgName,
          id:Data.orgID
        }
      })
      //判断组织数是否为空
      if( Data.subOrgNum === 0 ) {
        //服务器说 组织 和 人员数 都为空那就请求组织吧
        if( Data.subUserNum === 0) {
          //请求组织信息
          const enOS = { enterId: 602, orgId: Data.orgID + "" ,type: 4 }
          CHANNEL.queryEnOS(JSON.stringify(enOS));
          return
        }
        //请求人员信息
        const enOS = { enterId: 602, orgId: Data.orgID + "",type: 3 }
        CHANNEL.queryEnOS(JSON.stringify(enOS)); 
      }
      else {
        //请求组织信息
        const enOS = { enterId: 602, orgId: Data.orgID + "" ,type: 4 }
        CHANNEL.queryEnOS(JSON.stringify(enOS));
      }
    },
    clickTree:function(item, key){
      //保存截取的层级树
      DATA.orgTree = DATA.orgTree.slice(0,key + 1)
      //显示组织信息
      this.List = DATA.orgList[item.id]
      //显示层级树
      this.tree = DATA.orgTree
      //刷新所在层级的ID
      DATA.id = item.id 
    }
  },
  beforeDestroy(){
    //清除定时器
    clearInterval(this.interval);
  },
  data () {
    return {
      List: null,
      searchText:"",
      tree:"",
      userData: null,
      interval: null
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
    li:active{
        background-color: aqua;
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
    a:active{
        background-color: aqua;
    }
    p {
        color: #787878
    }
}
.placeholder{
  height: 50px;
}
</style>