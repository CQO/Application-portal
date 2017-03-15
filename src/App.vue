<template lang="pug">
  .app(v-bind:class="classObject")
    .titleBar
      p.title {{tabIndex}}
    .content
      Notice.content-item
      App.content-item
      Contacts.content-item
      Me.content-item
    .bottomBar
      .item.notice(@click="tabIndex='通知'")
        .ico &#xe615;
        .name 通知
      .item.app(@click="tabIndex='我的应用'")
        .ico &#xe60b;
        .name 我的应用
      .item.contacts(@click="tabIndex='通讯录'")
        .ico &#xe619;
        .name 通讯录
      .item.me(@click="tabIndex='我'")
        .ico &#xe66e;
        .name 我
</template>

<script>
import Notice from './components/Notice'
import Contacts from './components/Contacts'
import App from './components/App'
import Me from './components/Me'
export default {
  components: {
    Notice,
    Contacts,
    App,
    Me
  },
  data () {
    return {
      tabIndex:"通知",
    }
  },
  computed: {
    classObject: function () {
      return {
        'noticeActive': this.tabIndex==="通知",
        'appActive': this.tabIndex==="我的应用",
        'contactsActive': this.tabIndex==="通讯录",
        'meActive': this.tabIndex==="我",
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@font-face {
  font-family: 'iconfont';  /* project id 252571 */
  src: url('./font/iconfont.eot');
  src: url('./font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./font/iconfont.woff') format('woff'),
  url('./font/iconfont.ttf') format('truetype'),
  url('./font/iconfont.svg#iconfont') format('svg');
}
body {
  background-color: #f4f4f4;
  overflow: hidden;
}
.ico{
  font-family: "iconfont";
  font-style: normal;
  font-weight: normal;
  speak: none;
  display: inline-block;
}
.vux-search-box .vux-search-box, .vux-search-box .weui-search-bar{
  background-color: #f8f8f8;
  
}
.vux-search-box   .weui-search-bar__label{
  background: #dbdbdb;
}
.app .vux-header{
  background-color: rgb(248, 248, 248); 
  
}
.app .vux-header .vux-header-title{
  color:black;
}
.tab-ico{
  color: #a4a9b2;
  font-size: 1.3rem;
}
.weui-bar__item_on .tab-ico,.app .weui-tabbar .weui-bar__item_on .weui-tabbar__label{
  color:#1865ff;
}
.app .vux-header .vux-header-right{
    font-size: 2rem;
    line-height: 2rem;
    top: 5px;
    a{
      color:#1865ff
    }
}
.app .vux-slider{
  width: 400px;
  margin: 0 auto;
}
</style>

<style lang="less">
.app{
  height: 100%;
  .notice-box, .contacts-box, .app-box, .personal-information{
    transition: width 0.08s;
  }
  .content-item{
    overflow: hidden;
  }
}
.noticeActive{
  .notice-box{
    width: 100%;
    color: blueviolet;
    display: block;
  }
  .contacts-box, .app-box, .personal-information{
    width: 0;
  }
  .notice{
    .ico, .name{
      color: blueviolet !important;
    }
  }
}

.appActive{
  .notice-box, .contacts-box, .personal-information {
    width: 0;
  }
  .app-box{
    width: 100%;
    color: blueviolet;
  }
  .app{
    .ico, .name{
      color: blueviolet !important;
    }
  }
}

.contactsActive{
  .notice-box, .app-box, .personal-information{
    width: 0;
  }
  .contacts-box{
    width: 100%;
  }
  .contacts{
    .ico, .name{
      color: blueviolet !important;
    }
  }
}

.meActive{
  .notice-box, .contacts-box, .app-box{
    width: 0;
  }
  .personal-information{
    width: 100%;
    color: blueviolet;
  }
  .me{
    .ico, .name{
      color: blueviolet !important;
    }
  }
}

.titleBar{
  height:45px;
  line-height:145px;
  background:#f8f8f8;
  width:100%;
  position:absolute;
  z-index:5;
  top:0;
  text-align:center;
  border-bottom: 1px solid #dfdde8;
  .title{
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    font-family: -apple-system-font,Helvetica Neue,sans-serif;
  }
}
.content{
  background:#f4f4f4;
  width:100%;
  overflow:auto;
  top:46px;
  position:absolute;
  z-index:10;
  bottom:51px;
  display: flex;
}
.bottomBar{
  border-top: 1px solid #dfdde8;
  height:50px;
  background:#f7f7fa;
  width:100%;
  position:absolute;
  z-index:5;
  bottom:0;
  display: flex;
  .item{
    width: 25%;
    height: 100%;
    .ico{
      width: 100%;
      text-align: center;
      color: #999;
      height: 30px;
      line-height: 1.6;
      font-size: 1.4rem;
    }
    .name{
      width: 100%;
      text-align: center;
      color: #999;
      font-size: 10px;
      line-height: 20px;
      height: 20px;
    }
  }
}
</style>