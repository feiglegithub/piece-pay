import Vue from 'vue'
import Router from 'vue-router'
// import Equipment from './Equipment'
import BaseIndex from '@/views/BaseIndex'
import OnOffMachine from './OnOffMachine'
//lhj
// import BaseIndex from '../views/Equipment/BaseIndex.vue'
// import SparePart from '../views/Equipment/SparePart.vue'
// import Dotest from '../views/Equipment/Dotest.vue'
//lhj

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
