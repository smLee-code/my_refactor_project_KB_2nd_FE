<template>
    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">이름</label>
                        <div v-if="!editMode">
                            <p class="text-lg text-gray-900">
                                {{ userInfo.username || '로딩 중...' }}
                            </p>
                        </div>
                        <div v-else>
                            <input
                                v-model="editForm.username"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="이름을 입력하세요"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">닉네임</label>
                        <div v-if="!editMode">
                            <p class="text-lg text-gray-900">
                                {{ userInfo.nickname || '로딩 중...' }}
                            </p>
                        </div>
                        <div v-else>
                            <input
                                v-model="editForm.nickname"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="닉네임을 입력하세요"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                        <p class="text-lg text-gray-900">
                            {{ userInfo.email || '로딩 중...' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="space-y-6">
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">전화번호</label>
                        <div v-if="!editMode">
                            <p class="text-lg text-gray-900">
                                {{ userInfo.phoneNumber || '로딩 중...' }}
                            </p>
                        </div>
                        <div v-else>
                            <input
                                v-model="editForm.phoneNumber"
                                type="tel"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                placeholder="전화번호를 입력하세요"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">가입일</label>
                        <p class="text-lg text-gray-900">
                            {{
                                userInfo.createAt
                                    ? (() => {
                                          try {
                                              const date = new Date(userInfo.createAt)
                                              return isNaN(date.getTime())
                                                  ? '날짜 정보 없음'
                                                  : date.toLocaleDateString('ko-KR')
                                          } catch (err) {
                                              return '날짜 정보 없음'
                                          }
                                      })()
                                    : '로딩 중...'
                            }}
                        </p>
                    </div>
                </div>
                <div class="flex items-start space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full mt-1"></div>
                    <div class="w-full">
                        <label class="block text-sm font-medium text-gray-600 mb-3"
                            >관심 키워드</label
                        >
                        <div v-if="!editMode">
                            <div
                                v-if="userInfo.keywords && userInfo.keywords.length > 0"
                                class="flex flex-wrap gap-2"
                            >
                                <span
                                    v-for="keyword in userInfo.keywords"
                                    :key="keyword.keywordId || keyword"
                                    class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {{ keyword.name || keyword }}
                                </span>
                            </div>
                            <div v-else class="text-gray-500 text-sm">
                                설정된 관심 키워드가 없습니다.
                            </div>
                        </div>
                        <div v-else class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600"
                                    >{{ editForm.selectedKeywordIds.length }}/3 선택됨</span
                                >
                            </div>
                            <p class="text-sm text-gray-600">
                                관심 있는 키워드를 3개 선택해주세요.
                            </p>
                            <div class="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    v-for="keyword in availableKeywords"
                                    :key="keyword.keywordId"
                                    @click="toggleKeyword(keyword.keywordId)"
                                    :class="{
                                        'bg-blue-100 text-blue-800 border-blue-300':
                                            editForm.selectedKeywordIds.includes(keyword.keywordId),
                                        'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300':
                                            !editForm.selectedKeywordIds.includes(
                                                keyword.keywordId,
                                            ),
                                        'cursor-not-allowed opacity-50':
                                            !editForm.selectedKeywordIds.includes(
                                                keyword.keywordId,
                                            ) && editForm.selectedKeywordIds.length >= 3,
                                    }"
                                    class="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 !rounded-button whitespace-nowrap"
                                    :disabled="
                                        !editForm.selectedKeywordIds.includes(keyword.keywordId) &&
                                        editForm.selectedKeywordIds.length >= 3
                                    "
                                >
                                    {{ keyword.name }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 뱃지 섹션 -->
                <div class="flex items-start space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full mt-1"></div>
                    <div class="w-full">
                        <label class="block text-sm font-medium text-gray-600 mb-3"
                            >획득한 뱃지</label
                        >
                        <BadgeDisplay :badges="userInfo.badges || []" />
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-200">
            <div v-if="!editMode">
                <button
                    @click="toggleEditMode"
                    :disabled="loading"
                    class="bg-yellow-400 text-gray-900 px-6 py-3 !rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ loading ? '로딩 중...' : '회원 정보 수정' }}
                </button>
            </div>
            <div v-else class="flex space-x-4">
                <button
                    @click="updateUserInfo"
                    :disabled="loading"
                    class="bg-green-500 text-white px-6 py-3 !rounded-button font-medium hover:bg-green-600 cursor-pointer whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ loading ? '저장 중...' : '저장' }}
                </button>
                <button
                    @click="toggleEditMode"
                    :disabled="loading"
                    class="bg-gray-500 text-white px-6 py-3 !rounded-button font-medium hover:bg-gray-600 cursor-pointer whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    취소
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { updateAccountInfo, updateMyKeywords, getMyKeywords } from '@/api/mypageApi'
import BadgeDisplay from '@/components/common/BadgeDisplay.vue'

const props = defineProps({
    userInfo: {
        type: Object,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['update:userInfo', 'update-completed'])

const editMode = ref(false)
const availableKeywords = ref([])
const editForm = reactive({
    username: '',
    nickname: '',
    phoneNumber: '',
    keywords: [],
    selectedKeywordIds: [],
})

// 사용 가능한 키워드 로드
const loadAvailableKeywords = async () => {
    try {
        const keywords = await getMyKeywords()
        availableKeywords.value = keywords
    } catch (err) {
        console.error('키워드 로드 실패:', err)
        // Mock 데이터로 대체
        availableKeywords.value = [
            { keywordId: 1, name: '기술' },
            { keywordId: 2, name: '환경' },
            { keywordId: 3, name: '문화' },
            { keywordId: 4, name: '교육' },
            { keywordId: 5, name: '건강' },
            { keywordId: 6, name: '여행' },
            { keywordId: 7, name: '음식' },
            { keywordId: 8, name: '스포츠' },
        ]
    }
}

// 사용자 정보가 변경될 때 수정 폼 초기화
watch(
    () => props.userInfo,
    (newUserInfo) => {
        if (newUserInfo) {
            editForm.username = newUserInfo.username || ''
            editForm.nickname = newUserInfo.nickname || ''
            editForm.phoneNumber = newUserInfo.phoneNumber || ''
            editForm.keywords = [...(newUserInfo.keywords || [])]
            // 키워드 ID 추출 로직 개선
            editForm.selectedKeywordIds = (newUserInfo.keywords || [])
                .map((k) => {
                    if (typeof k === 'object' && k.keywordId) {
                        return k.keywordId
                    } else if (typeof k === 'number') {
                        return k
                    } else {
                        return null
                    }
                })
                .filter((id) => id !== null)
        }
    },
    { immediate: true },
)

const toggleEditMode = () => {
    if (editMode.value) {
        // 수정 취소 시 원래 값으로 복원
        editForm.username = props.userInfo.username
        editForm.nickname = props.userInfo.nickname
        editForm.phoneNumber = props.userInfo.phoneNumber
        editForm.keywords = [...(props.userInfo.keywords || [])]
        // 키워드 ID 추출 로직 개선
        editForm.selectedKeywordIds = (props.userInfo.keywords || [])
            .map((k) => {
                if (typeof k === 'object' && k.keywordId) {
                    return k.keywordId
                } else if (typeof k === 'number') {
                    return k
                } else {
                    return null
                }
            })
            .filter((id) => id !== null)
    } else {
        // 수정 모드 진입 시 현재 선택된 키워드들로 초기화
        console.log('수정 모드 진입 - 기존 키워드:', props.userInfo.keywords)
        editForm.selectedKeywordIds = (props.userInfo.keywords || [])
            .map((k) => {
                if (typeof k === 'object' && k.keywordId) {
                    return k.keywordId
                } else if (typeof k === 'number') {
                    return k
                } else {
                    return null
                }
            })
            .filter((id) => id !== null)
        console.log('수정 모드 진입 - 선택된 키워드 ID:', editForm.selectedKeywordIds)
    }
    editMode.value = !editMode.value
}

const toggleKeyword = (keywordId) => {
    console.log(
        '키워드 토글 - keywordId:',
        keywordId,
        '현재 선택된 키워드:',
        editForm.selectedKeywordIds,
    )
    if (editForm.selectedKeywordIds.includes(keywordId)) {
        editForm.selectedKeywordIds = editForm.selectedKeywordIds.filter((id) => id !== keywordId)
        console.log('키워드 해제됨 - 새로운 선택된 키워드:', editForm.selectedKeywordIds)
    } else {
        if (editForm.selectedKeywordIds.length < 3) {
            editForm.selectedKeywordIds.push(keywordId)
            console.log('키워드 선택됨 - 새로운 선택된 키워드:', editForm.selectedKeywordIds)
        } else {
            console.log('최대 3개까지만 선택 가능')
        }
    }
}

const updateUserInfo = async () => {
    try {
        // 키워드가 변경된 경우 별도로 업데이트
        const currentKeywordIds = (props.userInfo.keywords || [])
            .map((k) => {
                if (typeof k === 'object' && k.keywordId) {
                    return k.keywordId
                } else if (typeof k === 'number') {
                    return k
                } else {
                    return null
                }
            })
            .filter((id) => id !== null)

        if (
            JSON.stringify(editForm.selectedKeywordIds.sort()) !==
            JSON.stringify(currentKeywordIds.sort())
        ) {
            await updateMyKeywords(editForm.selectedKeywordIds, availableKeywords.value)
        }

        // 기본 정보 업데이트
        await updateAccountInfo({
            username: editForm.username,
            nickname: editForm.nickname,
            phoneNumber: editForm.phoneNumber,
        })

        // 성공 시 부모 컴포넌트에 업데이트된 정보 전달
        const updatedUserInfo = {
            ...props.userInfo,
            username: editForm.username,
            nickname: editForm.nickname,
            phoneNumber: editForm.phoneNumber,
            keywords: editForm.selectedKeywordIds.map((id) => {
                const keyword = availableKeywords.value.find((k) => k.keywordId === id)
                return keyword || { keywordId: id, name: `키워드 ${id}` }
            }),
        }

        // 부모 컴포넌트에 업데이트된 정보 전달
        emit('update:userInfo', updatedUserInfo)

        // 업데이트 완료 알림
        emit('update-completed')

        // 수정 모드 종료
        editMode.value = false

        // 성공 메시지 표시
        alert('개인정보가 성공적으로 수정되었습니다.')
    } catch (err) {
        console.error('개인정보 수정 실패:', err)
        if (err.response?.status === 401) {
            alert('인증이 만료되었습니다. 다시 로그인해주세요.')
        } else {
            alert(err.response?.data?.error || '개인정보 수정에 실패했습니다.')
        }
    }
}

onMounted(() => {
    loadAvailableKeywords()
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
