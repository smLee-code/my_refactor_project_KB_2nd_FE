<template>
  <header class="bg-white shadow-lg w-full">
    <div class="container mx-auto px-4 sm:px-6 lg:px-32">
      <div class="flex items-center justify-between h-16">
        <!-- 로고 -->
        <div class="flex items-center cursor-pointer" @click="goHome">
          <h1 class="text-2xl font-bold text-gray-900 drop-shadow-sm">Fund:ing</h1>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped></style>
