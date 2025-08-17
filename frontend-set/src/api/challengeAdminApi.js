import axios from 'axios'
import api from '.'

// 챌린지 참여자 목록 조회
export const getChallengeParticipants = (fundId, token) => {
    return api.get(`/admin/challenge/${fundId}/participants`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

// 특정 참여자의 인증 기록 조회 (+상태 필터링)
export const getParticipantLogs = (userChallengeId, status, token) => {
    return api.get(`/admin/challenge/logs/${userChallengeId}`, {
        params: { status: status === 'ALL' ? null : status },
        headers: { Authorization: `Bearer ${token}` },
    })
}

// 인증 기록 수동 승인
export const manuallyApproveLog = (logId, token) => {
    return api.patch(
        `/admin/challenge/logs/${logId}/approve`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    )
}

// 인증 기록 수동 반려
export const manuallyRejectLog = (logId, token) => {
    return axios.patch(
        `/admin/challenge/logs/${logId}/reject`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    )
}
