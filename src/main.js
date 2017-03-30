// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)

const routes = [
  { path: '/Main', name: 'Main', component: require('./components/Notice') },
  { path: '/', name: 'Index', component: require('./components/Index') },
  { path: '/App', name: 'App', component: require('./components/App') },
  { path: '/Contacts', name: 'Contacts', component: require('./components/Contacts') },
  { path: '/Me', name: 'Me', component: require('./components/Me') },
  { path: '/AppStore', name: 'AppStore', component: require('./components/AppStore') },
  { path: '/Organization', name: 'Organization', component: require('./components/Organization') },
  { path: '/Details', name: 'Details', component: require('./components/Details') },
  { path: '/Information/:name', name: 'Information', component: require('./components/Information') },
  { path: '/Version', name: 'Version', component: require('./components/Version') },
  { path: '/Site', name: 'Site', component: require('./components/Version') },
  { path: '/Help', name: 'Help', component: require('./components/Version') }
];

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')