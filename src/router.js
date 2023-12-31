/* eslint-disable camelcase */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/qrscan',
      name: 'QrScan',
      component: () => import(/* webpackChunkName: "Account" */ '@/views/qrscan.vue')
    },
  ]
})

export default router