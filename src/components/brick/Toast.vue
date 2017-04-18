<template>
  <div class="toast-box" v-show="show">
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
import { Order } from '../Order.js'
export default {
  data () {
    return {
      show: false,
      text: "..."
    }
  },
  created () {
    Order.$on('Toast', (message) => {
      this.text = message
      this.show = true
      const _this = this
      function hide(){
        _this.show = false
      }
      setTimeout(hide,3000)
    })
  },
}
</script>

<style>
.toast-box{
    position: absolute;
    bottom: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 999;
}
.toast-box span{
    height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2px 10px;
    font-size: 1rem;
    line-height: 30px;
    border-radius: 5px;
    color: white;
}
</style>