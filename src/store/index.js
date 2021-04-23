/* eslint-disable */
"use strict"

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
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
        setTipping (state, doc) {
            state.myWallet = doc.data().myWallet
        }
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
                    // firestoreへ登録
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
                                uid: doc.data().uid,
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
                    const modalData = [];
                    modalData.push(modaldatum)
                    context.commit('setModalData', modalData)
                });
        },
        // 投げ銭機能
        tipping (context, payload) {
            const user = firebase.auth().currentUser
            const db = firebase.firestore();
            const docRef = db.collection("userData").doc(user.uid);
            docRef.update({
                myWallet: firebase.firestore.FieldValue.increment(-payload.tippingWallet)
            })
            // storeのmyWallet（ログインユーザー）の更新
            .then(() => {
                docRef.get()
                .then((doc) => {
                    if (doc.exists) {
                        context.commit('setTipping', doc)
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    alert(error.message)
                });
            })
            // firestoreのmyWallet（選択ユーザー）の更新
            db.collection("userData").doc(payload.clickedUserUid).update({
                myWallet: firebase.firestore.FieldValue.increment(payload.tippingWallet)
            })
            // storeのusers（選択ユーザー）の更新
            .then(() => {
                const users = []
                db.collection("userData")
                .where(firebase.firestore.FieldPath.documentId(), "!=", user.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const user = {
                            uid: doc.data().uid,
                            username: doc.data().username,
                            myWallet: doc.data().myWallet
                        }
                        users.push(user)
                        context.commit('setUsersData', users)
                    });
                });
            })
            // トランザクション処理Ver.（エラー解決策なしのため、いったんコメントアウト）
            // const db = firebase.firestore();
            // const user = firebase.auth().currentUser
            // const docRef = db.collection("userData").doc(user.uid);
            // return db.runTransaction((transaction) => {
            //     // This code may get re-run multiple times if there are conflicts.
            //     return transaction.get(docRef).then((doc) => {
            //         if (!doc.exists) {
            //             throw "Document does not exist!";
            //         }
            //         const tippingWallet = parseInt(doc.data().myWallet + -payload.tippingWallet);
            //         transaction.update(docRef, { myWallet: tippingWallet });
            //         console.log(typeof tippingWallet);
            //     });
            // })
            // .then(() => {
            //     console.log("Transaction successfully committed!");
            // }).catch((error) => {
            //     console.log("Transaction failed: ", error);
            // });
            // firestoreのmyWallet（ログインユーザー）の更新
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
