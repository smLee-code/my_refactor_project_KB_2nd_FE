<template>
    <header class="bg-kb-ui-11 shadow-card sticky top-0 z-50 w-full">
        <div class="max-w-[1200px] mx-auto px-5 lg:px-10">
            <div class="flex items-center justify-between h-16">
                <!-- 로고 -->
                <div class="flex items-center cursor-pointer" @click="navigateToHome">
                    <img src="/images/logo.png" alt="Fund:ing" class="h-10" />
                    <!-- <h1 class="text-title-md font-bold text-kb-ui-01 drop-shadow-sm">Fund:ing</h1> -->
                </div>
                <!-- 네비게이션 -->
                <nav class="hidden md:flex items-center space-x-8">
                    <router-link
                        to="/"
                        class="text-body-md text-kb-ui-03 hover:text-kb-ui-01 font-medium transition-colors hover:border-b-2 hover:border-kb-ui-01 pb-1"
                        active-class="text-kb-ui-01 border-b-2 border-kb-ui-01"
                    >
                        홈
                    </router-link>
                    <router-link
                        to="/funding"
                        class="text-body-md text-kb-ui-03 hover:text-kb-ui-01 font-medium transition-colors hover:border-b-2 hover:border-kb-ui-01 pb-1"
                        active-class="text-kb-ui-01 border-b-2 border-kb-ui-01"
                    >
                        펀딩
                    </router-link>
                    <router-link
                        to="/project"
                        class="text-body-md text-kb-ui-03 hover:text-kb-ui-01 font-medium transition-colors hover:border-b-2 hover:border-kb-ui-01 pb-1"
                        active-class="text-kb-ui-01 border-b-2 border-kb-ui-01"
                    >
                        프로젝트
                    </router-link>
                </nav>
                <!-- 로그인 버튼 -->
                <div class="flex items-center space-x-4">
                    <template v-if="!auth.isLoggedIn">
                        <button
                            @click="goToLoginPage"
                            class="bg-gray-900 text-white px-6 py-2 !rounded-button font-medium hover:bg-gray-800 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            로그인
                        </button>
                        <button
                            @click="goToJoinPage"
                            class="bg-gray-900 text-white px-6 py-2 !rounded-button font-medium hover:bg-gray-800 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            회원가입
                        </button>
                    </template>
                    <template v-else>
                        <div class="flex items-center space-x-4">
                            <!-- <div class="relative">
                                <button
                                    class="relative p-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                                    @click="toggleNotificationDropdown"
                                    id="notification-button"
                                >
                                    <i class="fas fa-bell text-lg"></i>
                                    <span
                                        v-if="notifications.length > 0"
                                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                                        >{{ notifications.length }}</span
                                    >
                                </button>
                                <div
                                    v-if="showNotificationDropdown"
                                    class="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                >
                                    <template v-if="notifications.length > 0">
                                        <div
                                            v-for="item in notifications"
                                            :key="item.id"
                                            class="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                                        >
                                            <i class="fas fa-bell text-gray-400"></i>
                                            <span>{{ item.message }}</span>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="px-4 py-6 text-center text-gray-400 text-sm">
                                            알림이 없습니다.
                                        </div>
                                    </template>
                                </div>
                            </div> -->
                            <div class="relative">
                                <button
                                    id="user-menu-button"
                                    @click="toggleUserMenu"
                                    class="p-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                                >
                                    <i class="fas fa-user text-lg"></i>
                                </button>
                                <div
                                    v-if="showUserMenu"
                                    class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                >
                                    <router-link
                                        to="/mypage"
                                        class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                                    >
                                        <i class="fas fa-user-circle mr-3 text-gray-400"></i>
                                        마이페이지
                                    </router-link>
                                </div>
                            </div>
                            <button
                                @click="handleLogout"
                                class="bg-gray-100 text-gray-700 px-4 py-2 !rounded-button font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap transition-all"
                            >
                                로그아웃
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const showUserMenu = ref(false)
const showNotificationDropdown = ref(false)
const router = useRouter()

const goToLoginPage = () => {
    router.push('/auth/login')
}

const goToJoinPage = () => {
    router.push('/auth/join')
}

const handleLogout = () => {
    auth.logout()
    router.push('/')
}

// mock data
const notifications = ref([
    { id: 1, message: '새로운 펀딩이 등록되었습니다.' },
    { id: 2, message: '회원님의 펀딩이 마감되었습니다.' },
])

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
    if (showUserMenu.value) showNotificationDropdown.value = false
}
const toggleNotificationDropdown = () => {
    showNotificationDropdown.value = !showNotificationDropdown.value
    if (showNotificationDropdown.value) showUserMenu.value = false
}
const navigateToHome = () => {
    router.push('/')
}

// 바깥 클릭 시 드롭다운 닫기
const handleClickOutside = (event) => {
    const notificationBtn = document.getElementById('notification-button')
    const userMenuBtn = document.getElementById('user-menu-button')
    const notificationDropdown = notificationBtn?.nextElementSibling
    const userMenuDropdown = userMenuBtn?.nextElementSibling
    if (
        showNotificationDropdown.value &&
        notificationBtn &&
        notificationDropdown &&
        !notificationBtn.contains(event.target) &&
        !notificationDropdown.contains(event.target)
    ) {
        showNotificationDropdown.value = false
    }
    if (
        showUserMenu.value &&
        userMenuBtn &&
        userMenuDropdown &&
        !userMenuBtn.contains(event.target) &&
        !userMenuDropdown.contains(event.target)
    ) {
        showUserMenu.value = false
    }
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
