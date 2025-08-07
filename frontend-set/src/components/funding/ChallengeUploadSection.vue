<template>
    <section class="mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center mb-4">
                <i class="fas fa-camera text-yellow-500 text-xl mr-3"></i>
                <h3 class="text-xl font-bold text-gray-900">인증샷 업로드</h3>
            </div>

            <!-- 인증샷 캘린더 뷰 -->
            <div class="mb-6">
                <h4 class="text-sm font-medium text-gray-700 mb-3">인증샷 이력</h4>
                <div class="grid grid-cols-7 gap-3">
                    <div
                        v-for="(day, index) in certificationDays"
                        :key="index"
                        class="relative w-20 h-20 border border-gray-200 rounded-lg p-2"
                    >
                        <!-- 날짜 표시 -->
                        <div class="text-xs text-gray-500 mb-1">{{ day.date }}</div>

                        <!-- 인증샷 이미지 또는 업로드 버튼 -->
                        <div class="flex-1 flex items-center justify-center h-12">
                            <!-- 업로드된 인증샷이 있는 경우 -->
                            <div v-if="day.image" class="relative w-full h-full">
                                <img
                                    :src="day.image"
                                    :alt="`인증샷 ${day.date}`"
                                    class="w-full h-full object-cover rounded"
                                />
                                <!-- 성공/실패 태그 -->
                                <div
                                    :class="[
                                        'absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-medium text-white',
                                        day.isApproved ? 'bg-green-500' : 'bg-red-500',
                                    ]"
                                >
                                    {{ day.isApproved ? '성공' : '실패' }}
                                </div>
                            </div>

                            <!-- 오늘 날짜이고 업로드하지 않은 경우 -->
                            <div v-else-if="day.isToday && !day.image" class="w-full h-full">
                                <input
                                    type="file"
                                    :id="`certification-file-${fundingId}`"
                                    @change="handleImageUpload"
                                    accept="image/*"
                                    class="hidden"
                                />
                                <label
                                    :for="`certification-file-${fundingId}`"
                                    class="w-full h-full border-2 border-dashed border-yellow-400 rounded flex items-center justify-center cursor-pointer hover:bg-yellow-50 transition-colors"
                                >
                                    <i class="fas fa-plus text-yellow-400 text-lg"></i>
                                </label>
                            </div>

                            <!-- 과거 날짜이고 업로드하지 않은 경우 -->
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <div class="text-gray-300 text-xs">미업로드</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 업로드 버튼 (오늘 업로드하지 않은 경우에만 표시) -->
            <div v-if="canUploadToday" class="flex justify-end">
                <button
                    @click="triggerFileUpload"
                    class="bg-yellow-400 text-gray-900 px-4 py-2 rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap transition-all"
                >
                    인증샷 업로드
                </button>
            </div>

            <!-- 오늘 이미 업로드한 경우 안내 메시지 -->
            <div v-else class="text-center py-4">
                <div class="text-green-600 text-sm">
                    <i class="fas fa-check-circle mr-2"></i>
                    오늘의 인증샷을 이미 업로드했습니다.
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props 정의
// @param {number} fundingId - 펀딩 ID
// @param {Array} certificationData - 인증샷 데이터 배열 (날짜별)
// @param {string} startDate - 펀딩 시작일 (YYYY-MM-DD 형식)
// @param {string} endDate - 펀딩 종료일 (YYYY-MM-DD 형식)

const props = defineProps({
    fundingId: {
        type: Number,
        required: true,
    },
    certificationData: {
        type: Array,
        default: () => [],
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
})

// Emits 정의
// @emits {Object} imageUploaded - 인증샷 업로드 완료 이벤트
// @emits {string} uploadError - 업로드 에러 이벤트

const emit = defineEmits(['imageUploaded', 'uploadError'])

// 오늘 날짜 계산
const today = new Date()
const todayString = today.toISOString().split('T')[0]

// 디버깅용 로그
console.log('오늘 날짜:', todayString)
console.log('펀딩 시작일:', props.startDate)
console.log('펀딩 종료일:', props.endDate)

// 인증샷 데이터를 날짜별로 매핑
const certificationMap = computed(() => {
    const map = {}
    props.certificationData.forEach((item) => {
        map[item.date] = {
            image: item.image,
            isApproved: item.isApproved,
            uploadedAt: item.uploadedAt,
        }
    })
    console.log('인증샷 데이터 매핑:', map)
    return map
})

// 펀딩 기간 동안의 날짜별 인증샷 데이터 생성
const certificationDays = computed(() => {
    const days = []
    const start = new Date(props.startDate)
    const end = new Date(props.endDate)
    const today = new Date()

    // 펀딩 종료일과 오늘 날짜 중 더 이른 날짜까지만 표시
    const displayEnd = end < today ? end : today

    for (let d = new Date(start); d <= displayEnd; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0]
        const isToday = dateString === todayString

        days.push({
            date: `${d.getMonth() + 1}/${d.getDate()}`,
            dateString: dateString,
            image: certificationMap.value[dateString]?.image || null,
            isApproved: certificationMap.value[dateString]?.isApproved || null,
            isToday: isToday,
            uploadedAt: certificationMap.value[dateString]?.uploadedAt || null,
        })
    }

    console.log('생성된 날짜별 데이터:', days)
    return days
})

// 오늘 업로드 가능 여부
const canUploadToday = computed(() => {
    const todayData = certificationDays.value.find((day) => day.isToday)
    const canUpload = todayData && !todayData.image
    console.log('오늘 업로드 가능 여부:', canUpload, '오늘 데이터:', todayData)
    return canUpload
})

// 파일 업로드 처리
const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
        // 파일 유효성 검사
        if (!file.type.startsWith('image/')) {
            throw new Error('이미지 파일만 업로드 가능합니다.')
        }

        if (file.size > 5 * 1024 * 1024) {
            // 5MB 제한
            throw new Error('파일 크기는 5MB 이하여야 합니다.')
        }

        // 서버에 업로드 요청
        const result = await uploadCertificationImage(file, props.fundingId)

        // 성공 시 이벤트 발생
        emit('imageUploaded', {
            fundingId: props.fundingId,
            image: result.imageUrl,
            isApproved: result.isApproved,
            uploadedAt: todayString,
        })

        // 파일 입력 초기화
        event.target.value = ''
    } catch (error) {
        emit('uploadError', error.message)
    }
}

// 파일 업로드 트리거
const triggerFileUpload = () => {
    const fileInput = document.getElementById(`certification-file-${props.fundingId}`)
    fileInput?.click()
}

// 서버에 인증샷 업로드 및 검증 요청
const uploadCertificationImage = async (file, fundingId) => {
    // 실제로는 서버 API 호출
    // const formData = new FormData()
    // formData.append('image', file)
    // formData.append('fundingId', fundingId)
    //
    // const response = await fetch('/api/certification/upload', {
    //     method: 'POST',
    //     body: formData
    // })
    //
    // if (!response.ok) {
    //     throw new Error('업로드에 실패했습니다.')
    // }
    //
    // return await response.json()

    // Mock: 랜덤하게 성공/실패 반환 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            const isApproved = Math.random() > 0.3 // 70% 확률로 성공
            resolve({
                imageUrl: URL.createObjectURL(file),
                isApproved: isApproved,
            })
        }, 1000)
    })
}
</script>

<style scoped>
.rounded-button {
    border-radius: 8px;
}
</style>
