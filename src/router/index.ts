import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import InitialHomePage from '@/views/home/pages/InitialHomePage.vue'
import AboutHomePage from '@/views/home/pages/AboutHomePage.vue'
import SupportHomePage from '@/views/home/pages/SupportHomePage.vue'
import BlogHomePage from '@/views/home/pages/BlogHomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
    }
  ]
})

export default router
