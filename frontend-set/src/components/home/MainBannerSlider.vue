<template>
  <section
    class="relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 rounded-2xl shadow-2xl overflow-hidden h-[360px]"
  >
    <div class="p-8">
      <div class="relative flex items-center justify-between">
        <div class="flex-1 pr-12">
          <div class="text-sm text-gray-700 mb-4 font-medium">
            {{ current + 1 }}/{{ banners.length }}
          </div>
          <h2 class="text-4xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            {{ banners[current].title }}
          </h2>
          <slot name="actions" :current="current" />
        </div>
        <div class="flex-1">
          <div
            class="w-full h-64 bg-gray-300 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <img
              :src="banners[current].image"
              :alt="banners[current].title"
              class="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 인디케이터 점들을 중앙 하단으로 이동 -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
      <div
        v-for="(banner, idx) in banners"
        :key="idx"
        class="w-2 h-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
        :class="current === idx ? 'bg-white shadow-lg opacity-90' : 'bg-white/50 hover:bg-white/70'"
        @click="$emit('update:current', idx); $emit('indicator-click', idx)"
      ></div>
    </div>
  </section>
</template>
<script setup>
// 메인 배너 슬라이더
// props:
// - banners: [{ title, image }]
// - current: 현재 인덱스 (v-model:current)
defineProps({
  banners: { type: Array, required: true },
  current: { type: Number, required: true },
})
defineEmits(['update:current', 'indicator-click'])
</script>
