import api from '@/api'

const BASE_URL = '/comment'

// 댓글 목록 조회
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

// 댓글 작성
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

// 댓글 삭제
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
