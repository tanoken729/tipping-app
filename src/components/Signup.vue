<template>
  <div class="signup">
    <h1>新規登録画面</h1>
    <table>
      <tr>
        <td>ユーザ名</td>
        <td><input type="text" placeholder="userName" v-model="username"></td>
      </tr>
      <tr>
        <td>メールアドレス</td>
        <td><input type="text" placeholder="E-mail" v-model="email"></td>
      </tr>
      <tr>
        <td>パスワード</td>
        <td><input type="password" placeholder="Password" v-model="password"></td>
      </tr>
    </table>
    <button class="button" @click="signUp">新規登録</button>
      <router-link to="/signin">ログインはこちらから</router-link>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
// const user = firebase.auth().currentUser;

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            firebase.auth().currentUser.updateProfile({
              displayName: this.username,
          })
        .then(
          () => {
            this.$router.push('/')
          })
        })
        .catch(error => {
          alert(error.message)
        })
    },
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
  color: #1e90ff;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}

.button {
  color: #1e90ff;
  background-color: #fff;
  border: 1px solid #1e90ff;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 0.5em;
  font-size: 20px;
}
.button:hover {
  color: #fff;
  background-color: #1e90ff;
  border: 1px solid #fff;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 0.5em;
  font-size: 20px;
}

</style>
