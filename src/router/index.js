import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'

const router = Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard
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

export { router }
