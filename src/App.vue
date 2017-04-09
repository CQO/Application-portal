<template lang="pug">
  .root-box
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
  src: url('./assets/font/iconfont.eot');
  src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/font/iconfont.woff') format('woff'),
  url('./assets/font/iconfont.ttf') format('truetype'),
  url('./assets/font/iconfont.svg#iconfont') format('svg');
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
body{
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
  overflow: hidden;
  margin: 0;
}
.root-box{
  height: 100%;
  width: 100%;
}

a:visited,a:link,a:hover,a:active {color: black;text-decoration: none;}

</style>
