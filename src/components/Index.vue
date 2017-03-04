<template>
  <div class='page-tabbar'>
    <div class='page-wrap'>
      <header class='mint-header is-fixed'>
        <div class='mint-header-button is-left'></div> 
        <h1 class='mint-header-title'>{{selected}}</h1> 
        <div class='mint-header-button is-right'></div>
      </header>
      <mt-tab-container class='page-tabbar-container' v-model='selected'>
        <mt-tab-container-item id='通知'>
          <ul>
            <li v-for='item in notice'>
              <img class='user-img' src='../assets/1.png'>
              <div class='message'>
                <p>{{item.name}}</p>
                <p class='text'>{{item.text}}</p>
              </div>
              <div class='time'>{{item.time}}</div>
              <div class='notice' v-if='item.notice'>{{item.notice}}</div>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id='订单'>
          <mt-cell v-for='n in 5' :title=''订单 ' + n' />
        </mt-tab-container-item>
        <mt-tab-container-item id='发现'>
          <mt-cell v-for='n in 7' :title=''发现 ' + n' />
        </mt-tab-container-item>
        <mt-tab-container-item id='我的'>
          <div class='page-part'>
            <mt-cell v-for='n in 12' :title=''我的 ' + n' />
          </div>
          <router-link to='/'>
            <mt-button type='danger' size='large'>退出</mt-button>
          </router-link>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model='selected' fixed>
      <mt-tab-item id='通知'>
        <img slot='icon' src='../assets/100x100.png'>
        通知
      </mt-tab-item>
      <mt-tab-item id='订单'>
        <img slot='icon' src='../assets/100x100.png'>
        订单
      </mt-tab-item>
      <mt-tab-item id='发现'>
        <img slot='icon' src='../assets/100x100.png'>
        发现
      </mt-tab-item>
      <mt-tab-item id='我的'>
        <img slot='icon' src='../assets/100x100.png'>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
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

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
  .page-tabbar-container{
    margin-top: 40px;
  }
  .mint-tab-container-item li{
    display: flex;
    height: 65px;
    border-bottom: 1px solid #eaeaea;
    position: relative;
  }
  .user-img{
    width: 45px;
    height: 45px;
    margin: 10px;
  }
  .message{
    margin: 10px;
    width: calc(100% - 125px);
  }
  .text{
    color: #8c8c8c;
    font-size: 0.8rem;
  }
  .time{
    width: 40px;
    margin: 10px 0;
    color: #d3d3d3;
  }
  .mint-header{
    background-color: #f8f8f8;
    color: black;
    font-size: 1rem;
    border-bottom: 1px solid #d3d3d3;
  }
  .mint-header-title{
    font-weight: bold;
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
    font-size: 0.3rem;
  }
</style>
