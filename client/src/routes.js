import User from './userPages/User.vue';
import Home from './userPages/Home.vue';

const routes = [
  { path: '', component: Home },
  { path: '/userPages', component: User },
];
export { routes as default };
