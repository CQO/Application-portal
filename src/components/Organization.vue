<template lang="pug">
.organization-box
    Search(@result-click="resultClick",@on-change="getResult",:results="results",v-model="value",auto-scroll-to-top)
    .zuzhi 
        a 北信源北京
        p >
        a 南京研发中心
        p >
        a 移动终端部
        p >
        a 研发一组
    Organization(v-for="item in organizationList",:neme="item.neme",:text="item.text")
</template>

<script>
import { Search, Checker, CheckerItem, XHeader } from 'vux'
import Organization from './list/Organization';
export default {
  components: {
    Search,
    Checker,
    CheckerItem,
    Organization,
    XHeader
  },
  methods: {
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onIndexChange (index) {
      this.index = index
    }
  },
  data () {
    return {
      organizationList:[
        {neme:'吴福龙',text:'[电脑]软件工程师'},
        {neme:'王博',text:'[电脑]软件工程师'},
        {neme:'曾天翼',text:'[电脑]软件工程师'},
        {neme:'高永胜',text:'[电脑]软件工程师'},
        {neme:'赵建超',text:'[电脑]软件工程师'},
        {neme:'刘洋',text:'[电脑]软件工程师'},
      ],
      results: [],
      value: '',
    }
  },
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
</style>