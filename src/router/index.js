import Vue from 'vue'
import Router from 'vue-router'
import BaseIndex from '@/views/BaseIndex'
import OnOffMachine from './OnOffMachine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: BaseIndex
    },
    ...OnOffMachine
  ]
})
