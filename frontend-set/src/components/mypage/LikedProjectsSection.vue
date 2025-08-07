<template>
    <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">좋아요한 프로젝트</h2>

        <!-- 좋아요한 프로젝트가 없을 때 -->
        <div
            v-if="likedProjects.length === 0"
            class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
        >
            <div class="text-gray-400 mb-4">
                <i class="fas fa-heart text-4xl"></i>
            </div>
            <p class="text-gray-600 mb-2">아직 좋아요한 프로젝트가 없습니다.</p>
            <p class="text-sm text-gray-500">관심 있는 프로젝트에 좋아요를 눌러보세요!</p>
        </div>

        <!-- 좋아요한 프로젝트 목록 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
                v-for="project in likedProjects"
                :key="project.id"
                class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
            >
                <div class="relative">
                    <div class="w-full h-48 overflow-hidden rounded-t-2xl">
                        <img
                            :src="project.image"
                            :alt="project.title"
                            class="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div class="absolute top-3 right-3">
                        <button
                            class="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                        >
                            <i class="fas fa-heart text-red-500"></i>
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center space-x-2 mb-3">
                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {{ project.category }}
                        </span>
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            진행중
                        </span>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">
                        {{ project.title }}
                    </h3>
                    <p class="text-sm text-gray-600 mb-4">
                        {{ project.description }}
                    </p>
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center space-x-1">
                            <i class="fas fa-map-marker-alt text-gray-400"></i>
                            <span class="text-gray-600">{{ project.location }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <i class="fas fa-heart text-red-500"></i>
                            <span class="text-gray-600">{{ project.likes }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 좋아요한 펀딩 섹션 -->
    <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">좋아요한 펀딩</h2>

        <!-- 좋아요한 펀딩이 없을 때 -->
        <div
            v-if="likedFundings.length === 0"
            class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
        >
            <div class="text-gray-400 mb-4">
                <i class="fas fa-star text-4xl"></i>
            </div>
            <p class="text-gray-600 mb-2">아직 좋아요한 펀딩이 없습니다.</p>
            <p class="text-sm text-gray-500">관심 있는 펀딩에 좋아요를 눌러보세요!</p>
        </div>

        <!-- 좋아요한 펀딩 목록 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
                v-for="funding in likedFundings"
                :key="funding.id"
                class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
            >
                <div class="relative">
                    <div class="w-full h-48 overflow-hidden rounded-t-2xl">
                        <img
                            :src="funding.image"
                            :alt="funding.title"
                            class="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div class="absolute top-3 right-3">
                        <button
                            class="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                        >
                            <i class="fas fa-star text-yellow-500"></i>
                        </button>
                    </div>
                    <div class="absolute top-3 left-3">
                        <span
                            :class="
                                funding.status === '모집중'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            "
                            class="text-xs px-2 py-1 rounded-full"
                            >{{ funding.status }}</span
                        >
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="font-bold text-gray-900 mb-2">
                        {{ funding.title }}
                    </h3>
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span class="bg-gray-100 px-2 py-1 rounded-full"
                                >남은일수: {{ funding.daysLeft }}일</span
                            >
                            <span class="bg-blue-50 px-2 py-1 rounded-full"
                                >{{ funding.progress }}%</span
                            >
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div
                                class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                :style="{ width: funding.progress + '%' }"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    likedProjects: {
        type: Array,
        default: () => [],
    },
    likedFundings: {
        type: Array,
        default: () => [],
    },
})
</script>
