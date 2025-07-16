<template>
  <div class="min-h-screen bg-white">
    <FundingHeader />
    
    <div class="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-8">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <i class="ri-folder-line text-white w-4 h-4 flex items-center justify-center"></i>
          </div>
          <span class="text-sm text-blue-700 font-semibold">전체 프로젝트</span>
        </div>
        
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          모든 <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">프로젝트</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          다양한 분야의 혁신적인 아이디어들을 만나보세요
        </p>
      </div>
    </div>
    
    <PopularProjects />
    <Footer />
  </div>
</template>

<script setup>
import FundingHeader from '@/tailwind_temp/components/FunddingHeader.vue';
import PopularProjects from '@/tailwind_temp/components/PopularProjects.vue';
import Footer from '@/tailwind_temp/components/Footer.vue';
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
