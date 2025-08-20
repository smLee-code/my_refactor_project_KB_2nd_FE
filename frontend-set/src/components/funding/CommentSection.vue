<template>
    <section class="mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900">참여자 피드백</h3>
                <span class="text-sm text-gray-600">총 {{ comments.length }}개의 댓글</span>
            </div>

            <!-- 로딩 상태 -->
            <div v-if="isLoading" class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span class="ml-3 text-gray-600">댓글을 불러오는 중...</span>
            </div>

            <!-- 댓글 목록 -->
            <div v-else class="space-y-4 mb-6">
                <div
                    v-for="comment in comments"
                    :key="comment.commentId"
                    class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                >
                    <div
                        class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                        <i class="fas fa-user text-white text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <div class="flex items-center space-x-2">
                                <span class="font-medium text-gray-900"
                                    >사용자 {{ comment.userId }}</span
                                >
                                <span class="text-xs text-gray-500">{{
                                    formatDate(comment.createAt)
                                }}</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-700">{{ comment.content }}</p>
                    </div>
                </div>

                <!-- 댓글이 없는 경우 -->
                <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
                    <i class="fas fa-comment-slash text-2xl mb-2"></i>
                    <p>아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
                </div>
            </div>

            <!-- 댓글 작성 폼 -->
            <div class="border-t pt-4">
                <div class="flex items-center space-x-3">
                    <div
                        class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                        <i class="fas fa-user text-gray-600 text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <input
                            v-model="newComment"
                            type="text"
                            placeholder="댓글을 입력하세요..."
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                            @keyup.enter="submitComment"
                            :disabled="isSubmitting"
                        />
                    </div>
                    <button
                        @click="submitComment"
                        class="bg-yellow-400 text-gray-900 px-4 py-2 !rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="!newComment.trim() || isSubmitting"
                    >
                        <span v-if="isSubmitting">등록 중...</span>
                        <span v-else>등록</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getComments, addComment, deleteComment } from '@/api/commentApi'
// import { useAuthStore } from '@/stores/auth' // 백엔드 수정 후 활성화 예정

// Props 정의
// @param {string} targetType - 댓글 대상 타입 (Funding, Project)
// @param {number} targetId - 댓글 대상 ID

const props = defineProps({
    targetType: {
        type: String,
        required: true,
        validator: (value) => ['Funding', 'Project'].includes(value),
    },
    targetId: {
        type: Number,
        required: true,
    },
})

// 상태 관리
const comments = ref([])
const newComment = ref('')
const isLoading = ref(true)
const isSubmitting = ref(false)
// const isDeleting = ref(false) // 백엔드 수정 후 활성화 예정

// const authStore = useAuthStore() // 백엔드 수정 후 활성화 예정

// 댓글 목록 조회
const fetchComments = async () => {
    try {
        isLoading.value = true
        console.log('댓글 목록 조회 요청:', {
            targetType: props.targetType,
            targetId: props.targetId,
        })
        const data = await getComments(props.targetType, props.targetId)
        comments.value = data
        console.log('댓글 목록:', data)
    } catch (error) {
        console.error('댓글 목록 조회 실패:', error)
        console.error('에러 상세:', error.response?.data)
        console.error('에러 상태:', error.response?.status)
        comments.value = []
    } finally {
        isLoading.value = false
    }
}

// 댓글 작성
const submitComment = async () => {
    if (!newComment.value.trim() || isSubmitting.value) return

    try {
        isSubmitting.value = true
        console.log('댓글 작성 요청:', {
            content: newComment.value,
            targetType: props.targetType,
            targetId: props.targetId,
        })
        await addComment(newComment.value, props.targetType, props.targetId)
        newComment.value = ''
        await fetchComments() // 댓글 목록 새로고침
        console.log('댓글 작성 완료')
    } catch (error) {
        console.error('댓글 작성 실패:', error)
        console.error('에러 상세:', error.response?.data)
        console.error('에러 상태:', error.response?.status)

        // 500 에러인 경우 댓글이 실제로 저장되었을 수 있으므로 목록을 다시 불러와서 확인
        if (error.response?.status === 500) {
            console.log('500 에러 발생. 댓글 목록을 다시 불러와서 확인합니다.')
            await fetchComments()

            // 댓글 목록에 새 댓글이 있는지 확인
            const hasNewComment = comments.value.some(
                (comment) => comment.content === newComment.value,
            )

            if (hasNewComment) {
                console.log('댓글이 성공적으로 저장되었습니다.')
                newComment.value = ''
                // 성공 메시지는 표시하지 않음 (사용자가 혼란스러워할 수 있으므로)
            } else {
                alert('댓글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.')
            }
        } else {
            alert(`댓글 작성에 실패했습니다. (${error.response?.status || '알 수 없는 오류'})`)
        }
    } finally {
        isSubmitting.value = false
    }
}

// 댓글 삭제 (백엔드 수정 후 활성화 예정)
/*
const deleteCommentHandler = async (commentId) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return

    try {
        isDeleting.value = true
        await deleteComment(commentId)
        await fetchComments() // 댓글 목록 새로고침
        console.log('댓글 삭제 완료')
    } catch (error) {
        console.error('댓글 삭제 실패:', error)
        console.error('에러 상세:', error.response?.data)
        console.error('에러 상태:', error.response?.status)

        // 500 에러인 경우 삭제가 실제로 되었을 수 있으므로 목록을 다시 불러와서 확인
        if (error.response?.status === 500) {
            console.log('500 에러 발생. 댓글 목록을 다시 불러와서 확인합니다.')
            await fetchComments()
            console.log('댓글 목록 새로고침 완료')
        } else {
            alert('댓글 삭제에 실패했습니다.')
        }
    } finally {
        isDeleting.value = false
    }
}
*/

// 본인 댓글인지 확인 (백엔드 수정 후 활성화 예정)
/*
const isMyComment = (commentUserId) => {
    // 임시로 테스트용 userId 사용 (실제로는 authStore.userId를 사용해야 함)
    const currentUserId = authStore.userId || 1 // 테스트용으로 userId 1 사용
    console.log('현재 사용자 ID:', currentUserId, '댓글 작성자 ID:', commentUserId)
    return currentUserId === commentUserId
}
*/

// 날짜 포맷팅
const formatDate = (dateString) => {
    if (!dateString) return ''

    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now - date
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffTime / (1000 * 60))

    if (diffDays > 0) {
        return `${diffDays}일 전`
    } else if (diffHours > 0) {
        return `${diffHours}시간 전`
    } else if (diffMinutes > 0) {
        return `${diffMinutes}분 전`
    } else {
        return '방금 전'
    }
}

onMounted(() => {
    // userId 로드 (백엔드 수정 후 활성화 예정)
    // authStore.loadUserId()
    fetchComments()
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
