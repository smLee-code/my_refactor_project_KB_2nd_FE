import api from '.'

/**
 * 대출 승인 (관리자용)
 * @param {number} userLoanId - 유저 대출 ID
 * @param {string} token - 인증 토큰
 * @returns
 */
export const approveLoan = (userLoanId, token) => {
    const requestBody = {
        type: 'APPROVED',
        userLoanId,
    }
    return api.patch('/user-loan/approve', requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

/**
 * 대출 반려 (관리자용)
 * @param {number} userLoanId - 유저 대출 ID
 * @param {string} token - 인증 토큰
 * @returns
 */
export const rejectLoan = (userLoanId, token) => {
    const requestBody = {
        type: 'REJECTED',
        userLoanId,
    }
    return api.patch('/user-loan/reject', requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

/**
 * 대출 지급 (관리자용)
 * @param {number} userLoanId - 유저 대출 ID
 * @param {string} token - 인증 토큰
 * @returns
 */
export const processLoanPayment = (userLoanId, token) => {
    const requestBody = {
        type: 'DONE',
        userLoanId,
    }
    return api.patch('/user-loan/payment', requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
