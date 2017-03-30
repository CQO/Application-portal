<template lang="pug">
  .root-box
    router-view
</template>

<style lang="less">
/*全局样式*/
@import '~vux/src/styles/reset.less';
@font-face {
  font-family: 'iconfont';  /* project id 252571 */
  src: url('//at.alicdn.com/t/font_ioek6hxn5crqkt9.eot');
  src: url('//at.alicdn.com/t/font_ioek6hxn5crqkt9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_ioek6hxn5crqkt9.woff') format('woff'),
  url('//at.alicdn.com/t/font_ioek6hxn5crqkt9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_ioek6hxn5crqkt9.svg#iconfont') format('svg');
}
.hidden{ visibility: hidden; }
.ico{
  font-family: "iconfont";
  font-style: normal;
  font-weight: normal;
  speak: none;
  display: inline-block;
}
ul{
  list-style:none;
}
</style>

<style lang="less">
body{
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
  overflow: hidden;
}
.root-box{
  height: 100%;
  width: 100%;
}
/*标题栏按钮样式*/
.titleButton{
  height: 45px;
  width: 45px;
  font-size: 1.4rem;
}

/*栏目 通知 激活样式*/
.noticeActive{
  .notice-box{
    width: 100%;
    color: blueviolet;
    display: block;
  }
  .notice{
    .ico, .name{
      color: blueviolet !important;
    }
  }
}
/*栏目 应用 激活样式*/
.appActive{
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
/*栏目 通讯录 激活样式*/
.contactsActive{
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
/*栏目 我 激活样式*/
.meActive{
  .personal-information{
    width: 100%;
    display: block;
    color: blueviolet;
  }
  .me{
    .ico, .name{
      color: blueviolet !important;
    }
  }
}
/*进入应用市场样式*/
.appStoreActive{
  .app-store-box{
    width: 100%;
    display: block;
  }
  /*将底部选项卡占用位置释放*/
  .content{
    bottom: 0px;
  }
}

/*显示面板*/
.content{
  background:#f4f4f4;
  width:100%;
  z-index:10;
  bottom:51px;
  display: flex;
}
/*搜索框样式*/
.vux-search-box{
  .weui-search-bar{
    background-color: #f8f8f8;
  }
  .weui-search-bar:before{
    border-top: 0;
  }
  .weui-search-bar__label{
    background: #dbdbdb;
  }
}
</style>