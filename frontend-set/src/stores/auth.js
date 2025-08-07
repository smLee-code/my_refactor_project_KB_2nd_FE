import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)
    const token = ref('')

    function login(receivedToken) {
        isLoggedIn.value = true
        token.value = receivedToken
        localStorage.setItem('jwt', receivedToken)
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

    return {
        isLoggedIn,
        token,
        login,
        logout,
        loadToken,
    }
})
