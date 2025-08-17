import axios from 'axios'
import api from '.'

// 대출 승인 (관리자용)
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

// 대출 반려 (관리자용)
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

// 대출 지급 (관리자용)
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
