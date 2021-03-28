<template>
  <div class="userList">
    <div class="main">
    <h2>{{ name }}さんようこそ！！</h2>
      <h1>ユーザ一覧</h1>
    </div>
    <button>ログイン</button>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'

export default {
  data () {
    return {
      name: firebase.auth().currentUser.displayName,
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
