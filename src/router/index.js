import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/confirm',
    name: "Confirm",
    // route level code-splitting
    // this generates a separate chunk (confirm.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Confirm.vue')
  },
  {
    path: '/information',
    name: "Information",
    component: () => import('../views/Information.vue')
  },
  {
    path: '/gold',
    name: "Gold",
    component: () => import('../views/Gold.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
