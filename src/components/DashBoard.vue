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
        <tr v-for="user in users" :key="user.message">
          <td>{{ user }}</td>
          <td><button class="button2" v-on:click="openModal">walletを見る</button></td>
          <td><button class="button2">送る</button></td>
        </tr>
      </table>
      <div>
        <modal
          v-show="showContent"
          v-on:click="closeModal"
          @open="showContent = true"
          @close="showContent = false"
        ></modal>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import modal from '@/components/modal.vue'
import username from '@/utilities/get-user';

export default {
  components: {
    modal,
  },
  data () {
    return {
      showContent: false,
      users: username
    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
      this.$router.push('/signin')
      })
    },
    openModal (){
      this.showContent = true
    },
    closeModal (){
      this.showContent = false
    },
    // getUser () {
    //   db.collection("userData").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   });
    // }
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
