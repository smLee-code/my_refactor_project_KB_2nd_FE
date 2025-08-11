import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const token = ref('')
    const role = ref('')
    const userId = ref(null)

    function login(receivedAuthData) {
        console.log('✅receivedAuthData:', receivedAuthData)

        isLoggedIn.value = true

        token.value = receivedAuthData.token
        console.log('✅token:', receivedAuthData.token)

        role.value = receivedAuthData.userRole
        console.log('✅userRole:', receivedAuthData.userRole)

        userId.value = receivedAuthData.userId
        console.log('✅userId:', receivedAuthData.userId)

        localStorage.setItem('userId', receivedAuthData.userId.toString())
        localStorage.setItem('jwt', receivedAuthData.token)
        localStorage.setItem('role', receivedAuthData.userRole)
    }

    function logout() {
        isLoggedIn.value = false
        token.value = ''
        role.value = ''
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
            role.value = savedRole
        }
        return role.value
    }

    function loadUserId() {
        const savedUserId = localStorage.getItem('userId')
        if (savedUserId) {
            userId.value = parseInt(savedUserId)
        }
        return userId.value
    }

    function isFinanceRole() {
        return role.value === 'ROLE_FINANCE'
    }

    return {
        isLoggedIn,
        token,
        userRole: role,
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
