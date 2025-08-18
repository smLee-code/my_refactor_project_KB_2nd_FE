<template>
    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">이름</label>
                        <div v-if="!editMode">
                            <p class="text-lg text-gray-900">{{ userInfo.username || '...' }}</p>
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
                            <p class="text-lg text-gray-900">{{ userInfo.nickname || '...' }}</p>
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
                        <p class="text-lg text-gray-900">{{ userInfo.email || '...' }}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-6">
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">전화번호</label>
                        <div v-if="!editMode">
                            <p class="text-lg text-gray-900">{{ userInfo.phoneNumber || '...' }}</p>
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
                                    ? new Date(userInfo.createAt).toLocaleDateString('ko-KR')
                                    : '...'
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
                                    >{{ keyword.name || keyword }}</span
                                >
                            </div>
                            <div v-else class="text-gray-500 text-sm">
                                설정된 관심 키워드가 없습니다.
                            </div>
                        </div>
                        <div v-else class="space-y-3">
                            <p class="text-sm text-gray-600">
                                관심 있는 키워드를 3개 선택해주세요. ({{
                                    editForm.selectedKeywordIds.length
                                }}/3)
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
    userInfo: { type: Object, required: true },
    loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:userInfo', 'update-completed'])

const editMode = ref(false)
const availableKeywords = ref([])
const editForm = reactive({
    username: '',
    nickname: '',
    phoneNumber: '',
    selectedKeywordIds: [],
})

const modalState = reactive({
    show: false,
    type: 'success',
    title: '',
    message: '',
})

const loadAvailableKeywords = async () => {
    try {
        availableKeywords.value = await getMyKeywords()
    } catch (err) {
        console.error('키워드 로드 실패:', err)
        availableKeywords.value = [
            { keywordId: 1, name: '기술' },
            { keywordId: 2, name: '환경' },
            { keywordId: 3, name: '문화' },
        ]
    }
}

watch(
    () => props.userInfo,
    (newUserInfo) => {
        if (newUserInfo) {
            editForm.username = newUserInfo.username || ''
            editForm.nickname = newUserInfo.nickname || ''
            editForm.phoneNumber = newUserInfo.phoneNumber || ''
            editForm.selectedKeywordIds = (newUserInfo.keywords || [])
                .map((k) => k.keywordId)
                .filter((id) => id)
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
        editForm.selectedKeywordIds = (props.userInfo.keywords || [])
            .map((k) => k.keywordId)
            .filter((id) => id)
    }
    editMode.value = !editMode.value
}

const toggleKeyword = (keywordId) => {
    const index = editForm.selectedKeywordIds.indexOf(keywordId)
    if (index > -1) {
        editForm.selectedKeywordIds.splice(index, 1)
    } else if (editForm.selectedKeywordIds.length < 3) {
        editForm.selectedKeywordIds.push(keywordId)
    }
}

const updateUserInfo = async () => {
    try {
        await updateAccountInfo({
            username: editForm.username,
            nickname: editForm.nickname,
            phoneNumber: editForm.phoneNumber,
        })

        await updateMyKeywords(editForm.selectedKeywordIds, availableKeywords.value)

        const updatedUserInfo = {
            ...props.userInfo,
            username: editForm.username,
            nickname: editForm.nickname,
            phoneNumber: editForm.phoneNumber,
            keywords: editForm.selectedKeywordIds.map((id) =>
                availableKeywords.value.find((k) => k.keywordId === id),
            ),
        }

        emit('update:userInfo', updatedUserInfo)
        emit('update-completed')
        editMode.value = false

        modalState.show = true
        modalState.type = 'success'
        modalState.title = '수정 완료'
        modalState.message = '개인정보가 성공적으로 수정되었습니다.'
    } catch (err) {
        console.error('개인정보 수정 실패:', err)
        modalState.show = true
        modalState.type = 'error'
        modalState.title = '수정 실패'
        modalState.message = err.response?.data?.error || '개인정보 수정에 실패했습니다.'
    }
}

onMounted(loadAvailableKeywords)
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
