<template>
  <div id="overlay" v-show="showContent">
    <div id="main-content">
      <p v-for="(modaldatum, index) in $store.getters.modalData" v-bind:key="`first-${index}`">{{ modaldatum.clickedUser }}さんの残高</p>
      <p v-for="(modaldatum, index) in $store.getters.modalData" v-bind:key="`second-${index}`">{{ modaldatum.clickedUserWallet }}</p>
      <div id="button-content">
        <p><button v-on:click="closeModal" class="modal-button">close</button></p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  // props: {
  //     index: Number
  // },
  data () {
    return {
      showContent: false
    }
  },
  methods: {
    openModal (){
      this.$emit("open", this.showContent);
    },
    closeModal (){
      this.$emit("close", this.showContent);
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

</style>
