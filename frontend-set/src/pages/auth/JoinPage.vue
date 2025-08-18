<template>
    <div>
        <Teleport to="body">
            <ToastNotification
                :show="toast.show"
                :message="toast.message"
                :type="toast.type"
                @close="toast.show = false"
            />
        </Teleport>

        <div class="w-full min-h-screen py-8 px-4">
            <div
                class="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
            >
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
                    <p class="text-gray-600">Fund:ing에 오신 것을 환영합니다</p>
                </div>
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >이름 <span class="text-red-500">*</span></label
                            >
                            <input
                                v-model="form.username"
                                type="text"
                                placeholder="이름을 입력해주세요"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                :class="{ 'border-red-500': errors.username }"
                            />
                            <p v-if="errors.username" class="text-red-500 text-xs mt-1">
                                {{ errors.username }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >닉네임 <span class="text-red-500">*</span></label
                            >
                            <div class="flex gap-2">
                                <input
                                    v-model="form.nickname"
                                    type="text"
                                    placeholder="닉네임을 입력해주세요"
                                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                    :class="{ 'border-red-500': errors.nickname }"
                                />
                            </div>
                            <p v-if="errors.nickname" class="text-red-500 text-xs mt-1">
                                {{ errors.nickname }}
                            </p>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >이메일 <span class="text-red-500">*</span></label
                            >
                            <div class="flex gap-2">
                                <input
                                    v-model="form.email"
                                    type="email"
                                    placeholder="이메일을 입력해주세요"
                                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                    :class="{ 'border-red-500': errors.email }"
                                />
                                <button
                                    type="button"
                                    @click="sendVerification"
                                    :disabled="isVerificationSent"
                                    class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer"
                                    :class="{ 'opacity-50 cursor-not-allowed': isVerificationSent }"
                                >
                                    {{ isVerificationSent ? '인증코드 발송됨' : '인증하기' }}
                                </button>
                            </div>
                            <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                                {{ errors.email }}
                            </p>
                        </div>
                        <div v-if="isVerificationSent" class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >인증코드</label
                            >
                            <div class="flex gap-2">
                                <input
                                    v-model="form.verificationCode"
                                    type="text"
                                    placeholder="인증코드 6자리를 입력해주세요"
                                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                />
                                <button
                                    type="button"
                                    @click="verifyCode"
                                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >전화번호 <span class="text-red-500">*</span></label
                            >
                            <input
                                v-model="form.phoneNumber"
                                type="text"
                                placeholder="전화번호를 입력해주세요"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                :class="{ 'border-red-500': errors.phoneNumber }"
                            />
                            <p v-if="errors.phoneNumber" class="text-red-500 text-xs mt-1">
                                {{ errors.phoneNumber }}
                            </p>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >비밀번호 <span class="text-red-500">*</span></label
                            >
                            <div class="relative">
                                <input
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="비밀번호를 입력해주세요"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                    :class="{ 'border-red-500': errors.password }"
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <i
                                        :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                        class="text-sm"
                                    ></i>
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">
                                영문, 숫자, 특수문자 포함 8자 이상
                            </p>
                            <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                                {{ errors.password }}
                            </p>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2"
                                >비밀번호 확인 <span class="text-red-500">*</span></label
                            >
                            <div class="relative">
                                <input
                                    v-model="form.passwordConfirm"
                                    :type="showPasswordConfirm ? 'text' : 'password'"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                                    :class="{ 'border-red-500': errors.passwordConfirm }"
                                />
                                <button
                                    type="button"
                                    @click="showPasswordConfirm = !showPasswordConfirm"
                                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <i
                                        :class="
                                            showPasswordConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'
                                        "
                                        class="text-sm"
                                    ></i>
                                </button>
                            </div>
                            <p v-if="errors.passwordConfirm" class="text-red-500 text-xs mt-1">
                                {{ errors.passwordConfirm }}
                            </p>
                        </div>
                    </div>
                    <div class="space-y-4 mt-8">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-medium text-gray-900">
                                관심사 키워드 <span class="text-red-500">*</span>
                            </h3>
                            <span class="text-sm text-gray-600"
                                >{{ form.selectedKeywordIds.length }}/3 선택됨</span
                            >
                        </div>
                        <p class="text-sm text-gray-600">관심 있는 키워드를 3개 선택해주세요.</p>
                        <div class="flex flex-wrap gap-2">
                            <button
                                type="button"
                                v-for="keyword in keywords"
                                :key="keyword.keywordId"
                                @click="toggleKeyword(keyword.keywordId)"
                                :class="{
                                    'bg-blue-100 text-blue-800 border-blue-300':
                                        form.selectedKeywordIds.includes(keyword.keywordId),
                                    'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300':
                                        !form.selectedKeywordIds.includes(keyword.keywordId),
                                    'cursor-not-allowed opacity-50':
                                        !form.selectedKeywordIds.includes(keyword.keywordId) &&
                                        form.selectedKeywordIds.length >= 3,
                                }"
                                class="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 !rounded-button whitespace-nowrap"
                                :disabled="
                                    !form.selectedKeywordIds.includes(keyword.keywordId) &&
                                    form.selectedKeywordIds.length >= 3
                                "
                            >
                                {{ keyword.name }}
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            v-model="form.termsAccepted"
                            class="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <label for="terms" class="text-sm text-gray-600 cursor-pointer"
                            >이용약관 및 개인정보처리방침에 동의합니다</label
                        >
                    </div>
                    <button
                        type="submit"
                        :disabled="!isFormValid || isLoading"
                        class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                    >
                        <span v-if="isLoading" class="flex items-center justify-center"
                            ><i class="fas fa-spinner fa-spin mr-2"></i>처리중...</span
                        >
                        <span v-else>회원가입</span>
                    </button>
                    <div class="text-center">
                        <span class="text-sm text-gray-600">이미 계정이 있으신가요?</span>
                        <a
                            href="/auth/login"
                            class="text-blue-600 hover:text-blue-800 ml-1 cursor-pointer"
                            >로그인</a
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue' // watchEffect 대신 watch 사용
import axios from 'axios'
import ToastNotification from '@/components/common/ToastNotification.vue'

const router = useRouter()

const form = ref({
    username: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    verificationCode: '',
    selectedKeywordIds: [] as number[],
    termsAccepted: false,
})

const keywords = ref<Array<{ keywordId: number; name: string }>>([]) // 타입 명시

const toggleKeyword = (keywordId: number) => {
    if (form.value.selectedKeywordIds.includes(keywordId)) {
        form.value.selectedKeywordIds = form.value.selectedKeywordIds.filter((k) => k !== keywordId)
    } else if (form.value.selectedKeywordIds.length < 3) {
        form.value.selectedKeywordIds.push(keywordId)
    }
}

const errors = ref({
    username: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
})

const isLoading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const isVerificationSent = ref(false)

const toast = ref({
    show: false,
    message: '',
    type: 'success',
})

// 3. showToast 함수를 setTimeout 없이 간단하게 수정
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toast.value = { show: true, message, type }
}

const isEmailVerified = ref(false) // 이메일 인증 완료 상태 추가

// isFormValid 계산 속성 수정
const isFormValid = computed(() => {
    return (
        !errors.value.username &&
        !errors.value.nickname &&
        !errors.value.email &&
        !errors.value.password &&
        !errors.value.passwordConfirm &&
        !errors.value.phoneNumber &&
        form.value.selectedKeywordIds.length === 3 &&
        isEmailVerified.value && // 이메일 인증 여부 확인
        form.value.termsAccepted
    )
})

const validateField = (field: keyof typeof errors.value) => {
    switch (field) {
        case 'username':
            errors.value.username = !form.value.username
                ? '이름을 입력해주세요'
                : !/^[가-힣a-zA-Z]{2,20}$/.test(form.value.username)
                  ? '이름은 2~20자 이내 한글 및 영문 대소문자만 가능합니다.'
                  : ''
            break
        case 'nickname':
            errors.value.nickname = !form.value.nickname
                ? '닉네임을 입력해주세요'
                : !/^[가-힣a-zA-Z0-9]{2,15}$/.test(form.value.nickname)
                  ? '닉네임은 2~15자 이내 한글 및 영문 대소문자, 숫자만 가능합니다.'
                  : ''
            break
        case 'email':
            errors.value.email = !form.value.email
                ? '이메일을 입력해주세요'
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
                  ? '이메일 형식이 올바르지 않습니다.'
                  : ''
            break
        case 'phoneNumber':
            errors.value.phoneNumber = !form.value.phoneNumber
                ? '전화번호를 입력해주세요'
                : !/^\d{3}-\d{4}-\d{4}$/.test(form.value.phoneNumber)
                  ? '전화번호 형식이 올바르지 않습니다. (010-1234-5678)'
                  : ''
            break
        case 'password':
            errors.value.password = !form.value.password
                ? '비밀번호를 입력해주세요'
                : !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(form.value.password)
                  ? '영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.'
                  : ''
            if (!errors.value.password && form.value.passwordConfirm) {
                errors.value.passwordConfirm =
                    form.value.password !== form.value.passwordConfirm
                        ? '비밀번호가 일치하지 않습니다.'
                        : ''
            }
            break
        case 'passwordConfirm':
            errors.value.passwordConfirm = !form.value.passwordConfirm
                ? '비밀번호를 다시 입력해주세요'
                : form.value.password !== form.value.passwordConfirm
                  ? '비밀번호가 일치하지 않습니다.'
                  : ''
            break
    }
}

watch(
    () => form.value.username,
    () => validateField('username'),
)
watch(
    () => form.value.nickname,
    () => validateField('nickname'),
)
watch(
    () => form.value.email,
    () => validateField('email'),
)
watch(
    () => form.value.phoneNumber,
    () => validateField('phoneNumber'),
)
watch(
    () => form.value.password,
    () => validateField('password'),
)
watch(
    () => form.value.passwordConfirm,
    () => validateField('passwordConfirm'),
)

const sendVerification = async () => {
    validateField('email')
    if (errors.value.email) return

    try {
        await axios.get(`/member/duplicated/email?email=${form.value.email}`)
        // 중복되지 않았을 때 (API가 에러를 던지지 않았을 때) 계속 진행
    } catch (err) {
        showToast('이미 사용 중인 이메일입니다.', 'error')
        console.error('이메일 중복:', err)
        return
    }

    try {
        await axios.post(`/mail/send?email=${form.value.email}`)
        isVerificationSent.value = true
        showToast('인증번호가 발송되었습니다', 'success')
    } catch (err) {
        showToast('인증번호 발송에 실패했습니다.', 'error')
        console.error('인증번호 발송 실패:', err)
    }
}

const verifyCode = async () => {
    if (!form.value.verificationCode) {
        showToast('인증코드를 입력해주세요.', 'error')
        return
    }

    try {
        await axios.post(
            `/mail/verify?email=${form.value.email}&code=${form.value.verificationCode}`,
        )
        isVerificationSent.value = false
        isEmailVerified.value = true // 인증 성공 상태 업데이트
        showToast('이메일 인증이 완료되었습니다.', 'success')
    } catch (err) {
        isEmailVerified.value = false
        showToast('인증번호가 올바르지 않습니다.', 'error')
        console.error('이메일 인증 실패:', err)
    }
}

const handleSubmit = async (event: Event) => {
    if (!isFormValid.value) {
        console.log('폼이 유효하지 않습니다.')
        showToast('입력 양식을 모두 올바르게 채워주세요.', 'error')
        return
    }
    isLoading.value = true
    try {
        const signupForm = {
            email: form.value.email,
            password: form.value.password,
            nickname: form.value.nickname,
            username: form.value.username,
            phoneNumber: form.value.phoneNumber,
            keywordIds: form.value.selectedKeywordIds,
        }
        await axios.post('/member/signup', signupForm)
        showToast('회원가입이 완료되었습니다!', 'success')
        setTimeout(() => router.push('/auth/login'), 2000)
    } catch (error) {
        console.error('회원가입 실패:', error)
        showToast(error.response?.data?.message || '회원가입에 실패했습니다.', 'error')
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    try {
        const res = await axios.get('/keyword')
        keywords.value = res.data
    } catch (err) {
        console.error('키워드 불러오기 실패:', err)
        showToast('키워드 목록을 불러오는데 실패했습니다.', 'error')
    }
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    -moz-appearance: textfield;
}
@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
</style>
