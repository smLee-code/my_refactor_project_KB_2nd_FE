import api from '@/api'

const BASE_URL = '/comment'

/**
 * 댓글 목록 조회
 * @param {string} targetType - 타겟 타입 (펀딩, 프로젝트)
 * @param {number} targetId - 타겟 ID (펀딩 ID 또는 프로젝트 ID)
 * @returns {Promise<Array>} 댓글 목록
 */
export const getComments = async (targetType, targetId) => {
    try {
        const response = await api.get(`${BASE_URL}`, {
            params: {
                targetType: targetType,
                targetId: targetId,
            },
        })
        return response.data
    } catch (error) {
        console.error('댓글 목록 조회 실패:', error)
        throw error
    }
}

/**
 * 댓글 작성
 * @param {string} content - 댓글 내용
 * @param {string} targetType - 타겟 타입 (펀딩, 프로젝트)
 * @param {number} targetId - 타겟 ID (펀딩 ID 또는 프로젝트 ID)
 * @returns {Promise<Objcet>} 작성한 댓글 정보
 */
export const addComment = async (content, targetType, targetId) => {
    try {
        const response = await api.post(`${BASE_URL}`, {
            content: content,
            targetType: targetType,
            targetId: targetId,
        })
        return response.data
    } catch (error) {
        console.error('댓글 작성 실패:', error)
        throw error
    }
}

/**
 * 댓글 삭제
 * @param {number} commentId - 댓글 ID
 */
export const deleteComment = async (commentId) => {
    try {
        await api.delete(`${BASE_URL}`, {
            params: {
                commentId: commentId,
            },
        })
    } catch (error) {
        console.error('댓글 삭제 실패:', error)
        throw error
    }
}
