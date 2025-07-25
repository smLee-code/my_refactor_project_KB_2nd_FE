<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="min-h-screen bg-gray-50 w-full">
    <!-- 메인 콘텐츠 영역 -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-32 py-8">
      <!-- 프로젝트 메인 비주얼 -->
      <section class="mb-8">
        <div class="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://readdy.ai/api/search-image?query=environmental%20sustainability%20project%20hero%20banner%20with%20clean%20white%20background%2C%20green%20technology%20innovation%20concept%2C%20modern%20eco-friendly%20design%20with%20left%20side%20text%20area%2C%20professional%20investment%20presentation%2C%20minimalist%20clean%20aesthetic%2C%20nature%20elements%20integrated%20seamlessly&width=1200&height=400&seq=hero1&orientation=landscape"
            alt="Project A 대표 이미지"
            class="w-full h-full object-cover object-top"
          />
          <div class="absolute top-6 right-6 flex items-center space-x-3">
            <div
              class="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg"
            >
              진행중
            </div>
            <button
              class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all cursor-pointer"
            >
              <i class="fas fa-heart text-red-500"></i>
            </button>
            <button
              class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all cursor-pointer"
            >
              <i class="fas fa-share text-gray-600"></i>
            </button>
          </div>
        </div>
        <div class="mt-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Project A - Environment Sustainability Initiative
          </h1>
          <p class="text-lg text-gray-600">지속 가능한 환경을 위한 혁신적인 기술 개발 프로젝트</p>
        </div>
      </section>
      <!-- 펀딩 현황 카드 -->
      <section class="mb-8">
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div class="text-center">
              <div class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">₩50,000,000</div>
              <div class="text-sm text-gray-600">목표 금액</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-600 mb-1">₩37,500,000</div>
              <div class="text-sm text-gray-600">현재 모금액</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600 mb-1">75%</div>
              <div class="text-sm text-gray-600">달성률</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600 mb-1">142명</div>
              <div class="text-sm text-gray-600">참여 인원</div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>펀딩 진행률</span>
              <span>75% 달성</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div
                class="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full shadow-sm transition-all duration-500"
                style="width: 75%"
              ></div>
            </div>
          </div>
          <div
            class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0"
          >
            <div
              class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600"
            >
              <div class="flex items-center bg-red-50 px-3 py-2 rounded-full">
                <i class="fas fa-clock text-red-500 mr-2"></i>
                <span>15일 남음</span>
              </div>
              <div class="text-gray-500">마감일: 2025년 8월 6일</div>
            </div>
            <button
              class="w-full sm:w-auto bg-yellow-400 text-gray-900 px-8 py-3 !rounded-button font-bold hover:bg-yellow-500 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              펀딩 참여하기
            </button>
          </div>
        </div>
      </section>
      <!-- 상세 정보 섹션 -->
      <section class="mb-8">
        <div class="grid grid-cols-1 gap-6">
          <!-- 펀딩 목적 / 배경 -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
              <i class="fas fa-leaf text-green-500 text-xl mr-3"></i>
              <h3 class="text-xl font-bold text-gray-900">펀딩 목적 및 배경</h3>
            </div>
            <p class="text-gray-700 leading-relaxed mb-4">
              기후 변화와 환경 오염이 심각한 문제로 대두되고 있는 현재, 우리는 지속 가능한 미래를
              위한 혁신적인 환경 기술 개발이 시급하다고 판단했습니다. 이 프로젝트는 재생 에너지
              효율성을 높이고, 탄소 배출량을 획기적으로 줄일 수 있는 친환경 기술 솔루션을 개발하는
              것을 목표로 합니다.
            </p>
            <p class="text-gray-700 leading-relaxed">
              특히 도시 환경에서 적용 가능한 스마트 에너지 관리 시스템과 폐기물 재활용 기술을 통해
              지역 사회의 환경 개선과 경제적 효과를 동시에 달성하고자 합니다.
            </p>
          </div>
          <!-- 출처 프로젝트 정보 -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
              <i class="fas fa-project-diagram text-blue-500 text-xl mr-3"></i>
              <h3 class="text-xl font-bold text-gray-900">출처 프로젝트</h3>
            </div>
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20eco%20technology%20project%20thumbnail%20with%20clean%20white%20background%2C%20environmental%20innovation%20concept%2C%20professional%20project%20presentation%20visual%2C%20minimalist%20tech%20design%20elements&width=80&height=80&seq=project1&orientation=squarish"
                  alt="프로젝트 썸네일"
                  class="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1">친환경 도시 개발 프로젝트</h4>
                <p class="text-sm text-gray-600 mb-2">KB 환경 연구소</p>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <span class="bg-blue-50 px-2 py-1 rounded-full">진행중</span>
                  <span class="bg-green-50 px-2 py-1 rounded-full">연구개발</span>
                  <span class="bg-purple-50 px-2 py-1 rounded-full">환경/에너지</span>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p class="text-sm text-gray-600 mb-1">프로젝트 기간</p>
                  <p class="font-medium text-gray-900">2025.01 - 2025.12</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">프로젝트 단계</p>
                  <p class="font-medium text-gray-900">연구개발 2단계</p>
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                본 펀딩은 KB 환경 연구소의 '친환경 도시 개발 프로젝트'의 2단계 연구개발을 위해
                개설되었습니다. 1단계에서 개발된 기술을 실제 도시 환경에 적용하기 위한 실증 연구를
                진행할 예정입니다.
              </p>
            </div>
          </div>
          <!-- 자금 사용 계획 -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
              <i class="fas fa-chart-pie text-purple-500 text-xl mr-3"></i>
              <h3 class="text-xl font-bold text-gray-900">자금 사용 계획</h3>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="space-y-3">
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                >
                  <span class="text-gray-700">연구개발비</span>
                  <span class="font-bold text-gray-900">₩25,000,000 (50%)</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="text-gray-700">장비 구입비</span>
                  <span class="font-bold text-gray-900">₩15,000,000 (30%)</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="text-gray-700">인건비</span>
                  <span class="font-bold text-gray-900">₩7,500,000 (15%)</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="text-gray-700">기타 운영비</span>
                  <span class="font-bold text-gray-900">₩2,500,000 (5%)</span>
                </div>
              </div>
              <div class="flex items-center justify-center">
                <div class="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-chart-pie text-6xl text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- 참여자 혜택 안내 -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
              <i class="fas fa-gift text-orange-500 text-xl mr-3"></i>
              <h3 class="text-xl font-bold text-gray-900">참여자 혜택</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                <i class="fas fa-medal text-blue-500 text-2xl mb-2"></i>
                <h4 class="font-bold text-gray-900 mb-2">₩10,000 이상</h4>
                <p class="text-sm text-gray-600">프로젝트 진행 보고서 및 감사 인증서</p>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
                <i class="fas fa-trophy text-green-500 text-2xl mb-2"></i>
                <h4 class="font-bold text-gray-900 mb-2">₩50,000 이상</h4>
                <p class="text-sm text-gray-600">친환경 제품 샘플 + 프로젝트 참여 기념품</p>
              </div>
              <div
                class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center"
              >
                <i class="fas fa-crown text-purple-500 text-2xl mb-2"></i>
                <h4 class="font-bold text-gray-900 mb-2">₩100,000 이상</h4>
                <p class="text-sm text-gray-600">프로젝트 완료 후 기술 설명회 초대</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 참여자 피드백 영역 -->
      <section class="mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">참여자 피드백</h3>
            <span class="text-sm text-gray-600">총 24개의 댓글</span>
          </div>
          <div class="space-y-4 mb-6">
            <div class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div
                class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-user text-white text-sm"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="font-medium text-gray-900">김지원</span>
                  <span class="text-xs text-gray-500">2시간 전</span>
                </div>
                <p class="text-sm text-gray-700">
                  정말 의미 있는 프로젝트네요! 환경을 위한 기술 개발에 참여할 수 있어서 기쁩니다.
                </p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div
                class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-user text-white text-sm"></i>
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="font-medium text-gray-900">박민수</span>
                  <span class="text-xs text-gray-500">5시간 전</span>
                </div>
                <p class="text-sm text-gray-700">
                  김환경 박사님의 이전 연구 성과를 보고 신뢰하게 되었습니다. 성공을 기원합니다!
                </p>
              </div>
            </div>
          </div>
          <div class="border-t pt-4">
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-user text-gray-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <input
                  type="text"
                  placeholder="댓글을 입력하세요..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                />
              </div>
              <button
                class="bg-yellow-400 text-gray-900 px-4 py-2 !rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- 추천 펀딩 섹션 -->
      <section class="mb-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">다른 펀딩 둘러보기</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
          >
            <div class="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=local%20art%20community%20funding%20project%20with%20clean%20white%20background%2C%20creative%20arts%20initiative%2C%20colorful%20artistic%20elements%2C%20modern%20cultural%20design%2C%203D%20depth%20effect&width=300&height=200&seq=rec1&orientation=landscape"
                alt="추천 펀딩 1"
                class="w-full h-full object-cover object-top"
              />
            </div>
            <div class="p-4">
              <h4 class="font-bold text-gray-900 mb-2">Local Art Fund Raising</h4>
              <p class="text-sm text-gray-600 mb-3">지역 예술가들을 위한 창작 지원 프로젝트</p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">8일 남음</span>
                <span class="text-blue-600 font-medium">60% 달성</span>
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
          >
            <div class="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=technology%20innovation%20for%20everyone%20with%20clean%20white%20background%2C%20inclusive%20tech%20development%2C%20modern%20digital%20elements%2C%20professional%20tech%20design%2C%203D%20depth%20effect&width=300&height=200&seq=rec2&orientation=landscape"
                alt="추천 펀딩 2"
                class="w-full h-full object-cover object-top"
              />
            </div>
            <div class="p-4">
              <h4 class="font-bold text-gray-900 mb-2">Tech Innovations for All</h4>
              <p class="text-sm text-gray-600 mb-3">모든 사람을 위한 기술 혁신 프로젝트</p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">12일 남음</span>
                <span class="text-blue-600 font-medium">45% 달성</span>
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
          >
            <div class="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=community%20health%20initiative%20project%20with%20clean%20white%20background%2C%20healthcare%20accessibility%20program%2C%20medical%20care%20elements%2C%20professional%20health%20design%2C%203D%20depth%20effect&width=300&height=200&seq=rec3&orientation=landscape"
                alt="추천 펀딩 3"
                class="w-full h-full object-cover object-top"
              />
            </div>
            <div class="p-4">
              <h4 class="font-bold text-gray-900 mb-2">Community Health Drive</h4>
              <p class="text-sm text-gray-600 mb-3">지역 사회 건강 증진 프로그램</p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">30일 남음</span>
                <span class="text-blue-600 font-medium">30% 달성</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- 푸터 -->
    <footer class="bg-gradient-to-r from-gray-100 to-gray-200 py-8 shadow-inner mt-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-32">
        <div class="flex justify-center space-x-8">
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
            >Terms and Conditions</a
          >
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
            >Privacy Policy</a
          >
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors hover:drop-shadow-sm"
            >Contact Us</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLiked = ref(false)
const participantCount = ref(142)
const currentAmount = ref(37500000)
const targetAmount = ref(50000000)
const daysLeft = ref(15)
const progressPercentage = ref(75)

const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const shareProject = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Project A - Environment Sustainability Initiative',
      text: '지속 가능한 환경을 위한 혁신적인 기술 개발 프로젝트',
      url: window.location.href,
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('링크가 클립보드에 복사되었습니다!')
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

/* 모바일 최적화 스타일 */
@media (max-width: 768px) {
  .h-96 {
    height: 16rem;
  }

  .text-3xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .text-2xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .space-x-4 > * + * {
    margin-left: 0.5rem;
  }

  .p-6 {
    padding: 1rem;
  }
}
</style>
