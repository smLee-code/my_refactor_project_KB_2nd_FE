<template>
    <div class="mb-10">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">참여 중인 펀딩 목록</h2>
        <!-- 디버깅용 -->
        <div class="text-sm text-gray-500 mb-2">
            받은 데이터 개수: {{ participatingFundings.length }}
        </div>

        <!-- 참여 중인 펀딩이 없을 때 -->
        <div
            v-if="participatingFundings.length === 0"
            class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center"
        >
            <div class="text-gray-400 mb-4">
                <i class="fas fa-handshake text-4xl"></i>
            </div>
            <p class="text-gray-600 mb-2">아직 참여 중인 펀딩이 없습니다.</p>
            <p class="text-sm text-gray-500">다양한 펀딩에 참여해보세요!</p>
        </div>

        <!-- 참여 중인 펀딩 목록 -->
        <div v-else class="space-y-4">
            <div
                v-for="participation in participatingFundings"
                :key="participation.id"
                class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <h3 class="font-bold text-lg text-gray-900 mb-2">
                            {{ participation.title }}
                        </h3>
                        <div class="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-calendar text-gray-400"></i>
                                <span>참여일: {{ participation.joinDate }}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-won-sign text-gray-400"></i>
                                <span
                                    >참여 금액: {{ participation.amount.toLocaleString() }}원</span
                                >
                            </div>
                        </div>
                        <!-- 인증샷 업로드 영역 -->
                        <div class="mt-4">
                            <h4 class="text-sm font-medium text-gray-700 mb-3">인증샷</h4>
                            <!-- 인증샷 캘린더 뷰 -->
                            <div class="grid grid-cols-7 gap-2 mb-3">
                                <div
                                    v-for="(day, index) in getCertificationDays(participation)"
                                    :key="index"
                                    class="relative w-20 h-20 border border-gray-200 rounded p-1"
                                >
                                    <!-- 날짜 표시 -->
                                    <div class="text-xs text-gray-500">{{ day.date }}</div>

                                    <!-- 인증샷 이미지 또는 업로드 버튼 -->
                                    <div class="flex-1 flex items-center justify-center h-8">
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
                                        <div
                                            v-else-if="day.isToday && !day.image"
                                            class="w-full h-full"
                                        >
                                    <input
                                        type="file"
                                        :id="`file-${participation.id}`"
                                                @change="
                                                    handleImageUpload(participation.id, $event)
                                                "
                                        accept="image/*"
                                        class="hidden"
                                    />
                                    <label
                                        :for="`file-${participation.id}`"
                                                class="w-full h-full border-2 border-dashed border-yellow-400 rounded flex items-center justify-center cursor-pointer hover:bg-yellow-50 transition-colors"
                                    >
                                                <i class="fas fa-plus text-yellow-400 text-xs"></i>
                                    </label>
                                        </div>

                                        <!-- 과거 날짜이고 업로드하지 않은 경우 -->
                                        <div
                                            v-else
                                            class="w-full h-full flex items-center justify-center"
                                        >
                                            <div class="text-gray-300 text-xs">-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 업로드 버튼 (오늘 업로드하지 않은 경우에만 표시) -->
                            <!-- <div v-if="canUploadToday(participation)" class="flex justify-end">
                                <button
                                    @click="triggerFileUpload(participation.id)"
                                    class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap transition-all text-sm"
                                >
                                    인증샷 업로드
                                </button>
                            </div> -->

                            <!-- 오늘 이미 업로드한 경우 안내 메시지 -->
                            <div v-if="!canUploadToday(participation)" class="text-center py-2">
                                <div class="text-green-600 text-xs">
                                    <i class="fas fa-check-circle mr-1"></i>
                                    오늘의 인증샷을 이미 업로드했습니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="canUploadToday(participation)" class="ml-6">
                        <button
                            @click="triggerFileUpload(participation.id)"
                            class="bg-yellow-400 text-gray-900 px-4 py-2 rounded-button font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap transition-all"
                        >
                            인증샷 업로드
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props 정의
// @param {Array} participatingFundings - 참여 중인 펀딩 목록

const props = defineProps({
    participatingFundings: {
        type: Array,
        default: () => [],
    },
})

// Emits 정의
// @emits {Array} update:participatingFundings - 참여 펀딩 목록 업데이트 이벤트

const emit = defineEmits(['update:participatingFundings'])

// 오늘 날짜 계산
const today = new Date()
const todayString = today.toISOString().split('T')[0]

// 디버깅용 로그
console.log('ParticipatingFundingsSection - 오늘 날짜:', todayString)

// 펀딩별 인증샷 날짜 데이터 생성
const getCertificationDays = (participation) => {
    const days = []

    // 실제 펀딩 기간이 있으면 사용, 없으면 기본값 사용
    const start = new Date(
        participation.startDate || participation.fundingStartDate || '2025-07-01',
    )
    const end = new Date(participation.endDate || participation.fundingEndDate || '2025-08-10')

    console.log(`펀딩 ${participation.id} - 시작일:`, start, '종료일:', end)

    // 펀딩 기간이 유효한지 확인 (시작일이 종료일보다 늦으면 안됨)
    if (start > end) {
        console.warn('Invalid funding period:', participation.id, start, end)
        return []
    }

    // 인증샷 데이터를 날짜별로 매핑
    const certificationMap = {}
    if (participation.certificationData) {
        participation.certificationData.forEach((item) => {
            certificationMap[item.date] = {
                image: item.image,
                isApproved: item.isApproved,
                uploadedAt: item.uploadedAt,
            }
        })
    }

    console.log(`펀딩 ${participation.id} - 인증샷 데이터:`, certificationMap)

    // 펀딩 기간 동안의 날짜만 생성
    const today = new Date()
    const displayEnd = end < today ? end : today

    for (let d = new Date(start); d <= displayEnd; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0]
        const isToday = dateString === todayString

        days.push({
            date: `${d.getMonth() + 1}/${d.getDate()}`,
            dateString: dateString,
            image: certificationMap[dateString]?.image || null,
            isApproved: certificationMap[dateString]?.isApproved || null,
            isToday: isToday,
            uploadedAt: certificationMap[dateString]?.uploadedAt || null,
        })
    }

    console.log(`펀딩 ${participation.id} - 생성된 날짜별 데이터:`, days)
    return days
}

// 오늘 업로드 가능 여부 확인
const canUploadToday = (participation) => {
    const todayData = getCertificationDays(participation).find((day) => day.isToday)
    const canUpload = todayData && !todayData.image
    console.log(
        `펀딩 ${participation.id} - 오늘 업로드 가능 여부:`,
        canUpload,
        '오늘 데이터:',
        todayData,
    )
    return canUpload
}

// 파일 업로드 처리
const handleImageUpload = async (fundingId, event) => {
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
        const result = await uploadCertificationImage(file, fundingId)

        // 새로운 인증샷 데이터 생성
            const newCertification = {
            date: todayString,
            image: result.imageUrl,
            isApproved: result.isApproved,
            uploadedAt: todayString,
        }

        // 펀딩 목록 업데이트
            const updatedFundings = props.participatingFundings.map((funding) => {
                if (funding.id === fundingId) {
                const certificationData = funding.certificationData || []
                    return {
                        ...funding,
                    certificationData: [...certificationData, newCertification],
                }
                }
                return funding
            })

            emit('update:participatingFundings', updatedFundings)

        // 파일 입력 초기화
        event.target.value = ''
    } catch (error) {
        console.error('업로드 에러:', error.message)
        alert(error.message)
    }
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

// 파일 업로드 트리거
const triggerFileUpload = (fundingId) => {
    const fileInput = document.getElementById(`file-${fundingId}`)
    fileInput?.click()
}
</script>

<style scoped>
.rounded-button {
    border-radius: 8px;
}
</style>
