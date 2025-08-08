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

        // userId가 있으면 저장
        if (receivedAuthData.user && receivedAuthData.user.userId) {
            userId.value = receivedAuthData.user.userId
            localStorage.setItem('userId', receivedAuthData.user.userId)
            console.log('✅userId:', receivedAuthData.user.userId)
        }

        localStorage.setItem('jwt', receivedAuthData.token)
        localStorage.setItem('role', receivedAuthData.userRole)
    }

    function logout() {
        isLoggedIn.value = false
        token.value = ''
        userRole.value = ''
        userId.value = null
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
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
        return userId
    }

    function isFinanceRole() {
        return userRole.value === 'ROLE_FINANCE'
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
        isFinanceRole,
    }
})
