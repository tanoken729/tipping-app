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
        password: '',
        myWallet: '',
    },
    // getters: {
    //     setMyWallet: function (state, payload) {
    //         state.myWallet = payload.myWallet
    //     },
    // },
    mutations: {
        registerUserInfo: function (state, payload) {
            state.email = payload.email
            state.password = payload.password
            state.username = payload.username
        },
        getUserInfo: function (state, payload) {
            state.email = payload.email
            state.password = payload.password
            state.username = firebase.auth().currentUser.displayName
        },
        registerMyWallet: function (state, payload) {
            var db = firebase.firestore();
            db.collection("users").add({
                myWallet: payload.myWallet,
            })
            state.myWallet = payload.myWallet
        }
    },
    actions: {
        signUp: function (context, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password, payload.myWallet)
                .then(() => {
                    firebase.auth().currentUser.updateProfile({
                    displayName: payload.username,
                    },)
                .then(() => {
                    context.commit('registerUserInfo', payload)
                })
                .then(() => {
                    router.push('/')
                })
                })
                .catch(error => {
                    alert(error.message)
                })
        },
        signIn: function (context, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                context.commit('getUserInfo', payload)
                context.commit('registerMyWallet', payload)
            })
            .then(() => {
                router.push('/')
            })
            .catch(error => {
                alert(error.message)
            })
        }
    },
});

export default store
