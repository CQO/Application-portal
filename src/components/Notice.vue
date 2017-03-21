<template lang="pug">
.notice-box
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
import { XHeader } from 'vux'
import localforage from 'localforage'
export default {
  name: 'page-tabbar',
  components: {
    XHeader
  },
  methods: {
    Click (item) {
      const _this = this;
          localforage.getItem('notice', function(err, value) {
            if(err){console.error(`读取notice出现错误${err}`)}
            else if(value === null){
              _this.dbtest = 'notice没有数据！';
              let dateBase=[];
              for(let i=0;i<222;i++){
                dateBase[i]={name: '天宫圆圆'+i, text: '姜一:明天早晨九点开例会', time: '17:43', img: '../assets/1.png', notice: 0};
              }
              localforage.setItem('notice', dateBase, function(err,value){
                if(err){console.error(`设置notice出现错误${err}`)}
              })
              _this.dbtest = '写入数据库220条数据！';
            }
            else{
              _this.dbtest = 'notice包含数据！！';
              _this.notice=value;
            }
          });
    }
  },
  data () {
    return {
      selected: '通知',
      dbtest:"读本地数据",
      message:"测试消息",
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
.notice-list{
  height: 100%;
  overflow-y: auto;
  li{
    display: flex;
    height: 65px;
    border-bottom: 1px solid #eaeaea;
    position: relative;
    background-color: white;
    overflow: hidden;
    width: 100%;
    .user-img{
      width: 45px;
      height: 45px;
      margin: 10px;
      overflow: hidden;
    }
    .message{
      margin: 10px;
      width: calc(~'100% - 130px');
      overflow: hidden;
    }
    .text{
      color: #8c8c8c;
      font-size: 0.8rem;
      overflow: hidden;
    }
    .time{
      width: 40px;
      margin: 10px 0;
      color: #d3d3d3;
      font-size: 0.6rem;
      text-align: center;
      overflow: hidden;
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
      overflow: hidden;
    }
  }
  .button{
    position: absolute;
    right: 10px;
    bottom: 60px;
    background-color: cornflowerblue;
    color: antiquewhite;
    height: 40px;
    width: 200px;
    text-align: center;
    line-height: 40px;
    overflow: hidden;
  }
  .duihua{
    position: absolute;
    right: 10px;
    bottom: 110px;
    background-color: cornflowerblue;
    height: 40px;
    width: 200px;
    display: flex;
    line-height: 40px;
    color: antiquewhite;
    font-size: 14px;
    overflow: hidden;
    input{
      width: 120px;
      overflow: hidden;
    }
    .send{
      width: 80px;
      text-align: center;
      overflow: hidden;
    }
  }
  .wangluo{
      position: absolute;
      right: 10px;
      bottom: 160px;
      background-color: cornflowerblue;
      color: antiquewhite;
      height: 40px;
      width: 200px;
      text-align: center;
      line-height: 40px;
      overflow: hidden;
    }
}
</style>