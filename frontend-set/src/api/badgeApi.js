import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// 사용자가 보유한 뱃지 목록 조회
export const getUserBadges = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/badge/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('뱃지 조회 실패:', error)
        throw error
    }
}

// 모든 뱃지 목록 조회 (관리자용)
export const getAllBadges = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/badge`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('전체 뱃지 조회 실패:', error)
        throw error
    }
}
