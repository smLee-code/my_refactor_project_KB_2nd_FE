<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <!-- Main Image -->
    <div class="relative h-96 bg-gray-100">
      <img
        :src="`https://readdy.ai/api/search-image?query=${project.mainImage}`"
        :alt="project.title"
        class="w-full h-full object-cover object-top"
      />
      <div class="absolute top-6 left-6">
        <span class="bg-[#FFD338] text-black px-4 py-2 rounded-full font-semibold">
          {{ project.category }}
        </span>
      </div>
      <div class="absolute top-6 right-6 flex gap-3">
        <button class="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
          <i class="ri-heart-line text-gray-700 w-5 h-5 flex items-center justify-center"></i>
        </button>
        <button class="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors">
          <i class="ri-share-line text-gray-700 w-5 h-5 flex items-center justify-center"></i>
        </button>
      </div>
    </div>
    
    <!-- Title Section -->
    <div class="p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-3">
        {{ project.title }}
      </h1>
      <p class="text-lg text-gray-600 leading-relaxed">
        {{ project.subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
