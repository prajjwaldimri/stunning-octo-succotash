import Vue from 'vue';
import VueRouter from 'vue-router';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import App from './App.vue';
import { routes } from './routes';

Vue.use(VueApollo);

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  apolloProvider,
  router,
  render: h => h(App),
});