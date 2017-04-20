<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .organization-bar
    template(v-for="(item, key) in tree")
        a(v-on:click="clickTree(item, key)") {{item.name}}
        span >
  ul.organization(v-if="List")
    li(v-for="item in List.orgs",v-on:click="load(item.orgName,item.orgID,item.subOrgNum)")
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
import {timeoutDetection, orgData} from "./method.js" 
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
      orgData.orgTree.push({name:myData[1],id:myData[2]})
      orgData.orgList[myData[2]] = JSON.parse(myData[0])
      _this.List = orgData.orgList[myData[2]]
      myData = null
      _this.tree = orgData.orgTree
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
      const enOS = { enterId: 602, orgId: id,type: 3 }
      if(subOrgNum === 0) {_this.foo.queryEnOS(JSON.stringify(enOS));}
      else _this.foo.getSonOrgs(id)
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
  beforeDestroy(){
    clearInterval(this.interval);
  },
  data () {
    return {
      List:{
        "allowChat": 1,
        "code": 0,
        "contactVisible": 1,
        "orgs": [
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051006","orgID": 1642,"orgName": "北京航天龙华建筑工程有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-北京航天龙华建筑工程有限公司","subOrgNum": 2,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051011","orgID": 885,"orgName": "北京市航云建筑工程有限责任公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-北京市航云建筑工程有限责任公司","subOrgNum": 2,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051007","orgID": 384,"orgName": "贵州航天房地产开发有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-贵州航天房地产开发有限公司","subOrgNum": 1,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051005","orgID": 407,"orgName": "湖南航天建筑工程有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-湖南航天建筑工程有限公司","subOrgNum": 2,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051009","orgID": 424,"orgName": "河南航天建筑工程有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-河南航天建筑工程有限公司","subOrgNum": 2,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051001","orgID": 955,"orgName": "航天建设集团深圳有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-航天建设集团深圳有限公司","subOrgNum": 3,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051010","orgID": 981,"orgName": "湖北三江航天建筑工程有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-湖北三江航天建筑工程有限公司","subOrgNum": 2,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 1,"orderNum": 999,"orgCode": "100110051004","orgID": 236,"orgName": "中航天建设工程有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-中航天建设工程有限公司","subOrgNum": 3,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 1,"orderNum": 999,"orgCode": "100110051013","orgID": 237,"orgName": "陕西航天建筑工程有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-陕西航天建筑工程有限公司","subOrgNum": 3,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051012","orgID": 238,"orgName": "航天建筑设计研究院有限公司勘察设计研究院","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-航天建筑设计研究院有限公司勘察设计研究院","subOrgNum": 2,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051002","orgID": 245,"orgName": "北京航天华阳环境工程有限公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-北京航天华阳环境工程有限公司","subOrgNum": 5,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051003","orgID": 248,"orgName": "华航置业有限责任公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-华航置业有限责任公司","subOrgNum": 2,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 2,"orderNum": 999,"orgCode": "100110051008","orgID": 250,"orgName": "陕西航天房地产开发有限责任公司","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-陕西航天房地产开发有限责任公司","subOrgNum": 3,"subUserNum": 0},
          {"enterpriseID": 602,"leaf": 1,"orderNum": 9999900000,"orgCode": "100110051014","orgID": 2920082167264271,"orgName": "院本部","parentOrgID": 232,"remark": "中国航天科工集团公司-中国航天建设集团有限公司-院本部","subOrgNum": 37,"subUserNum": 0}
        ],
        "orgusers": []
      },
      searchText:"",
      tree:[{name:"中国航天科工集团公司",id:"1"}],
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