import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import InitialHomePage from '@/views/Home/Pages/InitialHomePage.vue'
import AboutHomePage from '@/views/Home/Pages/AboutHomePage.vue'
import SupportHomePage from '@/views/Home/Pages/SupportHomePage.vue'
import BlogHomePage from '@/views/Home/Pages/BlogHomePage.vue'
import SignView from '@/views/Sign/SignView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import { Auth } from '../auth.ts'
import ProfileView from '@/views/Dashboard/ProfileView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const auth = new Auth()

// Bloqueia a rota para usuários não autenticados e redireciona para para login
const authGuard = (to: RouteLocation, from: RouteLocation, next: RouteLocation) => {
  if (auth.isLoggedIn()) {
    next()
  } else {
    next('/signin')
  }
}

// Bloqueia a rota para usuários autenticados e redireciona para dashboard
const guest = (to: RouteLocation, from: RouteLocation, next: RouteLocation) => {
  if (auth.isLoggedIn()) {
    next('/dashboard')
  } else {
    next()
  }
}

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
      beforeEnter: guest,
      component: SignView
    },
    {
      path: '/signup',
      name: 'signup',
      beforeEnter: guest,
      component: SignView
    },
    {
      path: '/dashboard',
      beforeEnter: authGuard,
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        }
      ]
    }
  ]
})

export default router
