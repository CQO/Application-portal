<template lang="pug">
.notice-box
  .title-normal
    p.text 通知
  ul.notice-list
    li(v-for='item in notice')
      img.user-img(src='../assets/golf.png')
      .message
        p {{item.name}}
        p.text {{item.text}}
      .time {{item.time}}
      .notice(v-if='item.notice') {{item.notice}}
</template>

<script>
export default {
  name: 'page-tabbar',
  data () {
    return {
      selected: '通知',
      notice: [
        {name: '天宫圆圆', text: '姜一:明天早晨九点开例会', time: '17:43', img: '../assets/1.png', notice: 0},
        {name: '信息发布', text: '人事部:3月工资已发放', time: '12:20', img: '../assets/1.png', notice: 0},
        {name: '邮件', text: '您有来自行政部门的一封邮件', time: '10:49', img: '../assets/1.png', notice: 0},
        {name: '公文管理', text: '您有待办公文需要处理', time: '08:31', img: '../assets/1.png', notice: 3}
      ]
    }
  }
}
</script>

<style lang='less' scoped>
.title-normal{
  height: 40px;
  border-bottom: 1px solid #d3d3d3;
  .text{
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
.notice-list{
  li{
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
    .time{
      width: 40px;
      margin: 10px 0;
      color: #d3d3d3;
      font-size: 0.6rem;
      text-align: center;
    }
    .notice{
      width: 15px;
      height: 15px;
      position: absolute;
      background-color: red;
      top: 2px;
      left: 45px;
      border-radius: 50%;
      color: white;
      line-height: 15px;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>