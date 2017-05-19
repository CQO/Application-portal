<template lang="pug">
.iframe-box(v-bind:class="{ isLoad: ok }")
  TitleBar(:title='$route.params.name',leftIcon="flase")
  iframe#iframe(:src="iframeURL",frameborder="0")
  .load
    img(src="../assets/loading.gif")
</template>

<script>
import TitleBar from './brick/Title'
import { Order } from './Order.js'
import { DATA } from "./method.js" 
export default {
  components: {
    TitleBar
  },
  activated () {
    this.ok = false
    this.iframeURL = DATA.iframeURL
    let iframe = document.getElementById("iframe");
    iframe.onload = (e)=> {
      this.ok = true
      //document.write("Sdsdsdsd")
    }
  },
  data () {
    return {
      iframeURL: 'http://owo.ink/application/',
      ok: false
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
    visibility:hidden
  }
}
.load{
    display: flex;
    justify-content: center;
    img{
      margin: auto;
      position: absolute;
      top: 0; 
      left: 0; 
      bottom: 0; 
      right: 0;
    }
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