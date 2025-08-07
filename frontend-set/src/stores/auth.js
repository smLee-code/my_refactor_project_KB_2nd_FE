import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const token = ref('')
    const userRole = ref('')

    function login(receivedAuthData) {
        isLoggedIn.value = true
        token.value = receivedAuthData.token
        userRole.value = receivedAuthData.userRole
        localStorage.setItem('jwt', receivedToken)
        localStoragge.setItem('role', receivedRole)
    }

    function logout() {
        isLoggedIn.value = false
        token.value = ''
        localStorage.removeItem('jwt')
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

    return {
        isLoggedIn,
        token,
        userRole,
        login,
        logout,
        loadToken,
        loadRole,
    }
})
