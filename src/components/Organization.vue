<template lang="pug">
.organization-box
    TitleBar(title='组织架构',leftIcon="flase")
    Search(value="qqweqwe")
    .zuzhi 
        a 北信源北京
        p >
        a 南京研发中心
        p >
        a 移动终端部
        p >
        a 研发一组
    Organization(v-for="item in organizationList",:neme="item.neme",:text="item.text",:key="item.id")
</template>

<script>
import Organization from './list/Organization';
import TitleBar from './bar/Title'
import Search from './panel/Search'
export default {
  components: {
    Search,
    Organization,
    TitleBar
  },
  methods: {
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  },
  data () {
    return {
      organizationList:[
        {neme:'吴福龙',text:'[电脑]软件工程师',id:'1000'},
        {neme:'王博',text:'[电脑]软件工程师',id:'1001'},
        {neme:'曾天翼',text:'[电脑]软件工程师',id:'1002'},
        {neme:'高永胜',text:'[电脑]软件工程师',id:'1003'},
        {neme:'赵建超',text:'[电脑]软件工程师',id:'1004'},
        {neme:'刘洋',text:'[电脑]软件工程师',id:'1005'},
      ],
      results: [],
      value: 'test'
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