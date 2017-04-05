<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .zuzhi 
    a 中国航天科工集团
    p >

  ul.organization
    li(v-for="item in List")
      a(:href="'#/Organization/'+item")
        img(src="../assets/Organization.png")
        p.organization-name {{item}}
        p.organization-number.ico &#xe62a; 0
        p.organization-people.ico &#xe60c; 24
  BottomBar(index="2")
</template>

<script>
import Search from './panel/Search'
import TitleBar from './bar/Title'
import BottomBar from './bar/Bottom'
export default {
  components: {
    TitleBar,
    BottomBar,
    Search
  },
  data () {
    return {
      List:['办公厅','计划部','科研部','科质部','空间部','财务部','资产部','经合部','国际部','人事部','安保部','审计部','纪监部','党群部','科信部','科技委','监事会']
    }
  },
}
</script>


<style lang='less' scoped>
.organization{
    height: 381px;
    overflow: auto;
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
</style>