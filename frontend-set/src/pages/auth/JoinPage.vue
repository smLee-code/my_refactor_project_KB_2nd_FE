<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="flex-1 flex items-center justify-center py-8">
    <div class="w-full max-w-3xl px-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
          <p class="text-gray-600">Fund:ing에 오신 것을 환영합니다</p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >이름 <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.name"
                type="text"
                placeholder="이름을 입력해주세요"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                :class="{ 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="text-red-500 text-xs mt-1">
                {{ errors.name }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >아이디 <span class="text-red-500">*</span></label
              >
              <div class="flex gap-2">
                <input
                  v-model="form.username"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                  :class="{ 'border-red-500': errors.username }"
                />
                <button
                  type="button"
                  @click="checkUsername"
                  class="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer"
                >
                  중복확인
                </button>
              </div>
              <p v-if="errors.username" class="text-red-500 text-xs mt-1">
                {{ errors.username }}
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
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
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
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">
              관심 금융상품 <span class="text-red-500">*</span>
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              회원님의 관심사에 맞는 금융상품을 추천해드리기 위해 필요한 정보입니다.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="(product, index) in products"
                :key="index"
                @click="selectProduct(index)"
                class="p-4 border rounded-lg cursor-pointer transition-all duration-200"
                :class="{
                  'border-blue-600 bg-blue-50': form.selectedProduct === index,
                  'border-gray-200 hover:border-blue-300': form.selectedProduct !== index,
                }"
              >
                <div class="flex items-start gap-3">
                  <i :class="product.icon" class="text-2xl text-blue-600"></i>
                  <div>
                    <h4 class="font-medium text-gray-900">
                      {{ product.title }}
                    </h4>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </div>
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
            <span v-if="isLoading" class="flex items-center justify-center">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              처리중...
            </span>
            <span v-else>회원가입</span>
          </button>
          <div class="text-center">
            <span class="text-sm text-gray-600">이미 계정이 있으신가요?</span>
            <a
              href="https://readdy.ai/home/cb2c7bc4-bc93-4247-9521-a5e098400181/ad8f1e51-76d5-4f7b-8fa8-c4f51b2043cb"
              data-readdy="true"
              class="text-blue-600 hover:text-blue-800 ml-1 cursor-pointer"
              >로그인</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-4 shadow-inner">
    <div class="container mx-auto px-4 sm:px-6 lg:px-32">
      <div class="flex justify-center space-x-4 sm:space-x-8">
        <a
          href="#"
          class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
          >이용약관</a
        >
        <a
          href="#"
          class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
          >개인정보처리방침</a
        >
        <a
          href="#"
          class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
          >고객센터</a
        >
      </div>
      <div class="text-center mt-2">
        <p class="text-sm text-gray-500">© 2025 Fund:ing. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import AuthHeader from '@/components/layout/AuthHeader.vue'

const form = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  verificationCode: '',
  selectedProduct: -1,
  termsAccepted: false,
})

const errors = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const products = [
  {
    title: '저축형',
    description:
      '정해진 주기와 금액으로 규칙적인 납입을 통해 만기 달성 시 혜택을 받을 수 있는 금융 상품',
    icon: 'fas fa-piggy-bank',
  },
  {
    title: '대출형',
    description: '일정 조건 충족 시 금융사가 대출 상품을 우대 조건으로 제공받을 수 있는 금융 상품',
    icon: 'fas fa-hand-holding-usd',
  },
  {
    title: '기부형',
    description: '일정 금액 이상 기부금이 모이면 금융사가 동참하는 기부 상품',
    icon: 'fas fa-gift',
  },
  {
    title: '챌린지형',
    description: '목표 달성을 인증하면 리워드가 제공되는 금융 상품',
    icon: 'fas fa-trophy',
  },
]

const isLoading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const isVerificationSent = ref(false)

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.username &&
    form.value.email &&
    form.value.password &&
    form.value.passwordConfirm &&
    form.value.selectedProduct >= 0 &&
    form.value.termsAccepted &&
    !Object.values(errors.value).some((error) => error)
  )
})

const validateForm = () => {
  errors.value.name = !form.value.name ? '이름을 입력해주세요' : ''
  errors.value.username = !form.value.username ? '아이디를 입력해주세요' : ''
  errors.value.email = !form.value.email ? '이메일을 입력해주세요' : ''

  if (form.value.password.length < 8) {
    errors.value.password = '비밀번호는 8자 이상이어야 합니다'
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(form.value.password)
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

const checkUsername = async () => {
  if (!form.value.username) {
    errors.value.username = '아이디를 입력해주세요'
    return
  }
  // 실제 중복 확인 로직 구현
}

const sendVerification = async () => {
  if (!form.value.email) {
    errors.value.email = '이메일을 입력해주세요'
    return
  }
  isVerificationSent.value = true
}

const verifyCode = async () => {
  if (!form.value.verificationCode) return
  // 실제 인증 코드 확인 로직 구현
}

const selectProduct = (index) => {
  form.value.selectedProduct = index
}

const handleSubmit = async () => {
  validateForm()
  if (!isFormValid.value) return

  isLoading.value = true
  try {
    // 실제 회원가입 로직 구현
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('회원가입 성공:', form.value)
  } catch (error) {
    console.error('회원가입 실패:', error)
  } finally {
    isLoading.value = false
  }
}
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
