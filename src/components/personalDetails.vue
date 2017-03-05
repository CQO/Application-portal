<template lang="pug">
    .personalDetails
        mt-header(title="个人详情")
            router-link(to="/",slot="left")
                mt-button(icon="back")
        .user-information
            img(src="../assets/user.png")
            .information
                .name 吴福龙
                .id 豆豆号: wahah/vrv
        .item-one
            .area 
                p.item 地区
                p.value 江苏 南京
            .area 
                p.item 个性签名
                p.value  
    
</template>
<style lang='less' scoped>
    .personalDetails{
        background-color: #f4f4f4;
        height: 100%;
        .mint-header{
            background-color: #f8f8f8;
            color: #484848;
        }
        .user-information{
            height: 85px;
            background-color: white;
            margin: 10px 0;
            display: flex;
            img{
                height: 65px;
                width: 65px;
                margin: 10px;
            }
            .information{
                margin: 10px;
            }
            .name{
                height: 2rem;
                line-height: 2rem;
                font-size: 1.4rem;
            }
            .id{
                height: 2rem;
                line-height: 2rem;
                color: #989898;
            }
        }
        .item-one{
            border: 1px solid #eaeaea;
            .area{
                height: 45px;
                background-color: white;
                display: flex;
            }
            p{
                margin: 0 20px;
                line-height: 45px;
            }
            .item{
                width: 70px;
            }
        }
    }
</style>
