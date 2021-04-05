<template>
  <div class="userList">
    <header>
      <h2 class="header">{{ $store.getters.username }}さんようこそ！！</h2>
      <nav class="pc-nav">
        <h2 class="header">残高：{{ $store.getters.myWallet }}</h2>
        <button class="button header" @click="signOut">ログアウト</button>
      </nav>
    </header>
    <div class="main">
      <h1>ユーザ一覧</h1>
      <table>
        <tr>
          <th>ユーザ名</th>
        </tr>
        <tr>
          <td></td>
          <td><button class="button2">walletを見る</button></td>
          <td><button class="button2">送る</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'

export default {
  data () {
    return {
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
      this.$router.push('/signin')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* * {
  outline: 1px solid;
} */

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #42b983;
}

.button {
  color: #1e90ff;
  background-color: #fff;
  border: 1px solid #1e90ff;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 0.5em;
  font-size: 15px;
}
.button:hover {
  color: #fff;
  background-color: #1e90ff;
  border: 1px solid #fff;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 0.5em;
  font-size: 15px;
}

.button2 {
  color: #fff;
  background-color: #008b8b;
  border: 1px solid #008b8b;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 0.2em;
  font-size: 15px;
}
.button2:hover {
  color: #fff;
  background-color: #008080;
  border: 1px solid #008080;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 0.2em;
  font-size: 15px;
}

.main {
  margin: auto;
}

table {
    margin-left: auto;
    margin-right: auto;
}

header {
  padding: 30px 4% 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

h2 {
   margin: 0; padding: 0;
   font-size: 20px;
}

nav {
  list-style: none;
  margin: 0;
  display: flex;
  margin: 0 0 0 60%;
  font-size: 14px;
}
</style>
