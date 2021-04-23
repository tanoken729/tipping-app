<template>
  <div id="overlay" v-show="showContent2" @click.self="onlyCloseSendModal">
    <div id="main-content">
      <p>あなたの残高：{{ $store.getters.myWallet }}</p>
      <p>送る金額</p>
      <input type="text" class="text" v-model="tippingWallet">
      <div id="button-content">
        <p><button @click="closeSendModal" class="modal-button">送信</button></p>
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
      this.$emit("open2");
    },
    closeSendModal (){
      this.$emit("close2", this.tippingWallet);
      this.tippingWallet = ''
    },
    onlyCloseSendModal (){
      this.$emit("close3");
      this.tippingWallet = ''
    },
  },
  computed: {
    users () {
      return this.$store.getters.users
    },
    modalData () {
      return this.$store.getters.modalData
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
</style>
