import Vue from 'vue'
import Router from 'vue-router'
import Browser from './components/Browser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'browse',
      component: Browser
    },
    {
      path: '/book/:bookId',
      name: 'book',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Book.vue')
    }
  ]
})
