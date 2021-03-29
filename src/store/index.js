/* eslint-disable */
"use strict"

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: '',
        email: '',
        password: ''
    },
    mutations: {
        AddToState: function (state, payload) {
            state.email = payload.email
            state.password = payload.password
            state.username = payload.username
        }
    },
    actions: {
        signUp: function (context, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                    displayName: payload.username,
                    },)
                .then(() => {
                    context.commit('AddToState', payload)
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
