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
    Organization(v-for="item in List.entUsers",:name="item.enName",:text="item.orgName")
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
import {timeoutDetection, DATA} from "./method.js" 
import { QWebChannel } from  "./QTWebChannel"
import localforage from 'localforage'
var myData = null;
export default {
  components: {
    TitleBar,
    BottomBar,
    Search,
    Organization
  },
  created () {
    const _this = this
    localforage.getItem("appData",function(err,appData){
      //超时检测
      if(timeoutDetection()) return null
      _this.userData = appData.userData
      _this.tree = DATA.orgTree
      if( DATA.orgList[DATA.id] ) {
        _this.List = DATA.orgList[DATA.id]
      }
      else{
        _this.load(_this.userData.unitName, appData.userData.key,0)
      }
    })
    new QWebChannel(navigator.qtWebChannelTransport, function(channel) {  
      _this.foo = channel.objects.content;
    });
    Order.$on('Toast', function(message) { this.searchText = message }) //注册搜索
    //超时检测
    if(timeoutDetection()) return null
    function pre(){
      _this.foo.log(myData)
      if(myData === null){
        return null
      }
      DATA.orgTree.push({name:myData[1],id:myData[2]})
      DATA.orgList[myData[2]] = JSON.parse(myData[0])
      DATA.id = myData[2]
      _this.List = DATA.orgList[myData[2]]
      myData = null
      _this.tree = DATA.orgTree
    }
    this.interval = setInterval(pre,1000);    
  },
  methods: {
    load:function(name,id,subOrgNum){
      const _this = this
      this.List = null
      _this.foo.callback.connect(function(receive) {
        //if(subOrgNum === 0) document.write(receive)
        myData = [receive,name,id]
      });
      
      if( subOrgNum === 0 ) {
        const enOS = { enterId: 602, orgId: id + "",type: 4 }
        _this.foo.queryEnOS(JSON.stringify(enOS));
        
      }
      else {
        const enOS = { enterId: 602, orgId: id + "" ,type: 3 }
        _this.foo.queryEnOS( JSON.stringify(enOS) );
      }
    },
    clickTree:function(item, key){
      if(DATA.orgList[item.id] !== undefined){
        DATA.orgTree = DATA.orgTree.slice(0,key + 1)
        this.List = DATA.orgList[item.id]
        this.tree = DATA.orgTree
      }
      else{
        DATA.orgTree = DATA.orgTree.slice(0,key + 1)
        this.tree = DATA.orgTree
        this.load(item.name,item.id)
      }  
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
      foo: null,
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