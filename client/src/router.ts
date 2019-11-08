import Vue from "vue";
import Router from "vue-router";

import HomePage from "./home/Home.vue";
import LoginPage from "./login/LoginPage.vue";
import RegisterPage from "./register/RegisterPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "Home",
      component: HomePage
    },
    {
      path: "/login",
      name: "LoginPage",
      component:LoginPage
    },
    {
      path: "/register",
      name: "RegisterPage",
      component:RegisterPage
    },

    // otherwise redirect to home
    { path: "*", redirect: "/" }
  ]
});
