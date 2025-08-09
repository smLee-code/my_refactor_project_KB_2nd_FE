<template>
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- 이미지 갤러리(썸네일 포함) -->
        <div class="relative">
            <!-- 공유 버튼 -->
            <div class="absolute top-4 right-4 flex space-x-2 z-10">
                <shareBox />
            </div>

            <!-- Thumbnail에 프롭 전달 -->
            <Thumbnail :imageList="imageList" :title="title" :fallbackImage="fallbackImage" />
        </div>
    </div>
</template>

<script setup>
import shareBox from './shareBox.vue'
import Thumbnail from '../Thumbnail.vue'

const props = defineProps({
    // 서버 응답의 imageList: [{ imageUrl, imageType, createdAt:[yyyy,M,d,hh,mm,ss], ... }]
    imageList: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    fallbackImage: {
        type: String,
        default: '/default-thumbnail.png',
    },
})
</script>
