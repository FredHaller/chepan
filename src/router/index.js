import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LayoutView from '../views/LayoutView.vue'
import ProfileView from '../views/ProfileView.vue'
import AuthView from '../views/AuthView.vue'
import UploadView from '../views/UploadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/*',
      component: LayoutView,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/moreinfo',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: '/upload',
          name: 'upload',
          component: UploadView,
        }
      ],
      beforeEnter(to, from, next) {
        if (sessionStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/auth',
      component: AuthView,
      children: [
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/RegisterView.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView
        }]
    },
  ]
})

export default router
