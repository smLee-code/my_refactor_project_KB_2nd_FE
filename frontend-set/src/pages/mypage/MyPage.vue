<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 메인 콘텐츠 -->
        <div class="max-w-6xl mx-auto px-5 py-8">
            <!-- 페이지 타이틀 -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">마이페이지</h1>
            </div>
            <!-- 탭 네비게이션 -->
            <div class="sticky top-16 bg-gray-50 z-40 pb-4">
                <div class="border-b border-gray-200">
                    <nav class="flex space-x-8">
                        <button
                            @click="activeTab = 'info'"
                            :class="{
                                'border-b-2 border-yellow-400 text-gray-900 font-bold':
                                    activeTab === 'info',
                                'text-gray-600 hover:text-gray-900': activeTab !== 'info',
                            }"
                            class="py-3 px-1 cursor-pointer transition-colors whitespace-nowrap"
                        >
                            내 정보
                        </button>
                        <button
                            @click="activeTab = 'activity'"
                            :class="{
                                'border-b-2 border-yellow-400 text-gray-900 font-bold':
                                    activeTab === 'activity',
                                'text-gray-600 hover:text-gray-900': activeTab !== 'activity',
                            }"
                            class="py-3 px-1 cursor-pointer transition-colors whitespace-nowrap"
                        >
                            내 활동
                        </button>
                    </nav>
                </div>
            </div>
            <!-- 탭 콘텐츠 -->
            <div class="relative overflow-hidden">
                <div
                    class="flex transition-transform duration-300 ease-in-out"
                    :style="{
                        transform: `translateX(${activeTab === 'info' ? '0%' : '-100%'})`,
                    }"
                >
                    <!-- 내 정보 탭 -->
                    <div class="w-full flex-shrink-0 py-6">
                        <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="space-y-6">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-600 mb-1"
                                                >이름</label
                                            >
                                            <p class="text-lg text-gray-900">김펀딩</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-4">
                                        <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-600 mb-1"
                                                >아이디</label
                                            >
                                            <p class="text-lg text-gray-900">funding_user</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-4">
                                        <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-600 mb-1"
                                                >이메일</label
                                            >
                                            <p class="text-lg text-gray-900">funding@example.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-y-6">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-600 mb-1"
                                                >가입일</label
                                            >
                                            <p class="text-lg text-gray-900">2024.01.15</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start space-x-4">
                                        <div class="w-4 h-4 bg-gray-400 rounded-full mt-1"></div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-gray-600 mb-3"
                                                >관심 카테고리</label
                                            >
                                            <div class="flex flex-wrap gap-2">
                                                <span
                                                    class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                                    >기술</span
                                                >
                                                <span
                                                    class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                                    >환경</span
                                                >
                                                <span
                                                    class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                                    >문화</span
                                                >
                                                <span
                                                    class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                                    >교육</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8 pt-6 border-t border-gray-200">
                                <button
                                    class="bg-yellow-400 text-gray-900 px-6 py-3 !rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap transition-all"
                                >
                                    회원 정보 수정
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- 내 활동 탭 -->
                    <div class="w-full flex-shrink-0 py-6">
                        <!-- 좋아요한 프로젝트 -->
                        <div class="mb-10">
                            <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                좋아요한 프로젝트
                            </h2>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                            <span
                                                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                                >{{ project.category }}</span
                                            >
                                            <span
                                                class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                >진행중</span
                                            >
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
                                                <span class="text-gray-600">{{
                                                    project.location
                                                }}</span>
                                            </div>
                                            <div class="flex items-center space-x-1">
                                                <i class="fas fa-heart text-red-500"></i>
                                                <span class="text-gray-600">{{
                                                    project.likes
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 좋아요한 펀딩 -->
                        <div class="mb-10">
                            <h2 class="text-xl font-semibold text-gray-900 mb-6">좋아요한 펀딩</h2>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                                <i class="fas fa-heart text-red-500"></i>
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
                                            <div
                                                class="flex items-center justify-between text-sm text-gray-600"
                                            >
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
                        <!-- 참여 중인 펀딩 목록 -->
                        <div class="mb-10">
                            <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                참여 중인 펀딩 목록
                            </h2>
                            <div class="space-y-4">
                                <div
                                    v-for="participation in participatingFundings"
                                    :key="participation.id"
                                    class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                                >
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <h3 class="font-bold text-lg text-gray-900 mb-2">
                                                {{ participation.title }}
                                            </h3>
                                            <div
                                                class="flex items-center space-x-6 text-sm text-gray-600 mb-4"
                                            >
                                                <div class="flex items-center space-x-2">
                                                    <i class="fas fa-calendar text-gray-400"></i>
                                                    <span
                                                        >참여일: {{ participation.joinDate }}</span
                                                    >
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <i class="fas fa-won-sign text-gray-400"></i>
                                                    <span
                                                        >참여 금액:
                                                        {{
                                                            participation.amount.toLocaleString()
                                                        }}원</span
                                                    >
                                                </div>
                                            </div>
                                            <!-- 인증샷 업로드 영역 -->
                                            <div class="mt-4">
                                                <h4 class="text-sm font-medium text-gray-700 mb-3">
                                                    인증샷
                                                </h4>
                                                <div class="flex items-center space-x-4">
                                                    <div
                                                        v-for="(
                                                            image, index
                                                        ) in participation.certificationImages"
                                                        :key="index"
                                                        class="relative"
                                                    >
                                                        <img
                                                            :src="image"
                                                            :alt="`인증샷 ${index + 1}`"
                                                            class="w-20 h-20 rounded-lg object-cover border border-gray-200"
                                                        />
                                                        <button
                                                            @click="
                                                                removeCertificationImage(
                                                                    participation.id,
                                                                    index,
                                                                )
                                                            "
                                                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                                                        >
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                    <div class="relative">
                                                        <input
                                                            type="file"
                                                            :id="`file-${participation.id}`"
                                                            @change="
                                                                handleImageUpload(
                                                                    participation.id,
                                                                    $event,
                                                                )
                                                            "
                                                            accept="image/*"
                                                            class="hidden"
                                                        />
                                                        <label
                                                            :for="`file-${participation.id}`"
                                                            class="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
                                                        >
                                                            <i
                                                                class="fas fa-plus text-gray-400 text-xl"
                                                            ></i>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ml-6">
                                            <button
                                                @click="triggerFileUpload(participation.id)"
                                                class="bg-yellow-400 text-gray-900 px-4 py-2 !rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap transition-all"
                                            >
                                                인증샷 업로드
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 푸터 -->
        <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-8 shadow-inner">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex justify-center space-x-8">
                    <a
                        href="#"
                        class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
                        >Terms and Conditions</a
                    >
                    <a
                        href="#"
                        class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
                        >Privacy Policy</a
                    >
                    <a
                        href="#"
                        class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
                        >Contact Us</a
                    >
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('info')
const showUserMenu = ref(false)
const notifications = ref([
    { id: 1, message: '새로운 펀딩이 등록되었습니다.' },
    { id: 2, message: '회원님의 펀딩이 마감되었습니다.' },
])

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}

const likedProjects = ref([
    {
        id: 1,
        title: '지역 상권 활성화 프로젝트',
        description: '지역 소상공인을 위한 통합 마케팅 및 결제 플랫폼 구축',
        category: '기타',
        location: '서울',
        likes: 98,
        image: 'https://readdy.ai/api/search-image?query=vibrant%20local%20marketplace%20street%20scene%20with%20traditional%20storefronts%2C%20small%20businesses%2C%20and%20modern%20urban%20development%2C%20clean%20architectural%20style%2C%20warm%20sunlight%2C%20professional%20photography%20perspective&width=400&height=300&seq=liked1&orientation=landscape',
    },
    {
        id: 2,
        title: '스마트 도시 인프라 구축',
        description: '도시 문제 해결을 위한 IoT 기반 스마트 시티 솔루션',
        category: '기술',
        location: '부산',
        likes: 87,
        image: 'https://readdy.ai/api/search-image?query=modern%20smart%20city%20infrastructure%20with%20IoT%20sensors%2C%20clean%20urban%20design%2C%20technological%20integration%2C%20professional%20architectural%20visualization&width=400&height=300&seq=liked2&orientation=landscape',
    },
    {
        id: 3,
        title: '친환경 에너지 전환',
        description: '지역 커뮤니티 기반 재생에너지 프로젝트',
        category: '환경',
        location: '제주',
        likes: 76,
        image: 'https://readdy.ai/api/search-image?query=renewable%20energy%20installation%20in%20urban%20setting%2C%20solar%20panels%2C%20clean%20energy%20infrastructure%2C%20professional%20environmental%20photography&width=400&height=300&seq=liked3&orientation=landscape',
    },
])

const likedFundings = ref([
    {
        id: 1,
        title: '친환경 패키징 솔루션',
        daysLeft: 15,
        progress: 85,
        status: '모집중',
        image: 'https://readdy.ai/api/search-image?query=eco-friendly%20packaging%20materials%20with%20sustainable%20design%2C%20green%20technology%20innovation%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20modern%20environmental%20solution&width=400&height=300&seq=funding1&orientation=landscape',
    },
    {
        id: 2,
        title: '스마트 농업 기술',
        daysLeft: 8,
        progress: 92,
        status: '모집중',
        image: 'https://readdy.ai/api/search-image?query=smart%20agriculture%20technology%20with%20modern%20farming%20equipment%2C%20IoT%20sensors%20in%20greenhouse%2C%20clean%20agricultural%20innovation%2C%20professional%20technology%20photography&width=400&height=300&seq=funding2&orientation=landscape',
    },
    {
        id: 3,
        title: '교육용 VR 플랫폼',
        daysLeft: 0,
        progress: 100,
        status: '모집완료',
        image: 'https://readdy.ai/api/search-image?query=virtual%20reality%20education%20platform%20with%20modern%20VR%20headsets%2C%20interactive%20learning%20environment%2C%20clean%20educational%20technology%2C%20professional%20tech%20photography&width=400&height=300&seq=funding3&orientation=landscape',
    },
])

const participatingFundings = ref([
    {
        id: 1,
        title: '지역 카페 창업 지원',
        joinDate: '2024.01.20',
        amount: 50000,
        certificationImages: [
            'https://readdy.ai/api/search-image?query=cozy%20local%20coffee%20shop%20interior%20with%20warm%20lighting%2C%20comfortable%20seating%20area%2C%20professional%20cafe%20atmosphere%2C%20modern%20coffee%20equipment%2C%20clean%20business%20photography&width=150&height=150&seq=cert1&orientation=squarish',
        ],
    },
    {
        id: 2,
        title: '청년 창업 지원 프로그램',
        joinDate: '2024.02.05',
        amount: 100000,
        certificationImages: [
            'https://readdy.ai/api/search-image?query=young%20entrepreneurs%20working%20in%20modern%20startup%20office%2C%20collaborative%20workspace%2C%20professional%20business%20environment%2C%20clean%20corporate%20photography&width=150&height=150&seq=cert2&orientation=squarish',
            'https://readdy.ai/api/search-image?query=startup%20team%20meeting%20with%20laptops%20and%20documents%2C%20modern%20office%20setting%2C%20professional%20business%20collaboration%2C%20clean%20workspace%20photography&width=150&height=150&seq=cert3&orientation=squarish',
        ],
    },
    {
        id: 3,
        title: '환경 보호 캠페인',
        joinDate: '2024.02.15',
        amount: 30000,
        certificationImages: [],
    },
])

const handleImageUpload = (fundingId, event) => {
    const target = event.target
    const file = target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageUrl = e.target?.result
            const funding = participatingFundings.value.find((f) => f.id === fundingId)
            if (funding) {
                funding.certificationImages.push(imageUrl)
            }
        }
        reader.readAsDataURL(file)
    }
}

const removeCertificationImage = (fundingId, imageIndex) => {
    const funding = participatingFundings.value.find((f) => f.id === fundingId)
    if (funding) {
        funding.certificationImages.splice(imageIndex, 1)
    }
}

const triggerFileUpload = (fundingId) => {
    const fileInput = document.getElementById(`file-${fundingId}`)
    fileInput?.click()
}

onMounted(() => {
    document.addEventListener('click', (event) => {
        const userMenuButton = document.getElementById('user-menu-button')
        const userMenuDropdown = userMenuButton?.nextElementSibling
        if (userMenuButton && userMenuDropdown) {
            if (
                !userMenuButton.contains(event.target) &&
                !userMenuDropdown.contains(event.target)
            ) {
                showUserMenu.value = false
            }
        }
    })
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}
</style>
