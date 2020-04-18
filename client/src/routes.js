import User from "./userPages/User.vue";
import Login from "./userPages/Login.vue";
import Home from "./Home.vue";
import FeedPost from "./components/FeedPost.vue";

// eslint-disable-next-line import/prefer-default-export
export const routes = [
  { path: "", component: Home },
  { path: "/userPages", component: User },
  { path: "/login", component: Login },
  { path: "/home", component: FeedPost }
];
