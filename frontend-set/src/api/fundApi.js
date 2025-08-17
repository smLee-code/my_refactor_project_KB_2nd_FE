import axios from 'axios'
import api from '.'

/**
 * 내가 생성한 '대출(Loan)' 타입 펀딩 목록 조회
 * @param {string} token - 인증 토큰
 */
export const getMyCreatedLoans = (token) => {
    return api.get('/fund/my/fund/all?fundType=Loan', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

/**
 * 내가 생성한 '챌린지(Challenge)' 타입 펀딩 목록 조회
 * @param {string} token - 인증 토큰
 */
export const getMyCreatedChallenges = (token) => {
    // 기존 API를 재활용하여 fundType으로 필터링
    return api.get('/fund/my/fund/all?fundType=Challenge', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
