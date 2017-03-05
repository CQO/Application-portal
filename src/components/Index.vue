<template lang="pug">
  .page-tabbar
    .page-wrap
      .mint-header.is-fixed
        .mint-header-button.is-left
        h1.mint-header-title {{selected}}
        .mint-header-button.is-right
      mt-tab-container.page-tabbar-container(v-model='selected')
        mt-tab-container-item(id='通知')
          ul
            li(v-for='item in notice')
              img.user-img(src='../assets/1.png')
              .message
                p {{item.name}}
                p.text {{item.text}}
              .time {{item.time}}
              .notice(v-if='item.notice') {{item.notice}}
        mt-tab-container-item(id='我的应用')
          mt-search.search-box
          mt-swipe.swipe-box(:auto="4000")
            mt-swipe-item
              img(src="../assets/a.png")
            mt-swipe-item
              img(src="../assets/b.png")
            mt-swipe-item
              img(src="../assets/c.png")
          .tongxun-title.app-title 通讯类
          .tongxun-box
            .tongxun-app
              img(src="../assets/1.png")
              p 天宫圆圆
            .tongxun-app
              img(src="../assets/2.png")
              p 邮件
          .bangong-title.app-title 办公类
          .tongxun-box
            .tongxun-app
              img(src="../assets/3.png")
              p 办公系统
            .tongxun-app
              img(src="../assets/4.png")
              p 信息发布
          .bangong-box
        mt-tab-container-item(id='通讯录')
          mt-search.search-box
          .zuzhi
          ul.organization
            li
              img(src="../assets/5.png")
              p.organization-name 研发一组
              p.organization-number 0
              p.organization-people 24
        mt-tab-container-item(id='我')
          .personal-information-title 个人信息
          mt-cell.personal-information-box(title="罗杰斯",is-link)
            img(slot="icon",src="../assets/user.png",width="45",height="45")
          .personal-information-title 操作
          mt-cell.operating-box(title="设置",is-link)
            img(slot="icon",src="../assets/setting.png",width="25",height="25")
          mt-cell.operating-box(title="帮助",is-link)
            img(slot="icon",src="../assets/help.png",width="25",height="25")
          mt-cell.operating-box(title="当前版本",is-link)
            img(slot="icon",src="../assets/update.png",width="25",height="25")
          .personal-information-title 
          mt-button(size="large") 登录

    mt-tabbar(v-model='selected',fixed)
      mt-tab-item(id='通知')
        img(slot='icon',src='../assets/100x100.png') 
        p 通知
      mt-tab-item(id='我的应用')
        img(slot='icon',src='../assets/100x100.png') 
        p 我的应用
      mt-tab-item(id='通讯录')
        img(slot='icon',src='../assets/100x100.png') 
        p 通讯录
      mt-tab-item(id='我')
        img(slot='icon',src='../assets/100x100.png') 
        p 我
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
    border-bottom: 1px solid #e7eaef;
  }
  .search-box .mint-searchbar{
    background-color: #f8f8f8;
  }
  .search-box .mint-searchbar-inner{
    background-color: #dbdbdb;
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
    margin-top: 5px;
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
  .personal-information-title{
    height: 30px;
    line-height: 30px;
    color: #a8a8a8;
    margin-left: 10px;
  }
  .personal-information-box .mint-cell,.personal-information-box .mint-cell-wrapper{
    height: 65px;
  }
  .operating-box{
    height: 45px;
  }
  .mint-button{
    background-color: white;
    color: #353535;
  }
</style>
