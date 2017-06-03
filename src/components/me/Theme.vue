<template lang="pug">
.theme-box
  TitleBar(title='更换主题',leftIcon="true")
  .item 
    .title 标题背景色(默认颜色:#f8f8f8)
    .input
      input.colorInput(type="text",v-model="titleBackground")
      colorPicker.colorPicker(v-model="titleBackground")
  .item 
    .title 标题文字颜色(默认颜色:#000000)
    .input
      input.colorInput(type="text",v-model="titleText")
      colorPicker.colorPicker(v-model="titleText")
  .item 
    .title 主背景色(默认颜色:#f4f4f4)
    .input
      input.colorInput(type="text",v-model="rootColor")
      colorPicker.colorPicker(v-model="rootColor")
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
      rootColor: DATA.color.rootColor,
    }
  },
  methods: {
    save: function(){
      Color.titleBackground = this.titleBackground
      DATA.color.titleBackground = this.titleBackground
      Color.titleText = this.titleText
      DATA.color.titleText = this.titleText
      DATA.color.rootColor = this.rootColor
      Order.$emit('Toast', '颜色更改成功');
    },
    recovery: function(){
      console.log("sd")
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

