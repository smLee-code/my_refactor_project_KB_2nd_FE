import api from '@/api'

/**
 * 펀딩 생성 (대출)
 * @param {*} formData
 * @returns
 */
export const createLoanFunding = async (formData) => {
    try {
        const response = await api.post('/fund/create/loan', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        console.error('펀딩 생성 실패:', error)
        throw error
    }
}

/**
 * 펀딩 생성 (저축)
 * @param {*} formData
 * @returns
 */
export const createSavingsFunding = async (formData) => {
    try {
        const response = await api.post('/fund/create/savings', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        console.error('저축 펀딩 생성 실패:', error)
        throw error
    }
}

/**
 * 펀딩 생성 (기부)
 * @param {*} formData
 * @returns
 */
export const createDonationFunding = async (formData) => {
    try {
        const response = await api.post('/fund/create/donation', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        console.error('기부 펀딩 생성 실패:', error)
        throw error
    }
}

/**
 * 펀딩 생성 (챌린지)
 * @param {*} formData
 * @returns
 */
export const createChallengeFunding = async (formData) => {
    try {
        const response = await api.post('/fund/create/challenge', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        console.error('챌린지 펀딩 생성 실패:', error)
        throw error
    }
}

/**
 * 챌린지 가입 신청
 * @param {*} id
 * @returns
 */
export const applyChallenge = async (id) => {
    try {
        const response = await api.post(`/user-challenge/${id}`, {})
        return response.data
    } catch (error) {
        console.error('챌린지 가입 신청 실패:', error)
        throw error
    }
}

/**
 * 챌린지 참여 취소
 * @param {*} id
 * @returns
 */
export const deleteChallenge = async (id) => {
    try {
        const response = await api.delete(`/user-challenge/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('챌린지 가입 취소 실패:', error)
        throw error
    }
}

/**
 * 키워드 기반 펀딩 추천
 * @returns
 */
export const getRecommendedFundings = async () => {
    try {
        const response = await api.get('/fund/list/keyword', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('키워드 기반 펀딩 추천 조회 실패:', error)
        // 에러 발생 시 빈 배열 반환
        return []
    }
}

/**
 * 챌린지 인증 (인증샷 업로드)
 * @param {*} id
 * @param {*} formData
 * @returns
 */
export const verifyChallenge = async (id, formData) => {
    try {
        console.log('verifyChallenge API 호출 시작:', {
            id: id,
            formDataEntries: Array.from(formData.entries()),
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })

        const response = await api.post(`/user-challenge/${id}/verify`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })

        console.log('verifyChallenge API 응답 성공:', response.data)
        return response.data
    } catch (error) {
        console.error('챌린지 인증 실패:', error)
        if (error.response) {
            console.error('서버 응답 데이터:', error.response.data)
            console.error('서버 응답 상태:', error.response.status)
            console.error('서버 응답 헤더:', error.response.headers)
        } else if (error.request) {
            console.error('요청은 전송되었지만 응답이 없음:', error.request)
        } else {
            console.error('요청 설정 중 오류:', error.message)
        }
        throw error
    }
}

/**
 * 챌린지 상세 정보 조회
 * @param {*} userChallengeId
 * @returns
 */
export const getChallengeDetail = async (userChallengeId) => {
    try {
        const response = await api.get(`user-challenge/${userChallengeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('챌린지 상세 정보 조회 실패:', error)
        throw error
    }
}

/**
 * 내 모든 챌린지 조회
 * @returns
 */
export const getAllMyChallenges = async () => {
    try {
        const response = await api.get(`/user-challenge/user/all/v2`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('내 챌린지 목록 조회 실패:', error)
        throw error
    }
}

/**
 * 챌린지 로그 조회 (인증샷 이력)
 * @param {*} userChallengeId
 * @returns
 */
export const getChallengeLogs = async (userChallengeId) => {
    try {
        const response = await api.get(`/challenge-logs/${userChallengeId}/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}
