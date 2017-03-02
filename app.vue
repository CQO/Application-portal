  <template>
    <div id="app">
      <div class="title">
        <text class="titleText">聊天</text>
      </div>
      <list class="list">
        <cell class="cell" v-for="item in items">
          <div class="panel">
            <div class="userImg"></div>
            <div>
              <text class="name">{{item.username}}</text>
              <text class="text">{{item.text}}</text>
            </div>
          </div>
        </cell>
      </list>
    </div>
  </template>
  
  <script>
    export default {
      data () {
        return {
          items: [
            {username: '李雷',text:"Google 的免费翻译服务可提供简体76876876876876876876876中文和另外",time:"17:00"},
            {username: '小红',text:"语言之间的互译功能,可让您即时",time:"11:22"},
            {username: '李雷',text:"Google 的免费翻译服务可提供简体中文和另外",time:"17:00"},
            {username: '小红',text:"语言之间的互译功能,可让您即时",time:"11:22"},
            {username: '李雷',text:"Google 的免费翻译服务可提供简体中文和另外",time:"17:00"},
            {username: '小红',text:"语言之间的互译功能,可让您即时",time:"11:22"},
            {username: '李雷',text:"Google 的免费翻译服务可提供简体中文和另外",time:"17:00"},
            {username: '小红',text:"语言之间的互译功能,可让您即时",time:"11:22"},
            {username: '李雷',text:"Google 的免费翻译服务可提供简体中文和另外",time:"17:00"},
            {username: '小红',text:"语言之间的互译功能,可让您即时",time:"11:22"},
            {username: '李雷',text:"Google 的免费翻译服务可提供简体中文和另外",time:"17:00"},
            {username: '小红',text:"语言之间的互译功能,可让您即时",time:"11:22"}
          ]
        }
      },
      methods: {
      }
    }
  </script>
  
  <style>
  body{
    margin: 0;
    padding: 0;
  }
  .title{
    height: 80px;
    background-color: #006fd4;
  }
  .titleText{
    line-height: 60px;
    height: 80px;
    color: white;
    font-size: 40px;
    text-align: center;
  }
  .panel{
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #ccc;
    margin-left: 10px;
    margin-right: 10px;
  }
  .userImg{
    width: 150px;
    height: 150px;
    background-color: blue;
    border-radius: 75px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .name{
    height: 40px;
    width: 200px;
    line-height: 40px;
    margin-top: 25px;
    font-size: 40px;
  }
  .text{
    color: #ccc;
    width: 490px;
    height: 80px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  </style>
