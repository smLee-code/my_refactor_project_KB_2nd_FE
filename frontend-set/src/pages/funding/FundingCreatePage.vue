<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-[1200px] mx-auto px-5">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center space-x-4">
            <button class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">펀딩 프로젝트 생성</h1>
          </div>
        </div>
        <!-- 프로그레스 바 -->
        <div class="pb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-blue-600">1단계</span>
            <span class="text-sm text-gray-500">기본 정보 입력</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full" style="width: 33%"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 메인 컨텐츠 -->
    <div class="max-w-[1200px] mx-auto px-5 py-8">
      <form class="space-y-8">
        <!-- 펀딩 제목 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            펀딩 제목 <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            v-model="fundingTitle"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="펀딩 프로젝트의 제목을 입력해주세요"
          />
        </div>
        <!-- 목표 금액 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            목표 금액 <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="targetAmount"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="1,000,000"
            />
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
              >원</span
            >
          </div>
        </div>
        <!-- 펀딩 기간 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              펀딩 시작일 <span class="text-red-500">*</span>
            </label>
            <input
              type="date"
              v-model="startDate"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              펀딩 종료일 <span class="text-red-500">*</span>
            </label>
            <input
              type="date"
              v-model="endDate"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
        <!-- 펀딩 카테고리 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            펀딩 카테고리 <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <button
              type="button"
              @click="showCategoryDropdown = !showCategoryDropdown"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-left bg-white cursor-pointer flex items-center justify-between"
            >
              <span :class="{ 'text-gray-400': !selectedCategory }">
                {{ selectedCategory || '카테고리를 선택해주세요' }}
              </span>
              <i class="fas fa-chevron-down text-gray-400"></i>
            </button>
            <div
              v-if="showCategoryDropdown"
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
            >
              <div
                v-for="category in categories"
                :key="category"
                @click="selectCategory(category)"
                class="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
              >
                {{ category }}
              </div>
            </div>
          </div>
        </div>
        <!-- 대표 이미지 업로드 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            대표 이미지 <span class="text-red-500">*</span>
          </label>
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
          >
            <div v-if="!mainImage" class="space-y-4">
              <div
                class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i class="fas fa-image text-gray-400 text-xl"></i>
              </div>
              <div>
                <p class="text-gray-600 text-sm mb-2">이미지를 업로드해주세요</p>
                <button
                  type="button"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer whitespace-nowrap !rounded-button"
                >
                  파일 선택
                </button>
              </div>
            </div>
            <div v-else class="relative">
              <img :src="mainImage" alt="대표 이미지" class="w-full h-48 object-cover rounded-lg" />
              <button
                type="button"
                @click="removeMainImage"
                class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
              >
                <i class="fas fa-times text-sm"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- 상세 설명 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            상세 설명 <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="description"
            rows="8"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
            placeholder="펀딩 프로젝트에 대한 상세한 설명을 입력해주세요"
          ></textarea>
        </div>
        <!-- 리워드 설정 -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">리워드 설정</h3>
            <button
              type="button"
              @click="addReward"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm cursor-pointer whitespace-nowrap !rounded-button"
            >
              <i class="fas fa-plus mr-2"></i>
              리워드 추가
            </button>
          </div>
          <div class="space-y-6">
            <div
              v-for="(reward, index) in rewards"
              :key="index"
              class="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-md font-medium text-gray-900">리워드 {{ index + 1 }}</h4>
                <button
                  type="button"
                  @click="removeReward(index)"
                  class="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <i class="fas fa-trash text-sm"></i>
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    리워드 금액 <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      v-model="reward.amount"
                      class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="10,000"
                    />
                    <span
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
                      >원</span
                    >
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"> 제한 수량 </label>
                  <input
                    type="number"
                    v-model="reward.quantity"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="100"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  리워드 제목 <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  v-model="reward.title"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="리워드 제목을 입력해주세요"
                />
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  리워드 설명 <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="reward.description"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                  placeholder="리워드에 대한 상세한 설명을 입력해주세요"
                ></textarea>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  예상 전달일 <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  v-model="reward.deliveryDate"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- 하단 네비게이션 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="max-w-[1200px] mx-auto px-5 py-4">
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium cursor-pointer whitespace-nowrap !rounded-button"
          >
            임시저장
          </button>
          <button
            type="button"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer whitespace-nowrap !rounded-button"
          >
            다음
          </button>
        </div>
      </div>
    </div>
    <!-- 하단 네비게이션 공간 확보 -->
    <div class="h-20"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fundingTitle = ref('')
const targetAmount = ref('')
const startDate = ref('')
const endDate = ref('')
const selectedCategory = ref('')
const showCategoryDropdown = ref(false)
const mainImage = ref('')
const description = ref('')

const categories = [
  '테크놀로지',
  '디자인',
  '패션',
  '음식',
  '게임',
  '출판',
  '영화/비디오',
  '음악',
  '예술',
  '기타',
]

const rewards = ref([
  {
    amount: '',
    quantity: 0,
    title: '',
    description: '',
    deliveryDate: '',
  },
])

const selectCategory = (category) => {
  selectedCategory.value = category
  showCategoryDropdown.value = false
}

const addReward = () => {
  rewards.value.push({
    amount: '',
    quantity: 0,
    title: '',
    description: '',
    deliveryDate: '',
  })
}

const removeReward = (index) => {
  if (rewards.value.length > 1) {
    rewards.value.splice(index, 1)
  }
}

const removeMainImage = () => {
  mainImage.value = ''
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
</style>
