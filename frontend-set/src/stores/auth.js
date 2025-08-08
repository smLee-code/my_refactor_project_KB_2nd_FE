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

        // 로그아웃 후 로그인 페이지로 리다이렉트
        window.location.href = '/auth/login'
    }

    function loadToken() {
        const savedToken = localStorage.getItem('jwt')
        if (savedToken) {
            token.value = savedToken
            isLoggedIn.value = true
            return true
        }
        return false
    }

    function getToken() {
        return token.value || localStorage.getItem('jwt')
    }

    function isTokenValid() {
        const currentToken = getToken()
        if (!currentToken) return false

        try {
            // JWT 토큰의 만료 시간 확인 (간단한 검증)
            const payload = JSON.parse(atob(currentToken.split('.')[1]))
            const currentTime = Math.floor(Date.now() / 1000)
            return payload.exp > currentTime
        } catch (error) {
            console.error('토큰 파싱 오류:', error)
            return false
        }
    }

    return {
        isLoggedIn,
        token,
        login,
        logout,
        loadToken,
        getToken,
        isTokenValid,
    }
})
