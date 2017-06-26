import Vue from 'vue'
import Router from 'vue-router'
import EntryDashboard from '@/components/EntryDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EntryDashboard',
      component: EntryDashboard
    }
  ]
})
