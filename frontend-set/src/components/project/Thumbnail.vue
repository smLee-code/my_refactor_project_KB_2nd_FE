<template>
    <div class="w-full h-96 bg-gray-200 overflow-hidden">
        <img
            :src="currentImage"
            alt="프로젝트 이미지"
            class="w-full h-full object-cover object-top"
        />
    </div>

    <div class="p-4 border-t border-gray-200">
        <div class="flex space-x-2 overflow-x-auto">
            <div
                v-for="(image, index) in projectImages"
                :key="index"
                class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 transition-all"
                :class="
                    currentImageIndex === index
                        ? 'border-gray-400'
                        : 'border-gray-200 hover:border-gray-300'
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
    '/images/logo.png',
    '/images/logo.png',
    '/images/logo.png',
    '/images/logo.png',
])

const currentImage = ref(projectImages.value[0])

const setCurrentImage = (index) => {
    currentImageIndex.value = index
    currentImage.value = projectImages.value[index]
}
</script>
