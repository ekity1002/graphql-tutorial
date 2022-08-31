<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

// graphQLクエ利用
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const { result } = useQuery(gql`
  query {
    books {
      name
      genre
    }
  }
`);
console.log('@@@@@@', result)

// mutation で登録するクエリ
// TOOD: 動的に変数カエルにはどうしたら良いのか。
// ref にしないとだめ？？
const {mutate: addBook} = useMutation(gql`
  mutation {
    addBook (name: "afjiwef", genre: "front", authorId: "630b33240468c65629daa3d8") {
      name
      genre
      author {
        id
        name
      }
    }
  }
`)

const handleClick = () => {
  addBook()
}

</script>

<template>
  <div>
    <h1>graphQL Access</h1>
    <ul v-if="result && result.books">
      <li v-for="(book, index) in result.books" :key="index">
        {{ book.name }}/{{ book.genre }}
      </li>
  </ul>
  <button @click="handleClick">Add Book</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
