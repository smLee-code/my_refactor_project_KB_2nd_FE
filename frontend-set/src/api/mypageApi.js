import api from '@/api'
import axios from 'axios'

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
export const getMyKeywords = async () => {
    const response = await api.get('/keyword')
    return response.data
}

// 관심 키워드 수정
export const updateMyKeywords = async (keywordIds, availableKeywords) => {
    const keywordNames = keywordIds.map((id) => {
        const keyword = availableKeywords.find((k) => k.keywordId === id)
        return keyword ? keyword.name : `키워드${id}`
    })
    const response = await api.put(`${BASE_URL}/keywords`, keywordNames)
    return response.data
}

// 개인정보 수정
export const updateAccountInfo = async (accountInfo) => {
    const response = await api.put(`${BASE_URL}/account`, accountInfo)
    return response.data
}

// 내 투표 조회
export const getMyVotes = async (token) => {
    const response = await api.get(`/votes/my-votes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// 작성한 프로젝트 조회
export const getMyProjects = async () => {
    const response = await api.get(`${BASE_URL}/projects`)
    return response.data
}

// 프로젝트 상세 정보 조회
export const getProjectDetail = async (projectId, token) => {
    const response = await api.get(`/project/list/detail/${projectId}/full`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// 프로젝트 좋아요 토글
export const toggleProjectLike = async (projectId, token) => {
    const response = await api.post(`/votes/${projectId}`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// 좋아요한 프로젝트 조회 (투표한 프로젝트)
export const getLikedProjects = async (token) => {
    const response = await api.get('/api/votes/my-votes', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// 좋아요한 펀딩 조회
export const getLikedFundings = async (token) => {
    const response = await api.get(`${BASE_URL}/liked-fundings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}

// 내가 투표한 펀딩 조회
export const getMyAllVotedFunds = async (token) => {
    try {
        const response = await api.get(`/retryVotes/my-fund/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// 참여 중인 펀딩 조회
export const getParticipatingFundings = async () => {
    const response = await api.get(`${BASE_URL}/participating-fundings`)
    return response.data
}

// 참여 중인 저축 조회
export const getMyAllSavings = async (token) => {
    try {
        const response = await api.get(`/user-saving/user/all/v2`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// 참여 중인 대출 조회
export const getMyAllLoans = async (token) => {
    try {
        const response = await api.get(`/user-loan/user/all/v2`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// 참여 중인 기부 조회
export const getMyAllDonations = async (token) => {
    try {
        const response = await api.get(`/user-donation/user/all/v2`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}

// 참여 중인 챌린지 조회
export const getMyAllChallenges = async (token) => {
    try {
        const response = await api.get(`/user-challenge/user/all/v2`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}
