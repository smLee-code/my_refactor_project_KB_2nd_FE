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

                <!-- 로딩 상태 -->
                <div v-if="isLoadingLogs" class="flex justify-center items-center py-8">
                    <div
                        class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"
                    ></div>
                    <span class="ml-3 text-gray-600">인증샷 이력을 불러오는 중...</span>
                </div>

                <!-- 캘린더 그리드 -->
                <div
                    v-else
                    class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4"
                >
                    <div
                        v-for="(day, index) in certificationDays"
                        :key="index"
                        class="relative w-full aspect-square border border-gray-200 rounded-lg p-2 sm:p-3"
                    >
                        <!-- 날짜 표시 -->
                        <div class="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                            {{ day.date }}
                        </div>

                        <!-- 인증샷 이미지 또는 업로드 버튼 -->
                        <div
                            class="flex-1 flex items-center justify-center"
                            style="height: calc(100% - 1.5rem)"
                        >
                            <!-- 업로드된 인증샷이 있는 경우 -->
                            <div v-if="day.image" class="relative w-full h-full">
                                <img
                                    :src="day.image"
                                    :alt="`인증샷 ${day.date}`"
                                    class="w-full h-full object-cover rounded"
                                />
                                <!-- 성공/실패 태그 (툴팁 포함) -->
                                <div
                                    :class="[
                                        'absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-medium text-white cursor-help relative group flex items-center justify-center text-center',
                                        day.isApproved ? 'bg-green-500' : 'bg-red-500',
                                    ]"
                                    :title="day.verifiedResult"
                                >
                                    {{ day.isApproved ? '성공' : '실패' }}

                                    <!-- 커스텀 툴팁 -->
                                    <div
                                        v-if="day.verifiedResult"
                                        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10"
                                    >
                                        {{ day.verifiedResult }}
                                        <!-- 툴팁 화살표 -->
                                        <div
                                            class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <!-- 오늘 날짜이고 업로드하지 않은 경우 -->
                            <div
                                v-else-if="day.isToday && !day.image && props.userChallengeId"
                                class="w-full h-full"
                            >
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
                                    <i
                                        class="fas fa-plus text-yellow-400 text-lg sm:text-xl md:text-2xl"
                                    ></i>
                                </label>
                            </div>

                            <!-- 오늘 날짜이지만 참여하지 않은 경우 -->
                            <div
                                v-else-if="day.isToday && !day.image && !props.userChallengeId"
                                class="w-full h-full flex items-center justify-center"
                            >
                                <div class="text-gray-400 text-xs sm:text-sm text-center">
                                    <i class="fas fa-lock text-gray-300 mb-1"></i>
                                    <br />참여 필요
                                </div>
                            </div>

                            <!-- 과거 날짜이고 업로드하지 않은 경우 -->
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <div class="text-gray-300 text-xs sm:text-sm">미업로드</div>
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

            <!-- 참여하지 않은 경우 안내 메시지 -->
            <div v-else-if="!props.userChallengeId" class="text-center py-4">
                <div class="text-gray-600 text-sm">
                    <i class="fas fa-info-circle mr-2"></i>
                    챌린지에 참여한 후 인증샷을 업로드할 수 있습니다.
                </div>
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
import { verifyChallenge, getChallengeLogs } from '@/api/fundingApi'
import { useAuthStore } from '@/stores/auth'

// Props 정의
// @param {number} fundingId - 펀딩 ID
// @param {Array} certificationData - 인증샷 데이터 배열 (날짜별)
// @param {string} startDate - 펀딩 시작일 (YYYY-MM-DD 형식)
// @param {string} endDate - 펀딩 종료일 (YYYY-MM-DD 형식)
// @param {number} userChallengeId - 사용자 챌린지 ID

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
    userChallengeId: {
        type: Number,
        required: false,
        default: null,
    },
})

// Emits 정의
// @emits {Object} imageUploaded - 인증샷 업로드 완료 이벤트
// @emits {string} uploadError - 업로드 에러 이벤트

const emit = defineEmits(['imageUploaded', 'uploadError'])

// Auth store 사용
const authStore = useAuthStore()

// 오늘 날짜 계산 (한국 시간 기준)
const today = new Date()
// 한국 시간(UTC+9)으로 변환
const koreaTime = new Date(today.getTime() + 9 * 60 * 60 * 1000)
const todayString = koreaTime.toISOString().split('T')[0]

// 디버깅용 로그
console.log('오늘 날짜:', todayString)
console.log('펀딩 시작일:', props.startDate)
console.log('펀딩 종료일:', props.endDate)
console.log('userChallengeId:', props.userChallengeId)

// 챌린지 로그 데이터 로드
const loadChallengeLogs = async () => {
    try {
        isLoadingLogs.value = true

        // userChallengeId가 있으면 실제 API 호출, 없으면 certificationData 사용
        if (props.userChallengeId && props.userChallengeId > 0) {
            console.log('실제 API 호출 - userChallengeId:', props.userChallengeId)
            try {
                const logs = await getChallengeLogs(props.userChallengeId)
                challengeLogs.value = logs
                console.log('챌린지 로그 로드 완료:', logs)
            } catch (error) {
                console.warn('챌린지 로그 API 호출 실패, 빈 배열로 초기화:', error.message)
                challengeLogs.value = []
            }
        } else if (props.certificationData && props.certificationData.length > 0) {
            console.log('certificationData 사용:', props.certificationData)
            // certificationData를 challengeLogs 형식으로 변환
            challengeLogs.value = props.certificationData.map((cert, index) => ({
                logId: index + 1,
                userChallengeId: props.userChallengeId || 1,
                userId: 1,
                logDate: cert.uploadedAt,
                imageUrl: cert.url,
                verified: cert.isApproved,
                verifiedResult: cert.isApproved ? '인증 성공' : '인증 실패',
                createAt: cert.uploadedAt,
            }))
            console.log('certificationData 변환 완료:', challengeLogs.value)
        } else {
            console.log('데이터가 없어서 빈 배열 사용')
            challengeLogs.value = []
        }
    } catch (error) {
        console.error('챌린지 로그 로드 실패:', error)
        // 에러 시 빈 배열로 설정
        challengeLogs.value = []
    } finally {
        isLoadingLogs.value = false
    }
}

// 컴포넌트 마운트 시 로그 데이터 로드
onMounted(() => {
    loadChallengeLogs()
})

// 실제 챌린지 로그 데이터
const challengeLogs = ref([])
const isLoadingLogs = ref(false)

// 챌린지 로그 데이터를 날짜별로 매핑
const certificationMap = computed(() => {
    const map = {}
    console.log('certificationMap 계산 중, challengeLogs:', challengeLogs.value)

    challengeLogs.value.forEach((log) => {
        const dateString = log.logDate
        map[dateString] = {
            image: log.imageUrl,
            isApproved: log.verified,
            uploadedAt: log.createAt,
            verifiedResult: log.verifiedResult,
        }
        console.log(`날짜 ${dateString} 매핑:`, map[dateString])
    })
    console.log('최종 챌린지 로그 데이터 매핑:', map)
    return map
})

// 날짜 문자열을 Date 객체로 변환하는 함수
const parseKoreanDate = (dateString) => {
    // "2025년 8월 1일" 형식을 파싱
    const match = dateString.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
    if (match) {
        const [, year, month, day] = match
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
    // 파싱 실패 시 현재 날짜 반환
    return new Date()
}

// 로그 데이터 기반의 날짜별 인증샷 데이터 생성
const certificationDays = computed(() => {
    const days = []
    const today = new Date()

    // 로그 데이터가 있는 날짜들을 과거순으로 정렬
    const logDates = challengeLogs.value
        .map((log) => log.logDate)
        .sort((a, b) => new Date(a) - new Date(b))

    console.log('정렬된 로그 날짜들:', logDates)

    // 각 로그 날짜에 대해 데이터 생성
    logDates.forEach((logDate) => {
        const date = new Date(logDate)
        const dateString = logDate
        const isToday = dateString === todayString

        days.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            dateString: dateString,
            image: certificationMap.value[dateString]?.image || null,
            isApproved: certificationMap.value[dateString]?.isApproved || null,
            isToday: isToday,
            uploadedAt: certificationMap.value[dateString]?.uploadedAt || null,
            verifiedResult: certificationMap.value[dateString]?.verifiedResult || null,
        })
    })

    // 오늘 날짜가 로그에 없으면 추가 (업로드 가능한 상태로)
    if (!logDates.includes(todayString)) {
        days.push({
            date: `${today.getMonth() + 1}/${today.getDate()}`,
            dateString: todayString,
            image: null,
            isApproved: null,
            isToday: true,
            uploadedAt: null,
        })
    }

    console.log('생성된 날짜별 데이터:', days)
    console.log('todayString:', todayString)
    console.log(
        '오늘 날짜가 포함된 데이터:',
        days.find((day) => day.isToday),
    )
    return days
})

// 오늘 업로드 가능 여부
const canUploadToday = computed(() => {
    // 챌린지에 참여하지 않았으면 업로드 불가
    if (!props.userChallengeId) {
        return false
    }

    const todayData = certificationDays.value.find((day) => day.isToday)
    const canUpload = todayData && !todayData.image
    console.log(
        '오늘 업로드 가능 여부:',
        canUpload,
        '오늘 데이터:',
        todayData,
        'userChallengeId:',
        props.userChallengeId,
    )
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
        const result = await uploadCertificationImage(file)

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
const uploadCertificationImage = async (file) => {
    try {
        // userChallengeId가 없으면 에러 발생
        if (!props.userChallengeId) {
            throw new Error('챌린지에 참여하지 않았습니다. 먼저 챌린지에 참여해주세요.')
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('date', todayString)

        console.log('API 호출 정보:', {
            file: file.name,
            fileSize: file.size,
            date: todayString,
            userChallengeId: props.userChallengeId,
            formDataEntries: Array.from(formData.entries()),
        })

        // 기존 API 함수 사용
        const result = await verifyChallenge(props.userChallengeId, formData)
        console.log('업로드 성공:', result)

        // 업로드된 이미지를 challengeLogs에 추가
        const newLog = {
            logId: result.logId || Date.now(),
            userChallengeId: props.userChallengeId,
            userId: result.userId || 1,
            logDate: todayString,
            imageUrl: result.imageUrl,
            verified: result.verified,
            verifiedResult: result.verifiedResult || (result.verified ? '인증 성공' : '인증 실패'),
            createAt: new Date().toISOString(),
        }

        challengeLogs.value.push(newLog)
        console.log('새로운 로그 추가:', newLog)

        return {
            imageUrl: result.imageUrl,
            isApproved: result.verified,
            message: result.message || '인증샷 업로드 및 검증 완료',
        }
    } catch (error) {
        console.error('인증샷 업로드 실패:', error)
        throw new Error('인증샷 업로드에 실패했습니다.')
    }
}
</script>

<style scoped>
.rounded-button {
    border-radius: 8px;
}
</style>
