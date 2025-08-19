import api from '@/api'

/**
 * 이전 채팅 내역 (메시지) 조회
 * @param {number} projectId - 프로젝트 ID
 * @returns {Promise<Array>} 채팅 내역
 */
export const getChatHistory = async (projectId) => {
    try {
        const res = await api.get(`/chat/history/${projectId}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        const chatHistory = res.data

        console.log('✅ chatHistory:', chatHistory)

        return chatHistory
    } catch (error) {
        console.error(' 조회 실패:', error)
        throw error
    }
}
