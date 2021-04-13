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
        users: [],
        modalData: [],
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
        users: state => {
           return state.users
        },
        modalData: state => {
           return state.modalData
        },
    },
    mutations: {
        // 新規登録時ユーザ情報登録
        registerUserData (state, payload) {
            state.email = payload.email
            state.password = payload.password
            state.username = payload.username
            state.myWallet = payload.myWallet
        },
        // ログイン時ユーザ情報をセット
        setUserData (state, doc) {
            state.username = doc.data().username
            state.myWallet = doc.data().myWallet
        },
        // ログイン時登録ユーザ名をセット
        setUsersData (state, users) {
            state.users = users
        },
        // ログイン時モーダル内のデータをセット
        setModalData (state, modalData) {
            state.modalData = modalData
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
                // ログインしているユーザーの名前を取得
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
            // ログインユーザー以外の登録ユーザを配列で取得
            .then(() => {
                const users = []
                const user = firebase.auth().currentUser
                const db = firebase.firestore();
                db.collection("userData")
                    .where(firebase.firestore.FieldPath.documentId(), "!=", user.uid)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const user = {
                                username: doc.data().username,
                                myWallet: doc.data().myWallet
                            }
                            users.push(user)
                            context.commit('setUsersData', users)
                        });
                    });
            })
            .then(() => {
                router.push('/')
            })
            .catch(error => {
                alert(error.message)
            })
        },
        // クリックされたユーザー、ユーザーの残高をモーダルウィンドウにセットする
        modalSet (context, payload) {
            const modalData = [];
            const user = firebase.auth().currentUser
            const db = firebase.firestore();
            db.collection("userData")
                .where(firebase.firestore.FieldPath.documentId(), "!=", user.uid)
                .get()
                .then(() => {
                    const modaldatum = {
                        clickedUser: payload.clickedUser,
                        clickedUserWallet: payload.clickedUserWallet,
                    }
                    modalData.push(modaldatum)
                    context.commit('setModalData', modalData)
                });
        },
        // ログアウト
        signOut () {
            firebase.auth().signOut().then(() => {
                router.push('/signin')
            })
        },
    },
});

export default store
