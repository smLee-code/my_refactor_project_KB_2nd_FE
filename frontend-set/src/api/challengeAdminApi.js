import api from '.'

/**
 * 챌린지 참여자 목록 조회
 * @param {number} fundId - 펀딩 ID
 * @param {string} token - 인증 토큰
 * @returns {Promise<Array>} 챌린지 참여자 목록
 */
export const getChallengeParticipants = (fundId, token) => {
    return api.get(`/admin/challenge/${fundId}/participants`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

/**
 * 특정 참여자의 인증 기록 조회 (+상태 필터링)
 * @param {number} userChallengeId - 유저 챌린지 ID
 * @param {string} status - 상태
 * @param {string} token - 인증 토큰
 * @returns {Promise<Array>} 특정 참여자 챌린지 기록 리스트
 */
export const getParticipantLogs = (userChallengeId, status, token) => {
    return api.get(`/admin/challenge/logs/${userChallengeId}`, {
        params: { status: status === 'ALL' ? null : status },
        headers: { Authorization: `Bearer ${token}` },
    })
}

/**
 * 인증 기록 수동 승인
 * @param {number} logId - 인증 기록 ID
 * @param {string} token - 인증 토큰
 * @returns {string} 서버 응답 메시지
 */
export const manuallyApproveLog = (logId, token) => {
    return api.patch(
        `/admin/challenge/logs/${logId}/approve`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    )
}

/**
 * 인증 기록 수동 반려
 * @param {number} logId - 인증 기록 ID
 * @param {string} token - 인증 토큰
 * @returns {string} 서버 응답 메시지
 */
export const manuallyRejectLog = (logId, token) => {
    return api.patch(
        `/admin/challenge/logs/${logId}/reject`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    )
}

/**
 * 유저 챌린지 정보 조회
 * @param {number} userChallengeId - 유저 챌린지 ID
 * @param {string} token - 인증 토큰
 * @returns
 */
export const getChallengeInfo = (userChallengeId, token) => {
    return api.get(`/challenge/info/${userChallengeId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}
