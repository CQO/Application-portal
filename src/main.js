// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

Vue.use(VueRouter);

const routes = [
  { path: '/Main', name: 'Main', component: require('./components/Notice') },
  { path: '/', name: 'Index', component: require('./components/Index') },
  { path: '/Quit', name: 'quitIndex', component: require('./components/Index') },
  { path: '/App', name: 'App', component: require('./components/App') },
  { path: '/Contacts', name: 'Contacts', component: require('./components/Contacts') },
  { path: '/Me', name: 'Me', component: require('./components/Me') },
  { path: '/AppStore', name: 'AppStore', component: require('./components/app/AppStore') },
  { path: '/Organization/:name/:id', name: 'Organization', component: require('./components/contacts/Organization') },
  { path: '/Details', name: 'Details', component: require('./components/me/Details') },
  { path: '/Information/:name', name: 'Information', component: require('./components/contacts/Information') },
  { path: '/Version', name: 'Version', component: require('./components/me/Version') },
  { path: '/Help', name: 'Help', component: require('./components/me/Help') },
  { path: '/GenderSetting', name: 'GenderSetting', component: require('./components/me/GenderSetting') },
  { path: '/TimeOut', name: 'TimeOut', component: require('./components/brick/TimeOut') },
  { path: '/ChangePassword', name: 'ChangePassword', component: require('./components/me/ChangePassword') }
];

const router = new VueRouter({
  routes
});


/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');