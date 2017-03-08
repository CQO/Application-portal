<template lang="pug">
.title-normal
    .left
    p.text {{title}}
    a.right(href="#/AppStore")
        svg(v-if="left=='add'",xmlns="http://www.w3.org/2000/svg",width="40",height="40",viewBox="0 0 512 512",class="vux-x-icon,vux-x-icon-ios-plus-empty")
            path(d="M384 265H264v119h-17V265H128v-17h119V128h17v120h120v17z")
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        left: {
            type: String,
        }
    }
}

</script>

<style lang='less' scoped>
.title-normal{
  height: 40px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #d3d3d3;
  display:flex;
  .text{
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: calc(~"100% - 120px");
  }
  .left, .right{
    width: 60px;
    svg{
      margin: 0 10px;
      fill: blue;
    }
  }
}
</style>