import User from './userPages/User.vue';
import Home from './userPages/Home.vue';
import Login from './userPages/Login.vue';

// eslint-disable-next-line import/prefer-default-export
export const routes = [
  { path: '', component: Home },
  { path: '/userPages', component: User },
  { path: '/userPages', component: Login },
];
