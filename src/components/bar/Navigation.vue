<template lang="pug">
.app-box
  .title-normal
    p.text {{title}}
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
    },  
}

</script>

<style lang='less' scoped>
.title-normal{
  height: 40px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #d3d3d3;
  .text{
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>