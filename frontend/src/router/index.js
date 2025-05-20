
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/Login.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  // 未來可以加其他頁，例如 Home、Register 等
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router