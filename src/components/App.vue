<template lang="pug">
.app-box
  TitleBar(title='我的应用',rightIcon="flase")
  swiper(:list="showList",v-model="index",@on-index-change="onIndexChange")
  AppTitle.bangong-title(title="办公类")
  Grid
    grid-item(v-for="item in office",:key="item")
      img(slot="icon",:src="appList[item].icon")
      span(slot="label") {{appList[item].name}}
  AppTitle.tongxun-title(title="通讯类")
  Grid
    grid-item(v-for="item in communication",:key="item")
      img(slot="icon",:src="appList[item].icon",v-on:click="post('open')")
      span(slot="label") {{appList[item].name}}
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
      appList:{
        tiangongyuanyuan:{id:"10000", name:"天工圆圆", icon:'http://xn--9tr.com/vrv/304/tiangongyuanyuan.png'},
        xinxifabu:{id:"10001", name:"信息发布", icon:'http://xn--9tr.com/vrv/304/xinxifabu.png'},
        youjian:{id:"10002", name:"邮件", icon:'http://xn--9tr.com/vrv/304/youjian.png'},
        gongwenguanli:{id:"10003", name:"公文管理", icon:'http://xn--9tr.com/vrv/304/gongwenguanli.png'},
        bangongxitong:{id:"10004", name:"协同办公", icon:'http://xn--9tr.com/vrv/304/bangongxitong.png'}
      },
      showList:[{
        url: 'https://translate.google.cn/',
        img: 'http://xn--9tr.com/vrv/304/1.png',
        title: '两会时间'
      }, {
        url: 'https://translate.google.cn/',
        img: 'http://xn--9tr.com/vrv/304/2.png',
        title: '信源豆豆'
      }],
    }
  },
  methods: {
    onIndexChange (index) {
      this.index = index
    },
    post: function (ob) {
      const app1 = {
        "type":2,"sopid":"com.vrv.linkDood",
        "pkgpath":"com.vrv.linkDood-1.0.45.sop",
        "scheme":"linkdood:showlinkdood?id=14324535&pwd=123456",
        "name":"linkdood"
      };
      const data = JSON.stringify(app1);
      const obj = new XMLHttpRequest();
      obj.open("POST", "http://localhost:9999/"+ob, true);
      obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
      obj.onreadystatechange = function () {
        if (obj.readyState === 4 && (obj.status === 200 || obj.status === 304)) {  // 304未修改
          console.log(obj.responseText);
        }
      };
      obj.send(data);
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
    width: 95px;
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