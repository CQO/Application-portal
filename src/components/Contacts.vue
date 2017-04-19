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
import { QWebChannel } from  "./QTWebChannel"
var myData = null;
export default {
  components: {
    TitleBar,
    BottomBar,
    Search,
    Organization
  },
  created () {
    "use strict";
    const _this = this
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
    const time = setInterval(pre,1000);    
  },
  methods: {
    load:function(name,id,subOrgNum){
      const _this = this
      this.List = null
      _this.foo.callback.connect(function(receive) {
        //if(subOrgNum === 0) document.write(receive)
        myData = [receive,name,id]
      });
      if(subOrgNum === 0) _this.foo.queryEnOS(id)
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
  data () {
    return {
      List:{
        "allowChat": 1,
        "code": 0,
        "contactVisible": 1,
        "orgs": [
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011010","orgID": 10,"orgName": "中国航天科工防御技术研究院","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天科工防御技术研究院","subOrgNum": 24,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011015","orgID": 254,"orgName": "中国航天科工运载技术研究院","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天科工运载技术研究院","subOrgNum": 30,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011016","orgID": 488,"orgName": "航天工业机关服务中心","parentOrgID": 1,"remark": "中国航天科工集团公司-航天工业机关服务中心","subOrgNum": 10,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011005","orgID": 232,"orgName": "中国航天建设集团有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天建设集团有限公司","subOrgNum": 14,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011011","orgID": 992,"orgName": "中国华腾工业有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-中国华腾工业有限公司","subOrgNum": 15,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011001","orgID": 212,"orgName": "中国航天科工动力技术研究院","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天科工动力技术研究院","subOrgNum": 15,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 2,"orderNum": 999,"orgCode": "10011009","orgID": 207,"orgName": "航天晨光股份有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天晨光股份有限公司","subOrgNum": 29,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011020","orgID": 1993,"orgName": "航天工业发展股份有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天工业发展股份有限公司","subOrgNum": 21,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011003","orgID": 1963,"orgName": "航天云网科技发展有限责任公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天云网科技发展有限责任公司","subOrgNum": 19,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011014","orgID": 418,"orgName": "河南航天工业总公司","parentOrgID": 1,"remark": "中国航天科工集团公司-河南航天工业总公司","subOrgNum": 15,"subUserNum": 1},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011017","orgID": 395,"orgName": "湖南航天有限责任公司","parentOrgID": 1,"remark": "中国航天科工集团公司-湖南航天有限责任公司","subOrgNum": 26,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011008","orgID": 363,"orgName": "航天精工股份有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天精工股份有限公司","subOrgNum": 4,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011004","orgID": 2146,"orgName": "深圳航天工业技术研究院有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-深圳航天工业技术研究院有限公司","subOrgNum": 22,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011013","orgID": 607,"orgName": "航天信息股份有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天信息股份有限公司","subOrgNum": 89,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011018","orgID": 606,"orgName": "航天通信控股集团股份有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天通信控股集团股份有限公司","subOrgNum": 18,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 2,"orderNum": 999,"orgCode": "10011012","orgID": 604,"orgName": "航天科工财务有限责任公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天科工财务有限责任公司","subOrgNum": 13,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011019","orgID": 90,"orgName": "中国航天科工飞航技术研究院","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天科工飞航技术研究院","subOrgNum": 34,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011021","orgID": 596,"orgName": "中国航天科工集团公司培训中心","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天科工集团公司培训中心","subOrgNum": 8,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011022","orgID": 584,"orgName": "中国航天汽车有限责任公司","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天汽车有限责任公司","subOrgNum": 20,"subUserNum": 48},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011007","orgID": 317,"orgName": "中国航天科工集团贵州航天技术研究院","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天科工集团贵州航天技术研究院","subOrgNum": 25,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011002","orgID": 792,"orgName": "航天科工资产管理有限公司","parentOrgID": 1,"remark": "中国航天科工集团公司-航天科工资产管理有限公司","subOrgNum": 21,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 999,"orgCode": "10011006","orgID": 10000,"orgName": "中国航天科工信息技术研究院","parentOrgID": 1,"remark": "中国航天科工集团公司-中国航天科工信息技术研究院","subOrgNum": 21,"subUserNum": 0},
          {"enterpriseID": 454,"leaf": 1,"orderNum": 9999900000,"orgCode": "10011023","orgID": 2920082167275313,"orgName": "集团公司总部","parentOrgID": 1,"remark": "中国航天科工集团公司-集团公司总部","subOrgNum": 19,"subUserNum": 0}
        ],
        "orgusers": []
      },
      searchText:"",
      tree:[{name:"中国航天科工集团公司",id:"1"}],
      foo: null
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