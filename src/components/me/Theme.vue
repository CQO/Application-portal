<template lang="pug">
.theme-box
  TitleBar(title='更换主题',leftIcon="true")
  .item 
    .title 顶栏背景色(默认颜色:#f8f8f8)
    .input
      input.colorInput(type="text",v-model="titleBackground")
      colorPicker.colorPicker(v-model="titleBackground")
  .item 
    .title 顶栏文字颜色(默认颜色:#000000)
    .input
      input.colorInput(type="text",v-model="titleText")
      colorPicker.colorPicker(v-model="titleText")
  .item 
    .title 底栏背景色(默认颜色:#f4f4f4)
    .input
      input.colorInput(type="text",v-model="bottomBackground")
      colorPicker.colorPicker(v-model="bottomBackground")
  .button-box
    .save.button(v-on:click = "save") 保存更改
    .recovery.button(v-on:click = "recovery") 还原颜色
  Toast
</template>

<script>
import { Color, Order } from "../Order.js"
import { DATA } from "../method.js"
import colorPicker from './colorPicker/colorPicker'
import TitleBar from '../brick/Title'
import Toast from '../brick/Toast'
export default {
  components: { 
    colorPicker,
    TitleBar,
    Toast
  },
  data () {
    return {
      titleBackground: Color.titleBackground,
      titleText: Color.titleText,
      bottomBackground: Color.bottomBackground,
    }
  },
  methods: {
    save: function(){
      Color.titleBackground = this.titleBackground
      DATA.color.titleBackground = this.titleBackground
      Color.titleText = this.titleText
      DATA.color.titleText = this.titleText
      Color.bottomBackground = this.bottomBackground
      DATA.color.bottomBackground = this.bottomBackground
      Order.$emit('Toast', '更改成功，下次登录生效');
    },
    recovery: function(){
      Color.titleBackground = '#f8f8f8'
      DATA.color.titleBackground = '#f8f8f8'
      Color.titleText = '#000000'
      DATA.color.titleText = '#000000'
      Color.bottomBackground = '#f4f4f4'
      DATA.color.bottomBackground = '#f4f4f4'
      Order.$emit('Toast', '更改成功，下次登录生效');
    }
  }
}
</script>

<style scoped>
.theme-box {
  overflow: hidden;
}
.button-box {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.button {
  height: 40px;
  line-height: 40px;
  width: 80%;
  margin: 10px 10%;
  text-align: center;
  border-radius: 5px;
}
.button:active{
  background-color: blue;
}
.save {
  color: #FFFFFF;
  background-color: #ABCDEF;
}
.recovery {
  background-color: #CCFFCC;
  color: #999999;
}
.item {
  height: 30px;
  line-height: 30px;
  color: #a8a8a8;
  padding: 0 10px;
  margin: 2px 0;
  font-size: 0.8rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
}
.colorInput {
  width: 70px;
  margin: 0 5px;
}
.input {
  display: flex
}
</style>

<style>
.colorPicker .box {
  right: 0;
}
.colorPicker {
  margin: 7px 0;
}
</style>

