// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import store from './vuex/store';

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: '/', name: 'Main', component: require('./components/Notice') },
  { path: '/App', name: 'App', component: require('./components/App') },
  { path: '/Contacts', name: 'Contacts', component: require('./components/Contacts') },
  { path: '/Me', name: 'Me', component: require('./components/Me') },
  { path: '/AppStore', name: 'AppStore', component: require('./components/AppStore') },
  { path: '/Organization', name: 'Organization', component: require('./components/Organization') }
];

const router = new VueRouter({
  routes
});

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');
