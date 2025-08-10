import api from '@/api'

const BASE_URL = '/mypage'

// 마이페이지 기본 정보 조회
export const getMyPageInfo = async (token) => {
    console.log('✅token:', token)

    const response = await api.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// 관심 키워드 조회
export const getMyKeywords = async (token) => {
    const response = await api.get(`${BASE_URL}/keywords`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// 관심 키워드 수정
export const updateMyKeywords = async (keywords) => {
    const response = await api.put(`${BASE_URL}/keywords`, keywords)
    return response.data
}

// 개인정보 수정
export const updateAccountInfo = async (accountInfo) => {
    const response = await api.put(`${BASE_URL}/account`, accountInfo)
    return response.data
}

// 내 투표 조회
export const getMyVotes = async (token) => {
    const response = await api.get(`${BASE_URL}/votes`)
    return response.data
}

// 작성한 프로젝트 조회
export const getMyProjects = async () => {
    const response = await api.get(`${BASE_URL}/projects`)
    return response.data
}

// 좋아요한 프로젝트 조회 (투표한 프로젝트)
export const getLikedProjects = async () => {
    const response = await api.get(`${BASE_URL}/votes`)
    return response.data
}

// 참여 중인 챌린지 조회
export const getMyChallenges = async () => {
    const response = await api.get('/api/userChallenge/my-challenges')
    return response.data
}

// 참여 중인 기부 조회
export const getMyDonations = async () => {
    const response = await api.get('/api/user-donation/my-donations')
    return response.data
}

// 참여 중인 대출 조회
export const getMyLoans = async () => {
    const response = await api.get('/api/user-loan/my-loans')
    return response.data
}

// 참여 중인 저축 조회
export const getMySavings = async () => {
    const response = await api.get('/api/user-saving/my-savings')
    return response.data
}
