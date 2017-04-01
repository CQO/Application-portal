<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange",:auto="true")
  AppTitle.bangong-title(title="办公类")
  Grid
    grid-item(v-for="item in office",:key="item")
      img(slot="icon",:src="appList[item].icon",v-on:click="openStart(appList[item].url, appList[item].special)")
      span(slot="label",v-on:click="openStart(appList[item].url, appList[item].special)") {{appList[item].name}}
  AppTitle.tongxun-title(title="通讯类")
  Grid
    grid-item(v-for="item in communication",:key="item")
      img(slot="icon",:src="appList[item].icon",v-on:click="openStart(appList[item].url, appList[item].special)")
      span(slot="label",v-on:click="openStart(appList[item].url, appList[item].special)") {{appList[item].name}}
  BottomBar(index="1")
</template>

<script>
import { Swiper, Grid, GridItem } from 'vux'
import Search from './panel/Search'
import AppTitle from './bar/AppTitle'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
export default {
  data () {
    return {
      index: 0,
      communication:['tiangongyuanyuan'],
      office:['bangongxitong','youjian', 'xinxifabu'],
      userName:'',
      usbkeyidentification:'',
      appList:{
        tiangongyuanyuan:{id:"10000", name:"天工圆圆", icon:'http://xn--9tr.com/vrv/304/tiangongyuanyuan.png',url:'#', special:"open"},
        xinxifabu:{id:"10001", name:"信息发布", icon:'http://xn--9tr.com/vrv/304/xinxifabu.png',url:'http://info.casic.cs/jeecms2/index/mobile/', special:"url"},
        youjian:{id:"10002", name:"邮件", icon:'http://xn--9tr.com/vrv/304/youjian.png',url:'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+this.usbkeyidentification, special:"url"},
        gongwenguanli:{id:"10003", name:"公文管理", icon:'http://xn--9tr.com/vrv/304/gongwenguanli.png',url:'#', special:"bggl"},
        bangongxitong:{id:"10004", name:"协同办公", icon:'http://xn--9tr.com/vrv/304/bangongxitong.png',url:'http://10.152.36.26:8080/portal/menu.jsp?userName='+this.userName+'&PID='+this.usbkeyidentification+'&webService=&SessionID=', special:"url"}
      },
      showList:[
      {
        url: 'https://translate.google.cn/',
        img: 'http://xn--9tr.com/vrv/304/2.png',
        title: ''
      },
      {
        url: 'http://10.152.36.31/secmail/loginapp.do?type=cid&PID='+this.usbkeyidentification,
        img: 'http://xn--9tr.com/vrv/304/1.png',
        title: ''
      }],
    }
  },
  created(){
    const data={type:5};
    const _this = this;
    localforage.getItem('userName', function (err, value) {
      _this.userName = value;
    });
    localforage.getItem('usbkeyidentification', function (err, value) {
      _this.usbkeyidentification = value;
    });
    // this.post("http://localhost:9999/appRequest",data,function(d){
    //   const Data = JSON.parse(d);
    //   _this.showList = Data;
    // });
  },
  methods: {
    onIndexChange (index) {
      this.index = index
    },
    openApp: function () {
      const app1 = {
        "type":2,
        "sopid":"com.vrv.linkDood",
        "pkgpath":"com.vrv.linkDood-1.0.45.sop",
        "scheme":"linkdood:showlinkdood?id=110108198512314993&pwd=123456",
        "name":"linkdood"
      };
      const data = JSON.stringify(app1);
      const obj = new XMLHttpRequest();
      obj.open("POST", "http://localhost:9999/open", true);
      obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
      obj.onreadystatechange = function () {
        if (obj.readyState === 4 && (obj.status === 200 || obj.status === 304)) {  // 304未修改
          console.log(obj.responseText);
        }
      };
      obj.send(data);
    },
    openStart:function(url,special){
      switch(special){
        case 'open':this.openApp();break;
        case 'url':window.location.href=url;break;
        case 'bggl':console.log('bggl');break;
        case 'xtbg':console.log('xtbg');break;
      }
    },
    post: function (url,data,fn) {
      const postData = JSON.stringify(data);
      const obj = new XMLHttpRequest();
      obj.open("POST", url, true);
      obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
      obj.onreadystatechange = function () {
          
        if (obj.readyState === 4 ) {  // 304未修改
          fn.call(this, obj.responseText);
        }
      };
      obj.send(postData);
    }
  },
  components: {
    Search,
    Swiper,
    AppTitle,
    Grid,
    GridItem,
    TitleBar,
    BottomBar
  }
}
</script>
<style lang='less'>
.app-box{
  .weui-grid{
    width: 75px;
    margin: 20px 10px;
    padding: 0;
  }
  .weui-grids:before{
    border-right:none;
  }
  .weui-grids:after{
    border-left:none;
  }
  .weui-grid:before{
    border-right:none;
  }
  .weui-grid:after{
    border-bottom:none;
  }
}
.weui-grids{
  .weui-grid__icon{
    width: 45px;
    height: 45px;
  }
}
</style>