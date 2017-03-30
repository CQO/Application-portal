<template lang="pug">
.contacts-box
  TitleBar(title='通讯录')
  Search
  .zuzhi 
    a 中国航天科工集团
    p >

  ul.organization
    li
      a(href="#/Organization")
        img(src="http://xn--9tr.com/vrv/304/Organization.png")
        p.organization-name 研发一组
        p.organization-number.ico &#xe62a; 0
        p.organization-people.ico &#xe60c; 24
    li
      a(href="#/Organization")
        img(src="http://xn--9tr.com/vrv/304/Organization.png")
        p.organization-name 研发二组
        p.organization-number.ico &#xe62a; 2
        p.organization-people.ico &#xe60c; 14
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
  }
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