"use strict";
import * as types from '../mutation-types';

const state = {
  main: 0,
  communication:['tiangongyuanyuan', 'youjian'],
  office:['bangongxitong', 'xinxifabu'],
  appList:{
    tiangongyuanyuan:{id:"10000", name:"天宫圆圆", icon:'http://xn--9tr.com/vrv/304/tiangongyuanyuan.png'},
    xinxifabu:{id:"10001", name:"信息发布", icon:'http://xn--9tr.com/vrv/304/xinxifabu.png'},
    youjian:{id:"10002", name:"邮件", icon:'http://xn--9tr.com/vrv/304/youjian.png'},
    gongwenguanli:{id:"10003", name:"公文管理", icon:'http://xn--9tr.com/vrv/304/gongwenguanli.png'},
    bangongxitong:{id:"10004", name:"办公系统", icon:'http://xn--9tr.com/vrv/304/bangongxitong.png'}
  },
  showList:[{
    url: 'https://translate.google.cn/',
    img: 'http://xn--9tr.com/vrv/304/1.png',
    title: '两会时间'
  }, {
    url: 'https://translate.google.cn/',
    img: 'http://xn--9tr.com/vrv/304/2.png',
    title: '信源豆豆'
  }],
};
const mutations = {
  [types.DECREMENT_MAIN_COUNTER] (state) {
    state.main--;
  },
  [types.INCREMENT_MAIN_COUNTER] (state) {
    state.main++;
  },
  [types.TEST_CONSOLE] (state) {
    console.log(state.main);
  },
};

export default {
  state,
  mutations
};
