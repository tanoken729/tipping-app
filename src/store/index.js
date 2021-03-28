/* eslint-disable */
"use strict"

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
    },
    mutations: {
        signUp: function (state) {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                    displayName: state.username,
                })
                .then(() => {
                    router.push('/')
                })
                })
                .catch(error => {
                    alert(error.message)
                })
        },
    },
});

export default store
