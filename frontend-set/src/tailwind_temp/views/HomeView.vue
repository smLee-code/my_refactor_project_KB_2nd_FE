<template>
  <div class="min-h-screen bg-white">
    <FundingHeader />
    <FundingHero />
    
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex gap-8">
        <div class="flex-1">
          <PopularProjects />
          <FeaturedProjects />
          <DeadlineProjects />
        </div>
        
        <div class="w-80">
          <div class="sticky top-24">
            <PopularRanking />
          </div>
        </div>
      </div>
    </div>
    
    <ProjectStats />
    <Footer />
  </div>
</template>

<script setup>
import FundingHeader from '@/tailwind_temp/components/FunddingHeader.vue';
import FundingHero from '@/tailwind_temp/components/FundingHero.vue';
import PopularProjects from '@/tailwind_temp/components/PopularProjects.vue';
import PopularRanking from '@/tailwind_temp/components/PopularRanking.vue';
import FeaturedProjects from '@/tailwind_temp/components/FeaturedProjects.vue';
import DeadlineProjects from '@/tailwind_temp/components/DeadlineProjects.vue';
import ProjectStats from '@/tailwind_temp/components/ProjectStats.vue';
import Footer from '@/tailwind_temp/components/Footer.vue';
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>