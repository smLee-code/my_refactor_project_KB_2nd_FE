import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const token = ref('')
    const userRole = ref('')
    const userId = ref(null)

    function login(receivedAuthData) {
        console.log('✅receivedAuthData:', receivedAuthData)

        isLoggedIn.value = true

        token.value = receivedAuthData.token
        console.log('✅token:', receivedAuthData.token)

        userRole.value = receivedAuthData.userRole
        console.log('✅userRole:', receivedAuthData.userRole)

        // userId 저장 (응답에서 직접 받음)
        if (receivedAuthData.userId) {
            userId.value = receivedAuthData.userId
            localStorage.setItem('userId', receivedAuthData.userId)
            console.log('✅userId:', receivedAuthData.userId)
        }

        localStorage.setItem('jwt', receivedAuthData.token)
        localStorage.setItem('role', receivedAuthData.userRole)
    }

    function logout() {
        isLoggedIn.value = false
        token.value = ''
        userRole.value = ''
        userId.value = null

        // 모든 사용자 관련 localStorage 데이터 정리
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')

        // 추가적으로 모든 localStorage 항목 중 사용자 관련된 것들 정리
        // (필요시 다른 키들도 여기에 추가 가능)

        // sessionStorage도 정리
        sessionStorage.clear()

        console.log('✅ 로그아웃 완료: 모든 사용자 데이터가 정리되었습니다.')
    }

    function loadToken() {
        const savedToken = localStorage.getItem('jwt')
        if (savedToken) {
            token.value = savedToken
            isLoggedIn.value = true
        }
        return token.value
    }

    function loadRole() {
        const savedRole = localStorage.getItem('role')
        if (savedRole) {
            userRole.value = savedRole
        }
        return userRole.value
    }

    function loadUserId() {
        const savedUserId = localStorage.getItem('userId')
        if (savedUserId) {
            userId.value = parseInt(savedUserId)
        }
        return userId.value
    }

    // 앱 시작 시 모든 사용자 데이터 로드
    function initializeAuth() {
        loadToken()
        loadRole()
        loadUserId()
    }

    function isFinanceRole() {
        return userRole.value === 'ROLE_FINANCE'
    }

    function isNormalRole() {
        return userRole.value === 'ROLE_NORMAL'
    }

    function getRedirectPath() {
        if (userRole.value === 'ROLE_NORMAL') {
            return '/mypage'
        } else {
            return '/dashboard'
        }
    }

    return {
        isLoggedIn,
        token,
        userRole,
        userId,
        login,
        logout,
        loadToken,
        loadRole,
        loadUserId,
        initializeAuth,
        isFinanceRole,
        isNormalRole,
        getRedirectPath,
    }
})
