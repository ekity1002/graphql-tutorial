import { createApp, h, provide } from 'vue'
import './style.css'
import App from './App.vue'

// Apollo client 設定
import { DefaultApolloClient } from '@vue/apollo-composable';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql/',
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
})

app.mount('#app')
