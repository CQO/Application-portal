<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .organization-bar
    template(v-for="(item, key) in tree")
        a(v-on:click="clickTree(item, key)") {{item.name}}
        span >
  ul.organization(v-if="List")
    li(v-for="item in List.depts",v-on:click="load(item.orgName,item.orgID,item.subOrgNum)",:key="item.orgID")
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
    const _this = this
    this.interval = setInterval( ()=>{
      if(contactsData === null){ return null }
      DATA.orgTree.push({name:contactsData[1],id:contactsData[2]})
      DATA.id = contactsData[2]
      DATA.orgList[DATA.id] = JSON.parse(contactsData[0])
      
      _this.List = JSON.parse(contactsData[0])
      _this.tree = DATA.orgTree
      contactsData = null
      
      //clearInterval(time)
    },1000); 
    if(DATA.orgTree.length > 0){this.tree = DATA.orgTree; _this.List = DATA.orgList[DATA.id];return null;}
    timeoutDetection()
    localforage.getItem("appData",function(err,appData){
      const userData = appData.userData
      _this.tree = DATA.orgTree
      if( DATA.orgList[DATA.id] ) {
        _this.List = DATA.orgList[DATA.id]
      }
      else{
        _this.load(userData.unitName, userData.key,1)
      }
    })
   
  },
  beforeDestroy(){
    clearInterval(this.interval)
  },
  methods: {
    load:function(name,id,subOrgNum){
      const _this = this
      this.List = null
      CHANNEL.callback.connect(function(receive) {
        //if(subOrgNum === 0) document.write(receive)
        contactsData = [receive,name,id]
      });
      
      if( subOrgNum === 0 ) {
        const enOS = { enterId: 545, orgId: id + "",type: 3 }
        CHANNEL.queryEnOS(JSON.stringify(enOS));
        
      }
      else {
        const enOS = { enterId: 545, orgId: id + "" ,type: 4 }
        CHANNEL.queryEnOS( JSON.stringify(enOS) );
      }
    },
    clickTree:function(item, key){
      DATA.orgTree = DATA.orgTree.slice(0,key + 1)
      this.List = DATA.orgList[item.id]
      this.tree = DATA.orgTree
      DATA.id = item.id 
    }
  },
  beforeDestroy(){
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