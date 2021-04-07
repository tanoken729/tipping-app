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
    getters: {
        username: state => {
           return state.username
        },
        email: state => {
           return state.email
        },
        password: state => {
           return state.password
        },
        myWallet: state => {
           return state.myWallet
        },
    },
    mutations: {
        // 新規登録時ユーザ情報登録
        registerUserData (state, payload) {
            // stateへ格納
            state.email = payload.email
            state.password = payload.password
            state.username = payload.username
            state.myWallet = payload.myWallet
        },
        setUserData (state, doc) {
            state.username = doc.data().username
            state.myWallet = doc.data().myWallet
        },
    },
    actions: {
        // 新規登録
        signUp (context, payload) {
            // firebase Authにユーザ情報登録
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    // firebase Authのユーザ名更新
                    const user = firebase.auth().currentUser
                    user.updateProfile({
                    displayName: payload.username,
                    },)
                .then(() => {
                    // データベースへ登録
                    const db = firebase.firestore();
                    db.collection("userData").doc(user.uid).set({
                        uid: user.uid,
                        email: payload.email,
                        password: payload.password,
                        username: payload.username,
                        myWallet: payload.myWallet,
                    })
                })
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
        signIn (context, payload) {
            // 登録済みのメールアドレスとパスワードでログイン
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                const user = firebase.auth().currentUser
                const docRef = firebase.firestore().collection("userData").doc(user.uid);
                docRef.get()
                .then((doc) => {
                    if (doc.exists) {
                        context.commit('setUserData', doc)
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    alert(error.message)
                });
            })
            .then(() => {
                router.push('/')
            })
            .catch(error => {
                alert(error.message)
            })
        },
        signOut () {
            firebase.auth().signOut().then(() => {
                router.push('/signin')
            })
        },
    },
});

export default store
