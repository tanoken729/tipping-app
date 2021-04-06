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
          <td><button class="button2" v-on:click="openModal">walletを見る</button></td>
          <td><button class="button2">送る</button></td>
        </tr>
      </table>
      <div id="overlay" v-show="showContent">
        <div id="main-content">
          <p>さんの残高</p>
          <p>数字</p>
          <div id="button-content">
            <p><button v-on:click="closeModal" class="modal-button">close</button></p>
          </div>
        </div>
      </div>
      <!-- <open-modal
        v-show="showContent"
        v-on:from-child="closeModal"
      ></open-modal> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'

export default {
  // el: '#open-modal',
  data () {
    return {
      showContent: false
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
      this.$router.push('/signin')
      })
    },
    openModal: function(){
      this.showContent = true
    },
    closeModal: function(){
      this.showContent = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  outline: 1px solid;
}

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

#overlay{
  /*　要素を重ねた時の順番　*/
  z-index:1;

  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;

}

#main-content{
  z-index:2;
  width:50%;
  padding-top: 40px;
  background:#fff;
}

#button-content{
  background:#dcdcdc;
  margin: 0%;
  padding-top: 3px;
  padding-bottom: 3px;
}

.modal-button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.2rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
.modal-button:hover {
  background-color: #ff4500;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.2rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
</style>
