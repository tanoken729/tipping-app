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
        <tr div v-for="(user, index) in users" :key="index">
          <td>{{ user.username }}</td>
          <td><button class="button2" @click="openShowWalletModal(user.username, user.myWallet)">walletを見る</button></td>
          <td><button class="button2" @click="openSendModal(user.uid)">送る</button></td>
        </tr>
      </table>
      <div>
        <transition>
          <ShowWalletModal
            v-show="showContent"
            @click.self="closeShowWalletModal"
            @openShowWalletModal="openShowWalletModal"
            @closeShowWalletModal="closeShowWalletModal"
          ></ShowWalletModal>
        </transition>
        <transition>
          <SendModal
            v-show="showContent2"
            @openSendModal="openSendModal"
            @closeSendModal="closeSendModal"
            @onlyCloseSendModal="onlyCloseSendModal"
          ></SendModal>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ShowWalletModal from '@/components/ShowWalletModal.vue'
import SendModal from '@/components/SendModal.vue'

export default {
  components: {
    ShowWalletModal,
    SendModal,
  },
  data () {
    return {
      showContent: false,
      showContent2: false,
      clickedUser: '',
      clickedUserWallet: '',
      tippingWallet: '',
      clickedUserUid: '',
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    },
    // 「Walletを見る」ボタン
    openShowWalletModal (clickedUser, clickedUserWallet) {
      // モーダルウィンドウを表示する
      this.showContent = true
      // クリックで選択されたユーザーのデータを取得（users配列からデータを取得）
      this.clickedUser = clickedUser
      this.clickedUserWallet = clickedUserWallet
      // クリックされたユーザー、ユーザーの残高をモーダルウィンドウにセットする関数に渡す
      this.$store.dispatch('modalSet', {
        clickedUser: this.clickedUser,
        clickedUserWallet: this.clickedUserWallet
      })
    },
    closeShowWalletModal () {
      this.showContent = false
    },
    // 「送る」ボタン
    openSendModal (clickedUserUid) {
      this.showContent2 = true
      this.clickedUserUid = clickedUserUid
    },
    closeSendModal (tippingWallet) {
      this.showContent2 = false
      this.tippingWallet = tippingWallet
      this.$store.dispatch('tipping', {
        tippingWallet: this.tippingWallet,
        clickedUserUid: this.clickedUserUid,
      })
    },
    onlyCloseSendModal () {
      this.showContent2 = false
    }
  },
  computed: {
    users () {
      return this.$store.getters.users
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

.v-enter-active, .v-leave-active {
  transition: opacity .5s
}

.v-enter, .v-leave-to {
  opacity: 0
}
</style>
