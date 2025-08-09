<!-- <template>
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
</script> -->
<template>
    <!-- 메인 이미지 -->
    <div class="w-full h-96 bg-gray-200 overflow-hidden">
        <img
            :src="currentImage || fallbackImage"
            :alt="title ? `${title} 이미지` : '프로젝트 이미지'"
            class="w-full h-full object-cover object-top"
            @error="onImgError"
        />
    </div>

    <!-- 썸네일 리스트 -->
    <div class="p-4 border-t border-gray-200" v-if="projectImages.length">
        <div class="flex space-x-2 overflow-x-auto">
            <div
                v-for="(image, index) in projectImages"
                :key="image + index"
                class="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 transition-all"
                :class="
                    currentImageIndex === index
                        ? 'border-gray-400'
                        : 'border-gray-200 hover:border-gray-300'
                "
                @click="setCurrentImage(index)"
            >
                <img
                    :src="image"
                    alt="썸네일"
                    class="w-full h-full object-cover object-top"
                    @error="onThumbError(index)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    // 서버 응답의 imageList: [{ imageUrl, imageType, createdAt:[yyyy,M,d,hh,mm,ss], ... }]
    imageList: {
        type: Array,
        default: () => [],
    },
    // 접근성용(선택)
    title: {
        type: String,
        default: '',
    },
    // 기본 이미지 경로(선택)
    fallbackImage: {
        type: String,
        default: '/default-thumbnail.png',
    },
})

/** 배열([yyyy,M,d,hh=0,mm=0,ss=0]) → Date */
const toDate = (arr) => {
    if (!arr || !Array.isArray(arr)) return null
    const [y, m, d, hh = 0, mm = 0, ss = 0] = arr
    return new Date(y, (m ?? 1) - 1, d ?? 1, hh, mm, ss)
}

/** createdAt 오름차순 정렬 후 이미지 URL만 추출 */
const projectImages = computed(() => {
    const list = Array.isArray(props.imageList) ? [...props.imageList] : []
    list.sort((a, b) => {
        const da = toDate(a?.createdAt)?.getTime() ?? 0
        const db = toDate(b?.createdAt)?.getTime() ?? 0
        return da - db
    })
    return list.map((it) => it?.imageUrl).filter((url) => typeof url === 'string' && url.length > 0)
})

const currentImageIndex = ref(0)
const currentImage = computed(() => projectImages.value[currentImageIndex.value] || '')

/** 이미지 목록이 갱신되면 첫 번째로 리셋 */
watch(
    projectImages,
    (list) => {
        currentImageIndex.value = 0
    },
    { immediate: true },
)

const setCurrentImage = (index) => {
    if (index < 0 || index >= projectImages.value.length) return
    currentImageIndex.value = index
}

/** 로딩 실패 대비 */
const onImgError = (e) => {
    e.target.src = props.fallbackImage
}
const onThumbError = (index) => (e) => {
    // 썸네일 에러 났을 때도 기본 이미지로 대체
    e.target.src = props.fallbackImage
}
</script>
