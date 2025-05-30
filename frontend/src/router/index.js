import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/Login.vue'
import Home from '../view/Home.vue'
import Test from '../view/test.vue'
import Rating from '../view/Rating.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/test', name: 'test', component: Test, meta: { requiresAuth: true } },
  { path: '/rating', name: 'rating', component: Rating, meta: { requiresAuth: true } },
  { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router