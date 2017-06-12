<template lang="pug">
.iframe-box
  TitleBar(:title='$route.params.name')
  iframe#iframe(:src="iframeURL",frameborder="0")
  Load(v-if="!ok")
</template>

<script>
import Load from './brick/load'
import TitleBar from './brick/Title'
import { Order } from './Order.js'
import { DATA } from "./method.js" 
export default {
  components: {
    TitleBar,
    Load
  },
  activated () {
    this.ok = false
    this.iframeURL = DATA.iframeURL
    let iframe = document.getElementById("iframe");
    iframe.onload = (e)=> {
      this.ok = true
    }
  },
  data () {
    return {
      iframeURL: '',
      ok: false
    }
  }
}
</script>
<style lang='less' scoped>
.iframe-box{
  position: absolute;
  top: 0;
  left: 0;
  height: 525px;
  width: 100%;
  overflow: hidden;
  iframe{
    height: 100%;
    width: 100%;
  }
}
</style>