<template lang="pug">
.organization-box
    TitleBar(title='通讯录',leftIcon="flase")
    Search
    .zuzhi 
      a(href="#\Contacts") 中国航天科工集团
      p >
      a {{$route.params.name}}
      p >
    ul.organization
      li(v-for="item in List")
        a(:href="'#/Organization/'+item.orgName + '/' + item.orgID")
          img(src="../../assets/Organization.png")
          p.organization-name {{item.orgName}}
          p.organization-number.ico &#xe61b; 0
          p.organization-people.ico &#xe60c; 24
    BottomBar(index="2")
</template>

<script>
import Organization from '../list/Organization';
import TitleBar from '../brick/Title'
import Search from '../brick/Search'
import BottomBar from '../brick/Bottom'
import { timeoutDetection } from "../method.js" 
export default {
  components: {
    Search,
    Organization,
    TitleBar,
    BottomBar
  },
  data () {
    return {
      List:[
        {neme:'吴福龙',text:'[电脑]软件工程师',id:'1000'},
        {neme:'王博',text:'[电脑]软件工程师',id:'1001'},
        {neme:'曾天翼',text:'[电脑]软件工程师',id:'1002'}
      ]
    }
  },
  created () {
    const _this = this
    if( timeoutDetection() ) { return null} //时间处理
    new QWebChannel(navigator.qtWebChannelTransport, function(channel) {
      const foo = channel.objects.content;
      foo.callback.connect(function(receive) {
        _this.List = JSON.parse(receive).orgs
      });
      foo.getSonOrgs(_this.$route.params.id)
    })
  },
}
</script>

<style lang='less' scoped>
.organization-box{
    .zuzhi{
        height:45px;
        display: flex;
        line-height: 45px;  
        font-size: 0.8rem;
        a{
            color: #2c84ff;
            margin: 0 10px;
        }
        p{
            color: #787878
        }
    }
}
.organization{
    height: 381px;
    li{
        height: 61px;
        background-color: white;
        display: flex;
        border-bottom: 1px solid #eaeaea;
    }
    a{
      display: flex;
      width: 100%;
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
</style>