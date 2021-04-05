/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard,
      meta: { requiresAuth: true } //DashBoardコンポーネントの表示には認証が必要と定義
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // ルートメタフィールドのrequiredAuthプロパティがtrueの場合、認証されているかどうかをチェックする挙動を実装
  if (requiresAuth) { //true or false
    firebase.auth().onAuthStateChanged(function (user) { // ログインしているユーザーを取得
      // ユーザがログインされているかどうか認証
      if (user) {
        next() //nextを呼ぶとtoのコンポーネントに遷移
      // ログインページにリダイレクト
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
