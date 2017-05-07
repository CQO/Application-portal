<template lang="pug">
  .root-box
    keep-alive
      router-view
</template>


<style lang="less">
p,ul{
  margin: 0;
  padding: 0;
}
/*全局样式*/
@font-face {
  font-family: 'iconfont';  /* project id 252571 */
  src: url('./assets/font/iconfont.woff') format('woff');
}
.hidden{ visibility: hidden; }
.ico{
  font-family: "iconfont";
  font-style: normal;
  font-weight: normal;
  display: inline-block;
}
ul{
  list-style:none;
}
html,body{
  height: 100%;
  width: 100%;
  position: relative;
  -webkit-overflow-scrolling:touch;
}
html{overflow:hidden;}
body{
  background-color: #f4f4f4;
  margin: 0;
}
.root-box{
  height: 100%;
  width: 100%;
}

a:visited,a:link,a:hover,a:active {color: black;text-decoration: none;}

.placeholder{
  height: 50px;
}
.clear{
  clear: both;
}
.app-box,.contacts-box{
  width: 100%;
  height: 100%;
  .title-bar,.bottomBar{
    overflow: hidden;
    position:sticky !important;
  }
  
}
.content-box{
  min-height: calc(~"100% - 100px");
}
</style>

