<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="w-full min-h-screen py-8 px-4">
        <div
            class="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        >
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
                <p class="text-gray-600">Fund:ing에 오신 것을 환영합니다</p>
            </div>
            <form class="space-y-6">
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
                            <!-- <button
                                type="button"
                                @click="checkUsername"
                                class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer"
                            >
                                중복확인
                            </button> -->
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
                                :class="{
                                    'opacity-50 cursor-not-allowed': isVerificationSent,
                                }"
                            >
                                {{ isVerificationSent ? '인증코드 발송됨' : '인증하기' }}
                            </button>
                        </div>
                        <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                            {{ errors.email }}
                        </p>
                    </div>
                    <div v-if="isVerificationSent" class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">인증코드</label>
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
                        <p class="text-xs text-gray-500 mt-1">영문, 숫자, 특수문자 포함 8자 이상</p>
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
                                    :class="showPasswordConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"
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
                    @click="handleSubmit"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                    <span v-if="isLoading" class="flex items-center justify-center">
                        <i class="fas fa-spinner fa-spin mr-2"></i>
                        처리중...
                    </span>
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
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, watchEffect } from 'vue'
import axios from 'axios'

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

const keywords = ref([])

const toggleKeyword = (keywordId: number) => {
    console.log('⏹️ toggleKeyword() 호출')

    if (form.value.selectedKeywordIds.includes(keywordId)) {
        form.value.selectedKeywordIds = form.value.selectedKeywordIds.filter((k) => k !== keywordId)
    } else if (form.value.selectedKeywordIds.length < 3) {
        form.value.selectedKeywordIds.push(keywordId)
    }

    console.log('selectedKeywordIds:', form.value.selectedKeywordIds)
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

// 여기에 조건 상세히 추가
const isFormValid = computed(() => {
    return (
        /^[가-힣a-zA-Z]{2,20}$/.test(form.value.username) &&
        /^[가-힣a-zA-Z0-9]{2,15}$/.test(form.value.nickname) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(form.value.password) &&
        form.value.passwordConfirm === form.value.password &&
        form.value.selectedKeywordIds.length === 3 &&
        /^\d{3}-\d{4}-\d{4}$/.test(form.value.phoneNumber) &&
        form.value.termsAccepted &&
        !Object.values(errors.value).some((error) => error)
    )
})

const validateForm = () => {
    console.log('⏹️ validateForm() 호출')

    errors.value.username = !form.value.username
        ? '이름을 입력해주세요'
        : !/^[가-힣a-zA-Z]{2,20}$/.test(form.value.username)
          ? '이름은 2~20자 이내 한글 및 영문 대소문자만 가능합니다.'
          : ''

    errors.value.nickname = !form.value.nickname
        ? '닉네임을 입력해주세요'
        : !/^[가-힣a-zA-Z0-9]{2,15}$/.test(form.value.nickname)
          ? '닉네임은 2~15자 이내 한글 및 영문 대소문자, 숫자만 가능합니다.'
          : ''

    errors.value.email = !form.value.email
        ? '이메일을 입력해주세요'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
          ? '이메일 형식이 올바르지 않습니다. (xxx@xxx.xxx)'
          : ''

    errors.value.phoneNumber = !form.value.phoneNumber
        ? '전화번호를 입력해주세요'
        : !/^\d{3}-\d{4}-\d{4}$/.test(form.value.phoneNumber)
          ? '전화번호 형식이 올바르지 않습니다. (xxx-xxxx-xxxx)'
          : ''

    if (form.value.password.length < 8) {
        errors.value.password = '비밀번호는 8자 이상이어야 합니다'
    } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#&]/.test(form.value.password)
    ) {
        errors.value.password = '영문, 숫자, 특수문자를 모두 포함해야 합니다'
    } else {
        errors.value.password = ''
    }

    if (form.value.password !== form.value.passwordConfirm) {
        errors.value.passwordConfirm = '비밀번호가 일치하지 않습니다'
    } else {
        errors.value.passwordConfirm = ''
    }
}

watchEffect(() => {
    validateForm()
})

const checkUsername = async () => {
    if (!form.value.nickname) {
        errors.value.nickname = '아이디를 입력해주세요'
        return
    } else {
        errors.value.nickname = ''
    }
    // 실제 중복 확인 로직 구현
}

const sendVerification = async () => {
    if (!form.value.email) {
        errors.value.email = '이메일을 입력해주세요'
        return
    } else {
        try {
            const res = await axios.post(`/mail/send?email=${form.value.email}`)
            console.log(res.data.message)
            errors.value.email = ''
            isVerificationSent.value = true
        } catch (err) {
            if (err.response) {
                errors.value.email = err.response.data.message || '오류 발생'
            } else {
                errors.value.email = '서버 연결 실패'
            }
        }
    }
}

const verifyCode = async () => {
    if (!form.value.verificationCode) return

    try {
        const res = await axios.post(
            `/mail/verify?email=${form.value.email}&code=${form.value.verificationCode}`,
        )
        console.log(res.data.message)
        isVerificationSent.value = false
    } catch (err) {
        console.error('❌이메일 인증 실패', err)
    }
}

const handleSubmit = async () => {
    console.log('⏹️ handleSubmit() 호출')
    // validateForm()
    if (!isFormValid.value) return
    isLoading.value = true
    try {
        // 실제 회원가입 로직 구현
        // await new Promise((resolve) => setTimeout(resolve, 1500))
        const signupForm = {
            email: form.value.email,
            password: form.value.password,
            nickname: form.value.nickname,
            username: form.value.username,
            phoneNumber: form.value.phoneNumber,
            keywordIds: form.value.selectedKeywordIds,
        }

        await axios.post('/member/signup', signupForm)

        console.log('회원가입 성공:', form.value)

        router.push('/')
    } catch (error) {
        console.error('회원가입 실패:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    try {
        const res = await axios.get('/keyword')
        keywords.value = res.data

        console.log('✅키워드 불러오기 성공: ', res.data)
    } catch (err) {
        console.error('❌키워드 불러오기 실패: ', err)
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
