<template lang="pug">
.iframe-box(v-bind:class="{ isLoad: ok }")
  TitleBar(:title='$route.params.name')
  iframe#iframe(:src="iframeURL",frameborder="0")
  .load
</template>

<script>
import TitleBar from './brick/Title'
import { Order } from './Order.js'
import { DATA } from "./method.js" 
export default {
  components: {
    TitleBar,
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
  iframe{
    height: 100%;
    width: 100%;
    visibility:hidden
  }
}
.load{
  display: flex;
  background: url(../assets/loading.svg) no-repeat center;
  justify-content: center;
  margin: auto;
  position: absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0;
}
.isLoad{
  iframe{
    visibility: visible;
  }
  .load{
    display: none;
  }
}
</style>