<template lang="pug">
  .app(v-bind:class="classObject")
    .titleBar
      .add.titleButton.ico(v-bind:class="{ hidden: !leftIcon.isActive }") &#xe601;
      p.title {{tabIndex}}
      .add.titleButton.ico(v-bind:class="{ hidden: !rightIcon.isActive }") &#xe626;
    .content
      Notice.content-item
      App.content-item
      Contacts.content-item
      Me.content-item
    .bottomBar
      .item.notice(@click="noticeTabClick")
        .ico &#xe615;
        .name 通知
      .item.app(@click="appTabClick")
        .ico &#xe60b;
        .name 我的应用
      .item.contacts(@click="contactsTabClick")
        .ico &#xe619;
        .name 通讯录
      .item.me(@click="meTabClick")
        .ico &#xe66e;
        .name 我
</template>

<script>
import Notice from './components/Notice'
import Contacts from './components/Contacts'
import App from './components/App'
import Me from './components/Me'
import AppStore from './components/AppStore'
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
      rightIcon:{isActive:false,href:""},
      leftIcon:{isActive:false,href:""}
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
  },
  methods: {
    //通知标签点击事件
    noticeTabClick() {
      this.tabIndex='通知'
      this.rightIcon = {isActive:false}
    },
    //我的应用标签点击事件
    appTabClick () {
      this.tabIndex='我的应用'
      this.rightIcon = {isActive:true,ico:"&#xe61a;",href:""}
    },
    contactsTabClick () {
      this.tabIndex='通讯录'
      this.rightIcon = {isActive:false}
    },
    meTabClick () {
      this.tabIndex='我'
      this.rightIcon = {isActive:false}
    }
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@font-face {
  font-family: 'iconfont';  /* project id 252571 */
  src: url('//at.alicdn.com/t/font_i5lb8u5c59nyu8fr.eot');
  src: url('//at.alicdn.com/t/font_i5lb8u5c59nyu8fr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_i5lb8u5c59nyu8fr.woff') format('woff'),
  url('//at.alicdn.com/t/font_i5lb8u5c59nyu8fr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_i5lb8u5c59nyu8fr.svg#iconfont') format('svg');
}
.hidden{
  visibility: hidden;
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
  width: 100%;
  margin: 0 auto;
}
</style>

<style lang="less">
.app{
  height: 100%;
  .content-item{
    overflow: hidden;
  }
}
.titleButton{
  height: 45px;
  width: 45px;
  font-size: 1.4rem;
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
    display: block;
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
    display: block;
  }
  .contacts{
    .ico, .name{
      color: blueviolet !important;
    }
  }
}

.meActive{
  .notice-box, .contacts-box, .app-box{
    
    visibility:hidden;
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
  line-height:45px;
  background:#f8f8f8;
  width:100%;
  position:absolute;
  z-index:5;
  top:0;
  text-align:center;
  border-bottom: 1px solid #dfdde8;
  display: flex;
  .title{
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    font-family: -apple-system-font,Helvetica Neue,sans-serif;
    width: calc(~"100% - 90px");
  }
}
.content{
  background:#f4f4f4;
  width:100%;
  overflow:hidden;
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