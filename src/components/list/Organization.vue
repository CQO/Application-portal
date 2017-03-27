<template lang="pug">
li.organization-list
  img.user-img(src='http://xn--9tr.com/vrv/304/Organization.png')
  .message
    p {{neme}}
    p.text {{text}}
</template>

<script>
export default {
  name: 'page-tabbar',
  props: {
    neme: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
  }
}
</script>

<style lang='less' scoped>
  .organization-list{
    display: flex;
    height: 65px;
    border-bottom: 1px solid #eaeaea;
    position: relative;
    background-color: white;
    .user-img{
      width: 45px;
      height: 45px;
      margin: 10px;
    }
    .message{
      margin: 10px;
      width: calc(~'100% - 130px');
    }
    .text{
      color: #8c8c8c;
      font-size: 0.8rem;
    }
  }
</style>