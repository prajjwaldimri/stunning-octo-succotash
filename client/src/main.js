import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './userPages/Home.vue';

Vue.use(VueRouter);

Vue.component('homepage-status', Home);

new Vue({
  el: '#app',
  render: h => h(App),
});
