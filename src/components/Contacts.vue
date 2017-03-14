<template lang="pug">
.contacts-box
  .zuzhi 
    a 北信源北京
    p >
    a 南京研发中心
    p >
    a 移动终端部

  ul.organization
    li
      a(href="#/Organization")
        img(src="../assets/golf.png")
        p.organization-name 研发一组
        p.organization-number.ico &#xe649; 0
        p.organization-people.ico &#xe6ca; 24
    li
      a(href="#/Organization")
        img(src="../assets/golf.png")
        p.organization-name 研发二组
        p.organization-number.ico &#xe649; 2
        p.organization-people.ico &#xe6ca; 14
</template>

<script>
import { Search,XHeader } from 'vux'
export default {
  components: {
    Search,
    XHeader
  },
  methods: {
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
  },
  data () {
    return {
      results: [],
      value: ''
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 8; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
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
    }
    .ico{
        height: 61px;
        line-height: 61px;
        width: 50px;
        color: #a4a9b2;
        text-align: center;
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