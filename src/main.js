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
import { config } from '@/utilities/firebase.config';

firebase.initializeApp(config);

/* eslint-disable no-new */
// Vue.component('open-modal',{
//   template : `
//     <div id="content">
//       <div id="content">
//         <p>これがモーダルウィンドウです。</p>
//         <p><button v-on:click="clickEvent">close</button></p>
//       </div>
//     </div>
//     `,
//   methods :{
//     clickEvent: function(){
//       this.$emit('from-child')
//      }
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
