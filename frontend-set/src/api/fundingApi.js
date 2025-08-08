import api from '@/api'

// 펀딩 생성 (대출)
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

// 펀딩 생성 (저축)
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

// 펀딩 생성 (기부)
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

// 펀딩 생성 (챌린지)
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
