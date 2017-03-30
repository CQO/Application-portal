<template lang="pug">
.version
    TitleBar(title='当前版本',leftIcon="flase")
    .ver 当前版本:1.0.0
</template>

<style lang='less' scoped>
.version{
    .ver{
        text-align: center;
        height: 500px;
        line-height: 500px;
        font-size: 1.4rem;
        color: #ccc;
    }
}
</style>

<script>

import TitleBar from './bar/Title'
export default {
  components: {
    TitleBar
  }
}
</script>