import Vue from 'vue';
import App from './App.vue';
import Home from './userPages/Home.vue';

Vue.component('homepage-status', Home);

new Vue({
  el: '#app',
  render: h => h(App),
});
