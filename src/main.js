// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDeNuzV_lTclsv8iYhfH-K_sV9cNYOHUs4",
  authDomain: "tipping-app-be890.firebaseapp.com",
  projectId: "tipping-app-be890",
  storageBucket: "tipping-app-be890.appspot.com",
  messagingSenderId: "523721486484",
  appId: "1:523721486484:web:0db73f6f5d192b894f8481",
  measurementId: "G-TF5NZJT4LR"
};

firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
