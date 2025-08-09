<template>
  <section
    class="relative rounded-2xl shadow-2xl overflow-hidden h-[360px] transition-all duration-500"
    :class="backgroundGradients[current % 3]"
  >
    <div class="relative overflow-hidden h-full">
      <Transition name="slide">
        <div 
          :key="current"
          class="absolute inset-0 flex items-center justify-between p-8"
        >
          <div class="flex-1 pr-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-3 leading-tight drop-shadow-sm">
              {{ banners[current].title }}
            </h2>
            <p v-if="banners[current].description" class="text-gray-700 mb-4">
              {{ banners[current].description }}
            </p>
            <div v-if="banners[current].fundId" class="space-y-3">
              <div class="flex items-center space-x-4 text-sm">
                <span class="text-gray-700 font-medium">
                  <i class="far fa-calendar-alt mr-1"></i>
                  {{ banners[current].daysLeft }}일 남음
                </span>
                <span class="text-gray-700 font-medium">
                  <i class="fas fa-chart-line mr-1"></i>
                  달성률 {{ banners[current].progress }}%
                </span>
              </div>
              <button 
                @click="goToFunding(banners[current].fundId)"
                class="mt-4 px-6 py-2 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
              >
                펀딩 상세보기
              </button>
            </div>
            <slot name="actions" :current="current" />
          </div>
          <div class="flex-1">
            <div
              class="w-full h-64 bg-gray-300 rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              @click="banners[current].fundId && goToFunding(banners[current].fundId)"
            >
              <img
                :src="banners[current].image"
                :alt="banners[current].title"
                class="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Transition>
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
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  banners: { type: Array, required: true },
  current: { type: Number, required: true },
})
defineEmits(['update:current', 'indicator-click'])

// 각 슬라이드별 다른 배경 그라데이션
const backgroundGradients = [
  'bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400', // 첫 번째: 기존 노란색-주황색 그라데이션
  'bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300', // 두 번째: 연한 노랑 그라데이션
  'bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-300', // 세 번째: 따뜻한 노랑 그라데이션
]

const goToFunding = (fundId) => {
  router.push(`/funding/detail/${fundId}`)
}
</script>

<style scoped>
/* 슬라이드 전환 애니메이션 */
.slide-enter-active {
  transition: transform 0.5s ease;
}

.slide-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  width: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
