<template lang="pug">
  .panel85
    img(src="../../assets/user.png")
    .inf
        p.name.item {{$route.params.name}}
        p.department.item 科研部
    
</template>


<style lang='less' scoped>
.panel85{
    display: flex;
    height: 85px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    padding: 0 15px;
    margin: 10px 0;
    img{
        width: 60px;
        height: 60px;
        margin: 13px 0;
    }
    .item{
        height: 23px;
        line-height: 23px;
        font-size: 0.8rem;
    }
    .inf{
        margin-left: 20px;
    }
    .name{
        height: 50px;
        line-height: 63px;
        font-size: 1.2rem;
    }
    .department{
        color: #b2b2b2;
    }
}
</style>