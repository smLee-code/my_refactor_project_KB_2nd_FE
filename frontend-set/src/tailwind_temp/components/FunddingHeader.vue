<template>
  <header class="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="w-full px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-10">
          <router-link to="/" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent" :style="{ fontFamily: 'Pacifico, serif' }">
            Funding
          </router-link>
          <nav class="hidden md:flex items-center space-x-8">
            <router-link to="/projects" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">프로젝트</router-link>
            <router-link to="/funding" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">펀딩</router-link>
            <router-link to="/search" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">검색</router-link>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-gray-600 hover:text-blue-600 transition-colors font-medium">로그인</button>
          <button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            프로젝트 올리기
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// 필요한 경우 여기에 스크립트를 추가합니다.
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
