import axios from 'axios'

/**
 * 특정 대출 상품의 신청자 목록 조회
 * @param {number} loanId - 대출 상품 ID
 * @param {string} status - 조회할 상태
 * @param {string} token - 인증 토큰
 * @returns {Promise<Array>} 신청자 목록
 */
export const getLoanApplicants = (loanId, status, token) => {
    return axios.get(`/user-loan/loan/${loanId}/applications`, {
        params: { status: status === 'ALL' ? null : status },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

/**
 * 특정 사용자 상세 정보 조회
 * @param {number} userId - 사용자 ID
 * @param {string} token - 인증 토큰
 * @returns {Promise<Object>} 사용자 상세 정보
 */
export const getUserDetails = (userId, token) => {
    return axios.get(`/user-loan/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
