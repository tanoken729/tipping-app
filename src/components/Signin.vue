```
<template>
  <div class="signin">
    <h1>ログイン画面</h1>
    <table>
      <tr>
        <td>メールアドレス</td>
        <td><input type="text" placeholder="E-mail" v-model="email"></td>
      </tr>
      <tr>
        <td>パスワード</td>
        <td><input type="password" placeholder="Password" v-model="password"></td>
      </tr>
    </table>
    <button class="button" @click="signIn">ログイン</button>
      <router-link to="/signup" class="router">新規登録はこちらから</router-link>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password,
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
.signin {
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

.router {
  text-decoration: none;
}
</style>
