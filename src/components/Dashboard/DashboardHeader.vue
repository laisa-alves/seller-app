<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useRouter } from 'vue-router'
import { Auth } from '@/auth'

const { toggleSidebar } = useSidebarStore()
const router = useRouter()

function onSignOut() {
  let auth = new Auth()
  auth.signOut(() => {
    router.push('/signin')
  })
}
</script>

<template>
  <header class="sticky top-0 z-10 flex w-full bg-white drop-shadow-sm">
    <div class="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
      <div class="lg:hidden">
        <!-- Hamburger toggle BTN -->
        <button
          class="z-20 block rounded-md border border-stroke p-1.5 shadow-sm lg:hidden"
          @click="
            () => {
              toggleSidebar()
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <!-- End Hamburger toggle BTN -->
        <!-- Logo pequena -->
      </div>

      <div class="flex items-center lg:flex-grow lg:justify-end">
        <button class="flex gap-1 items-center font-medium text-deep-orange-600" @click="onSignOut">
          Sair
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
