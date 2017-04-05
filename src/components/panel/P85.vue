<template lang="pug">
  .panel85
    span.text 头像
    img(src="../../assets/user.png")
    .ico.enter &#xe607;
    
</template>


<style lang='less' scoped>
.panel85{
    display: flex;
    height: 85px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    padding: 0 15px;
    margin: 10px 0;
    .ico{
        width: 30px;
        height: 85px;
        text-align: center;
        line-height: 82px;
        color:#a4a9b2;
        font-size: 1.4rem;
    }
    img{
        width: 65px;
        height: 65px;
        margin: 10px;
    }
    .icon{
        font-size: 1.2rem;
    }
    .text{
        width: calc(~"100% - 115px");
        line-height: 85px;
        font-size: 0.9rem;
    }
}
</style>