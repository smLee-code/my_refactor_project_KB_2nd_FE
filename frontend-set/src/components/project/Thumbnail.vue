<template>
  <div class="w-full h-96 bg-gray-200 overflow-hidden">
    <img :src="currentImage" alt="프로젝트 이미지" class="w-full h-full object-cover object-top" />
  </div>

  <div class="p-4 border-t border-gray-200">
    <div class="flex space-x-2 overflow-x-auto">
      <div
        v-for="(image, index) in projectImages"
        :key="index"
        class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 transition-all"
        :class="
          currentImageIndex === index ? 'border-gray-400' : 'border-gray-200 hover:border-gray-300'
        "
        @click="setCurrentImage(index)"
      >
        <img :src="image" alt="썸네일" class="w-full h-full object-cover object-top" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentImageIndex = ref(0)

const projectImages = ref([
  'https://readdy.ai/api/search-image?query=vibrant%20local%20marketplace%20street%20scene%20with%20traditional%20storefronts%2C%20small%20businesses%2C%20and%20modern%20urban%20development%2C%20clean%20architectural%20style%2C%20warm%20sunlight%2C%20professional%20photography%20perspective&width=800&height=600&seq=main1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=modern%20digital%20payment%20system%20integration%20in%20traditional%20local%20market%2C%20small%20business%20owners%20using%20technology%2C%20clean%20urban%20environment%2C%20professional%20documentary%20style&width=800&height=600&seq=main2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=community%20collaboration%20meeting%20for%20local%20business%20development%2C%20diverse%20group%20of%20entrepreneurs%20and%20officials%2C%20modern%20conference%20room%2C%20professional%20business%20photography&width=800&height=600&seq=main3&orientation=landscape',
  'https://readdy.ai/api/search-image?query=successful%20local%20business%20district%20revitalization%20with%20increased%20foot%20traffic%2C%20thriving%20storefronts%2C%20modern%20urban%20planning%2C%20vibrant%20commercial%20atmosphere&width=800&height=600&seq=main4&orientation=landscape',
])

const currentImage = ref(projectImages.value[0])

const setCurrentImage = (index) => {
  currentImageIndex.value = index
  currentImage.value = projectImages.value[index]
}
</script>
