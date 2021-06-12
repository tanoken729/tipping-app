<template>
  <div id="overlay" v-show="showContent2" @click.self="onlyCloseSendModal">
    <div id="main-content">
        <p>あなたの残高：{{ $store.getters.myWallet }}</p>
        <p>送る金額</p>
        <!-- 投げ銭金額入力フォーム -->
        <input type="text" class="text" v-model="tippingWallet">
        <!-- エラーメッセージ -->
        <p v-if="required" class="error-message">金額を入力してください。</p>
        <p v-if="numeric" class="error-message">数値で入力してください。</p>
        <p v-if="limit" class="error-message">所持金が足りません。</p>
        <div id="button-content">
          <p><input @click="closeSendModal" class="modal-button" type="submit" value="送信" :disabled="activateSubmit"></p>
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data () {
    return {
      showContent2: false,
      tippingWallet: '',
    }
  },
  methods: {
    openSendModal (){
      this.$emit('openSendModal');
    },
    closeSendModal (){
      this.$emit('closeSendModal', this.tippingWallet);
    },
    onlyCloseSendModal (){
      this.$emit('onlyCloseSendModal');
      this.tippingWallet = ''
    },
  },
  computed: {
    users () {
      return this.$store.getters.users
    },
    modalData () {
      return this.$store.getters.modalData
    },
    // バリデーション
    required () {
      return this.tippingWallet == '' // 空の時
    },
    numeric () {
      return this.tippingWallet != '' && !Number(this.tippingWallet) // 空じゃない時（これがないと空のときも表示されてしまう）、かつ数値じゃないとき
    },
    limit () {
      return this.tippingWallet > this.$store.getters.myWallet // 所持金を入力数値が上回った時
    },
    // 送信ボタン有効化
    activateSubmit () {
      // 空の時
      if (this.tippingWallet == '') {
        return true
      // 空じゃない時、かつ数値じゃないとき
      } else if (this.tippingWallet != '' && !Number(this.tippingWallet)) {
        return true
      // 入力された値が0より多いかつ所持金より少ない
      } else if (this.tippingWallet >= 0 && this.tippingWallet > this.$store.getters.myWallet) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
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

/* モーダルないの上下で色違うやつのcssの当て方あってるか聞く */
.modal-button {
  background-color: #ff0000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}
.modal-button:hover {
  background-color: #ff4500;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: none;
  font-size: 20px;
  margin-left: 50%;
}

.text{
  margin-bottom: 20px;
  padding: 5px 10px;
}

.error-message{
    color:red;
    font-weight:bold;
    text-align:center;
}

input[type="submit"][disabled] {
  opacity: .4;
}
</style>
