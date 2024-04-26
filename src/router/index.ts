import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import InitialHomePage from '@/views/Home/Pages/InitialHomePage.vue'
import AboutHomePage from '@/views/Home/Pages/AboutHomePage.vue'
import SupportHomePage from '@/views/Home/Pages/SupportHomePage.vue'
import BlogHomePage from '@/views/Home/Pages/BlogHomePage.vue'
import SignView from '@/views/Sign/SignView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'initial',
          component: InitialHomePage
        },
        {
          path: '/about',
          name: 'about',
          component: AboutHomePage
        },
        {
          path: '/support',
          name: 'support',
          component: SupportHomePage
        },
        {
          path: '/blog',
          name: 'blog',
          component: BlogHomePage
        }
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

export default router
