<template lang="pug">
.iframe-box
  TitleBar(title='详细资料',leftIcon="flase")
  iframe(:src="iframeURL",frameborder="0")
</template>

<script>
import TitleBar from './brick/Title'
import { Order } from './Order.js'
import { DATA } from "./method.js" 
export default {
  components: {
    TitleBar
  },
  created () {
    this.iframeURL = DATA.iframeURL
  },
  data () {
    return {
      iframeURL: null,
    }
  }
}
</script>
<style lang='less' scoped>
.iframe-box{
  position: absolute;
  top: 45px;
  left: 0;
  height: 525px;
  width: 100%;
  iframe{
    height: 100%;
    width: 100%;
  }
}
    
</style>