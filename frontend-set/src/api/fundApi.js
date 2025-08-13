import axios from 'axios'

/**
 * 내가 생성한 '대출(Loan)' 타입 펀딩 목록 조회
 * @param {string} token - 인증 토큰
 */
export const getMyCreatedLoans = (token) => {
    return axios.get('/fund/my/fund/all?fundType=Loan', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
