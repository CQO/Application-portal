<template lang="pug">
.app-store-box
  Navigation(title="应用商店")
  Search(@result-click="resultClick",@on-change="getResult",:results="results",v-model="value",auto-scroll-to-top)

</template>

<script>
import { Search } from 'vux'
import Navigation from './bar/Navigation';

export default {
  components: {
    Navigation,
    Search
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
.app-store-box{
}
</style>