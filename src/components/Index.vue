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
        <mt-tab-container-item id='我的应用'>
          <mt-search class="search-box"></mt-search>
          <mt-swipe class="swipe-box" :auto="4000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
          </mt-swipe>
          <div class="tongxun-title app-title">通讯类</div>
          <div class="tongxun-box">
            <div class="tongxun-app">
              <img src="../assets/1.png">
              <p>天宫圆圆</p>
            </div>
            <div class="tongxun-app">
              <img src="../assets/2.png">
              <p>邮件</p>
            </div>
          </div>
          <div class="bangong-title app-title">办公类</div>
          <div class="tongxun-box">
            <div class="tongxun-app">
              <img src="../assets/3.png">
              <p>办公系统</p>
            </div>
            <div class="tongxun-app">
              <img src="../assets/4.png">
              <p>信息发布</p>
            </div>
          </div>
          <div class="bangong-box"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id='通讯录'>
          <mt-search class="search-box"></mt-search>
          <div class="zuzhi"></div>
          <ul class="organization">
            <li>
              <img src="../assets/5.png">
              <p class="organization-name"> 研发一组
              <p class="organization-number"> 0
              <p class="organization-people"> 24
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id='我'>
          <div class='page-part'>
            <mt-cell v-for='n in 12' :title=''我 ' + n' />
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
      <mt-tab-item id='我的应用'>
        <img slot='icon' src='../assets/100x100.png'>
        我的应用
      </mt-tab-item>
      <mt-tab-item id='通讯录'>
        <img slot='icon' src='../assets/100x100.png'>
        通讯录
      </mt-tab-item>
      <mt-tab-item id='我'>
        <img slot='icon' src='../assets/100x100.png'>
        我
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
    background-color: #f4f4f4;
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
    background-color: white;
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
    font-size: 12px;
  }
  .search-box input{
    border: 0;
    box-sizing: border-box;
    height: 100%;
    outline: 0;
  }
  .search-box div{
    z-index: 0;
  }
  .search-box{
    height: 45px;
  }
  .swipe-box{
    height: 200px;
  }
  .app-title{
    background-color: white;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
  }
  .tongxun-box{
    display: flex;
  }
  .tongxun-app{
    height: 63px;
    width: 63px;
    margin:20px 20px 20px 0;
    align-items: center;
  }
  .tongxun-box img{
    width: 45px;
    margin: 0 9px;
  }
  .tongxun-box p{
    height: 15px;
    line-height: 15px;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 3px;
  }
  .zuzhi{
    height:45px;
  }
  .organization img{
    height: 45px;
    width: 45px;
    margin: 10px;
  }
  .organization-name{
    height: 65px;
    line-height: 65px;
    width: calc(100% - 140px);
  }
</style>
