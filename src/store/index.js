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
    mutations: {
        // 新規登録時ユーザ情報登録
        registerUserData: function (state, payload) {
            // データベースへ登録
            const db = firebase.firestore();
            db.collection("userData").add({
                email: payload.email,
                password: payload.password,
                username: payload.username,
                myWallet: payload.myWallet,
            })
            // stateへ格納
            state.email = payload.email
            state.password = payload.password
            state.username = payload.username
            state.myWallet = payload.myWallet
        },
        setUserData: function (state) {
            const db = firebase.firestore();
            const docRef = db.collection("userData").doc("RomK8cNVaEW63edXp9d6");
            docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    state.username = doc.data().username
                    state.myWallet = doc.data().myWallet
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                alert(error.message)
            });
        },
    },
    actions: {
        // 新規登録
        signUp: function (context, payload) {
            // firebase Authにユーザ情報登録
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    // firebase Authのユーザ名更新
                    firebase.auth().currentUser.updateProfile({
                    displayName: payload.username,
                    },)
                .then(() => {
                    context.commit('registerUserData', payload)
                })
                .then(() => {
                    router.push('/')
                })
                })
                .catch(error => {
                    alert(error.message)
                })
        },
        // ログイン
        signIn: function (context, payload) {
            // 登録済みのメールアドレスとパスワードでログイン
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                context.commit('setUserData')
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
