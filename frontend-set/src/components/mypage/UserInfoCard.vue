<template>
    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
                <div class="flex items-center space-x-4">
                    <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
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
                    <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
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
                    <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
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
                    <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
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
                    <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">가입일</label>
                        <p class="text-lg text-gray-900">
                            {{
                                userInfo.createAt
                                    ? new Date(userInfo.createAt).toLocaleDateString('ko-KR')
                                    : '로딩 중...'
                            }}
                        </p>
                    </div>
                </div>
                <div class="flex items-start space-x-4">
                    <div class="w-4 h-4 bg-gray-400 rounded-full mt-1"></div>
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
                                    :key="keyword"
                                    class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {{ keyword }}
                                </span>
                            </div>
                            <div v-else class="text-gray-500 text-sm">
                                설정된 관심 키워드가 없습니다.
                            </div>
                        </div>
                        <div v-else class="space-y-3">
                            <!-- 키워드 입력 -->
                            <div class="flex space-x-2">
                                <input
                                    v-model="newKeyword"
                                    @keyup.enter="addKeyword"
                                    type="text"
                                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    placeholder="키워드를 입력하세요"
                                />
                                <button
                                    @click="addKeyword"
                                    :disabled="!newKeyword.trim()"
                                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    추가
                                </button>
                            </div>
                            <!-- 키워드 목록 -->
                            <div class="flex flex-wrap gap-2">
                                <div
                                    v-for="(keyword, index) in editForm.keywords"
                                    :key="index"
                                    class="bg-yellow-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                                >
                                    <span>{{ keyword }}</span>
                                    <button
                                        @click="removeKeyword(index)"
                                        class="text-red-500 hover:text-red-700 ml-1"
                                    >
                                        <i class="fas fa-times text-xs"></i>
                                    </button>
                                </div>
                            </div>
                            <div
                                v-if="editForm.keywords.length === 0"
                                class="text-gray-500 text-sm"
                            >
                                키워드를 추가해주세요.
                            </div>
                        </div>
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
import { ref, reactive, watch } from 'vue'
import { updateAccountInfo, updateMyKeywords } from '@/api/mypageApi'

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

const emit = defineEmits(['update:userInfo'])

const editMode = ref(false)
const newKeyword = ref('')
const editForm = reactive({
    username: '',
    nickname: '',
    phoneNumber: '',
    keywords: [],
})

// 사용자 정보가 변경될 때 수정 폼 초기화
watch(
    () => props.userInfo,
    (newUserInfo) => {
        if (newUserInfo) {
            editForm.username = newUserInfo.username || ''
            editForm.nickname = newUserInfo.nickname || ''
            editForm.phoneNumber = newUserInfo.phoneNumber || ''
            editForm.keywords = [...(newUserInfo.keywords || [])]
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
        newKeyword.value = ''
    }
    editMode.value = !editMode.value
}

const addKeyword = () => {
    const keyword = newKeyword.value.trim()
    if (keyword && !editForm.keywords.includes(keyword)) {
        editForm.keywords.push(keyword)
        newKeyword.value = ''
    }
}

const removeKeyword = (index) => {
    editForm.keywords.splice(index, 1)
}

const updateUserInfo = async () => {
    try {
        // 키워드가 변경된 경우 별도로 업데이트
        if (JSON.stringify(editForm.keywords) !== JSON.stringify(props.userInfo.keywords || [])) {
            await updateMyKeywords(editForm.keywords)
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
            keywords: editForm.keywords,
        }
        emit('update:userInfo', updatedUserInfo)

        editMode.value = false
        alert('개인정보가 성공적으로 수정되었습니다.')
    } catch (err) {
        console.error('개인정보 수정 실패:', err)
        alert(err.response?.data?.error || '개인정보 수정에 실패했습니다.')
    }
}
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
