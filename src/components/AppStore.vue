<template lang="pug">
.app-store-box
  TitleBar(title='应用商店',leftIcon="flase")
  Search
  Checker(v-model="select",default-item-class="demo1-item",selected-item-class="item-selected")
    checker-item(value="all") 全部
    checker-item(value="skill") 智造
    checker-item(value="cooperation") 协作
    checker-item(value="picture") 看图
    checker-item(value="sell") 销售
  ul
    AppStore(v-for="item in classification",:neme="item.neme",:detail="item.detail",:exist="item.exist",:key="item.id")
</template>

<script>
import { Search, Checker, CheckerItem, XHeader } from 'vux'
import AppStore from './list/AppStore';
import TitleBar from './bar/Title'
import { mapState } from 'vuex'
export default {
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'status'
  ]),
  components: {
    Search,
    Checker,
    CheckerItem,
    AppStore,
    XHeader,
    TitleBar
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
      appList:[
        { neme:"天工圆圆", detail:"183次下载 | 24.7M", exist:false, img: 'http://xn--9tr.com/vrv/304/tiangongyuanyuan.png', type:"skill", exist:true, id:"1000"},
        { neme:"信息发布", detail:"132次下载 | 12.6M", exist:false, img: 'http://xn--9tr.com/vrv/304/xinxifabu.png', type:"cooperation", exist:false, id:"1001" },
        { neme:"邮件", detail:"您有一封来自行政部的邮件", exist:false, img: 'http://xn--9tr.com/vrv/304/youjian.png', type:"skill", exist:false, id:"1002" },
        { neme:"公文管理", detail:"您有代办公文需要处理", exist:false, img: 'http://xn--9tr.com/vrv/304/gongwenguanli.png', type:"picture", exist:false, id:"1003" },
        { neme:"办公系统", detail:"您有代办公文需要处理", exist:false, img: 'http://xn--9tr.com/vrv/304/bangongxitong.png', type:"skill", exist:false, id:"1004" }
      ],
      results: [],
      value: '',
      select: 'all',
    }
  },
  computed: {
    //筛选应用
    classification: function () {
      const _this = this;
      return this.appList.filter(function (list) {
        //判断筛选条件是否为显示全部
        if(_this.select === "all"){
          return true
        }
        else if(list.type === _this.select){
          return true
        }
      })
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
.app-store-box{
  .vux-checker-box{
    height: 24px;
    line-height: 24px;
    padding: 8px;
    display: flex;
    background-color: #f4f4f4;
    border-bottom: 1px solid #e5e5e5;
    font-weight: 400;
  }
  .vux-checker-item{
    width: 40px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: blue;
    font-size: 0.7rem;
    margin: 0 10px;
  }
  .item-selected{
    background-color: #1865ff;
    border-radius: 20px;
    color: white; 
  }

}
</style>