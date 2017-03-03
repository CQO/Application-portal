<template>
  <!-- Don't drop "q-app" class -->
  <div class="box" id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style>
html,body { height: 100%; width: 100%;background:#fff;}
.box{height: 100%; width: 100%;}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0}
img{border:0;vertical-align:top}
ol,ul{list-style:none}
caption,th{text-align:left}
a{text-decoration:none;color:#666;-webkit-user-drag: none;}
a:hover{text-decoration:none}
body {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  background-position: center;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  overflow: hidden;
}
</style>
