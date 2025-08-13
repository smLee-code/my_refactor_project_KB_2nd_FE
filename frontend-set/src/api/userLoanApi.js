import axios from 'axios'

// 대출 승인 (관리자용)
export const approveLoan = (userLoanId, token) => {
    const requestBody = {
        type: 'APPROVE',
        userLoanId,
    }
    return axios.patch('/user-loan/approve', requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

// 대출 반려 (관리자용)
export const rejectLoan = (userLoanId, token) => {
    const requestBody = {
        type: 'REJECT',
        userLoanId,
    }
    return axios.patch('/user-loan/reject', requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

// 대출 지급 (관리자용)
export const processLoanPayment = (userLoanId, token) => {
    const requestBody = {
        type: 'DONE',
        userLoanId,
    }
    return axios.patch('/user-loan/payment', requestBody, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
