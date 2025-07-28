<template>
  <header class="bg-white shadow-lg w-full">
    <div class="container mx-auto px-4 sm:px-6 lg:px-32">
      <div class="flex items-center justify-between h-16">
        <!-- 로고 -->
        <div class="flex items-center cursor-pointer" @click="navigateToHome">
          <img src="/images/logo.png" alt="Fund:ing" class="h-10" />
          <!-- <h1 class="text-title-md font-bold text-kb-ui-01 drop-shadow-sm">Fund:ing</h1> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const navigateToHome = () => {
  router.push('/')
}
</script>

<style scoped></style>
