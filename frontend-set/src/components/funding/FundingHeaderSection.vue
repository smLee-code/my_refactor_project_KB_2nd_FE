<template>
    <section class="mb-8">
        <!-- 프로젝트 메인 비주얼 -->
        <div class="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
            <img
                :src="projectImage"
                :alt="projectTitle + ' 대표 이미지'"
                class="w-full h-full object-cover object-top"
            />
            <div class="absolute top-6 right-6 flex items-center space-x-3">
                <div
                    class="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                    {{ status }}
                </div>
                <button
                    @click="$emit('toggleLike')"
                    class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all cursor-pointer"
                >
                    <i
                        :class="
                            isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600'
                        "
                    ></i>
                </button>
                <button
                    @click="$emit('share')"
                    class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all cursor-pointer"
                >
                    <i class="fas fa-share text-gray-600"></i>
                </button>
            </div>
        </div>
        <div class="mt-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {{ projectTitle }}
            </h1>
            <p class="text-lg text-gray-600">
                {{ projectDescription }}
            </p>
        </div>
    </section>
</template>

<script setup>
// Props 정의
// @param {string} projectImage - 프로젝트 대표 이미지 URL
// @param {string} projectTitle - 프로젝트 제목
// @param {string} projectDescription - 프로젝트 설명
// @param {string} status - 프로젝트 상태 (진행중, 완료 등)
// @param {boolean} isLiked - 좋아요 상태

const props = defineProps({
    projectImage: {
        type: String,
        required: true,
    },
    projectTitle: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: '진행중',
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
})

// Emits 정의
// @emits {void} toggleLike - 좋아요 토글 이벤트
// @emits {void} share - 공유 이벤트

defineEmits(['toggleLike', 'share'])
</script>
