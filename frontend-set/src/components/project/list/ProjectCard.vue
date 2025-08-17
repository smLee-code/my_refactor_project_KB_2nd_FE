<template>
    <div
        @click="$emit('click')"
        class="bg-kb-ui-11 rounded-2xl border border-kb-ui-09 p-5 hover:shadow-card hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
        <!-- 썸네일 -->
        <div class="w-full h-48 bg-kb-ui-10 rounded-xl overflow-hidden mb-4">
            <img
                :src="thumbnailImageUrl"
                :alt="project.title"
                class="w-full h-full object-cover object-top"
            />
        </div>

        <!-- 카테고리 태그와 좋아요 -->
        <div class="flex items-center justify-between mb-3">
            <span class="bg-kb-ui-09 text-kb-ui-03 px-3 py-1 rounded-full caption font-medium">
                {{ project.type }}
            </span>
            <div class="flex items-center space-x-1 text-kb-ui-05">
                <button @click.stop="$emit('toggle-like', project.id)" class="cursor-pointer">
                    <i
                        class="fa-heart text-sm"
                        :class="isLiked ? 'fas text-status-error' : 'far text-kb-ui-06'"
                    ></i>
                </button>

                <span class="caption">{{ project.likes }}</span>
            </div>
        </div>

        <!-- 제목 -->
        <h3 class="title-md text-kb-ui-02 font-bold mb-2 line-clamp-2">
            {{ project.title }}
        </h3>

        <!-- 한 줄 요약 -->
        <p class="body-md text-kb-ui-04 mb-4 line-clamp-2">{{ project.description }}</p>

        <!-- 구분선 -->
        <div class="border-t border-kb-ui-09 pt-3">
            <div class="flex items-center justify-between caption text-kb-ui-05">
                <span>{{ formatDate(project.createdAt) }}</span>
            </div>
        </div>

        <!-- 상태 + 자세히 보기 -->
        <div class="mt-3 flex items-center justify-between">
            <span
                class="px-2 py-1 rounded-full caption font-medium"
                :class="{
                    'bg-status-positive/10 text-status-positive': project.status == '진행중',
                    'bg-kb-ui-09 text-kb-ui-04': project.status === '마감',
                }"
            >
                {{ project.status }}
            </span>
            <button
                class="caption text-status-positive hover:text-status-positive/80 font-medium whitespace-nowrap"
            >
                자세히 보기
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// project: 프로젝트 객체 (필수)
const props = defineProps({
    project: { type: Object, required: true },
})

const isLiked = computed(() => props.project.isLiked)

// 이미지 URL 계산 - thumbnailUrl, image, imageList 순서로 우선순위 적용
const thumbnailImageUrl = computed(() => {
    // 1. thumbnailUrl이 있으면 사용
    if (props.project.thumbnailUrl) {
        return props.project.thumbnailUrl
    }

    // 2. image 속성이 있으면 사용 (MyPage에서 변환한 데이터)
    if (props.project.image) {
        return props.project.image
    }

    // 3. imageList 배열이 있으면 첫 번째 이미지 사용
    if (props.project.imageList && props.project.imageList.length > 0) {
        return props.project.imageList[0].imageUrl
    }

    // 4. 기본 이미지 반환
    return '/public/images/logo.png'
})

const formatDate = (dateString) => {
    if (!dateString) return ''

    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}.${month}.${day}`
}

console.log('✅ props:', props)
console.log('✅ thumbnailImageUrl:', thumbnailImageUrl.value)
</script>
