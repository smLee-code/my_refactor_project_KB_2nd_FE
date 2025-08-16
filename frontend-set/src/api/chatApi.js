import api from '@/api'

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
