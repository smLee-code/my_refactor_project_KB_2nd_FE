import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const token = ref('')
    const userRole = ref('')

    function login(receivedAuthData) {
        console.log('✅receivedAuthData:', receivedAuthData)

        isLoggedIn.value = true

        token.value = receivedAuthData.token
        console.log('✅token:', receivedAuthData.token)

        userRole.value = receivedAuthData.userRole
        console.log('✅userRole:', receivedAuthData.userRole)

        localStorage.setItem('jwt', receivedAuthData.token)
        localStorage.setItem('role', receivedAuthData.userRole)
    }

    function logout() {
        isLoggedIn.value = false
        token.value = ''
        userRole.value = ''
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
    }

    function loadToken() {
        const savedToken = localStorage.getItem('jwt')
        if (savedToken) {
            token.value = savedToken
            isLoggedIn.value = true
        }
        return token
    }

    function loadRole() {
        const savedRole = localStorage.getItem('role')
        if (savedRole) {
            userRole.value = savedRole
        }
        return userRole
    }

    function isFinanceRole() {
        return userRole.value === 'ROLE_FINANCE'
    }

    return {
        isLoggedIn,
        token,
        userRole,
        login,
        logout,
        loadToken,
        loadRole,
        isFinanceRole,
    }
})
