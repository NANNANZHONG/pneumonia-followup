import Vue from 'vue';
import App from './App';
import { router } from './router';
import axios from '@/util/axios'
import store from './store'
import '@/style/common.scss'
import FastClick from 'fastclick'

Vue.use(axios)
FastClick.attach(document.body)


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
