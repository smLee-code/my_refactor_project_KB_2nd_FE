<template>
    <section class="mb-8">
        <div
            class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
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
                        class="relative w-full aspect-square border border-gray-200 rounded-lg p-2 sm:p-3 hover:border-yellow-300 hover:shadow-md transition-all duration-200 group"
                    >
                        <!-- 날짜 표시 -->
                        <div class="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 font-medium">
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
                                    class="w-full h-full object-cover rounded cursor-pointer hover:opacity-90 transition-opacity duration-200"
                                    @click="openImageModal(day.image, day.date, day.verifiedResult)"
                                />
                                <!-- 성공/실패/검토 태그 (툴팁 포함) -->
                                <div
                                    :class="[
                                        'absolute -top-1 -right-1 px-1 py-0.5 rounded-full text-xs font-medium text-white cursor-help relative group flex items-center justify-center text-center shadow-lg',
                                        day.status === 'success'
                                            ? 'bg-green-500'
                                            : day.status === 'review'
                                              ? 'bg-orange-500'
                                              : 'bg-red-500',
                                    ]"
                                    :title="day.verifiedResult"
                                >
                                    {{
                                        day.status === 'success'
                                            ? '성공'
                                            : day.status === 'review'
                                              ? '검토중'
                                              : '실패'
                                    }}

                                    <!-- 커스텀 툴팁 -->
                                    <div
                                        v-if="day.verifiedResult"
                                        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs backdrop-blur-sm"
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
                                v-else-if="
                                    day.isToday &&
                                    (!day.image || day.status === null) &&
                                    props.userChallengeId
                                "
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
                                    class="w-full h-full border-2 border-dashed border-yellow-400 rounded flex items-center justify-center cursor-pointer hover:bg-yellow-50 hover:border-yellow-500 transition-all duration-200 group"
                                >
                                    <div class="text-center">
                                        <i
                                            class="fas fa-plus text-yellow-400 text-lg sm:text-xl md:text-2xl group-hover:text-yellow-500 transition-colors duration-200"
                                        ></i>
                                        <div
                                            class="text-xs text-yellow-500 mt-1 group-hover:text-yellow-600"
                                        >
                                            업로드
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <!-- 오늘 날짜이지만 참여하지 않은 경우 -->
                            <div
                                v-else-if="
                                    day.isToday &&
                                    (!day.image || day.status === null) &&
                                    !props.userChallengeId
                                "
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
                    :disabled="isUploading"
                    class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-button font-medium hover:from-yellow-500 hover:to-yellow-600 cursor-pointer whitespace-nowrap transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <i v-if="isUploading" class="fas fa-spinner fa-spin mr-2"></i>
                    <i v-else class="fas fa-upload mr-2"></i>
                    {{ isUploading ? '업로드 중...' : '인증샷 업로드' }}
                </button>
            </div>

            <!-- 업로드 로딩 상태 -->
            <div v-if="isUploading" class="text-center py-4">
                <div class="flex items-center justify-center space-x-3">
                    <div
                        class="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"
                    ></div>
                    <div class="text-yellow-600 text-sm">
                        인증샷이 전송되었습니다. 검증 결과를 불러옵니다.
                    </div>
                </div>
            </div>

            <!-- 참여하지 않은 경우 안내 메시지 -->
            <div v-else-if="!props.userChallengeId" class="text-center py-4">
                <div class="text-gray-600 text-sm bg-gray-50 rounded-lg p-4">
                    <i class="fas fa-info-circle mr-2 text-blue-500"></i>
                    챌린지에 참여한 후 인증샷을 업로드할 수 있습니다.
                </div>
            </div>

            <!-- 오늘 이미 업로드한 경우 안내 메시지 -->
            <div v-else-if="hasUploadedToday && !isUploading" class="text-center py-4">
                <div class="text-green-600 text-sm bg-green-50 rounded-lg p-4">
                    <i class="fas fa-check-circle mr-2"></i>
                    오늘의 인증샷을 이미 업로드했습니다.
                </div>
            </div>
        </div>

        <!-- 이미지 모달 -->
        <div
            v-if="showImageModal"
            class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            @click="closeImageModal"
        >
            <div class="relative max-w-4xl max-h-full">
                <!-- 모달 닫기 버튼 -->
                <button
                    @click="closeImageModal"
                    class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
                >
                    <i class="fas fa-times text-2xl"></i>
                </button>

                <!-- 이미지 컨테이너 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-2xl">
                    <img
                        :src="modalImage"
                        :alt="`인증샷 ${modalDate}`"
                        class="max-w-full max-h-[80vh] object-contain"
                        @click.stop
                    />

                    <!-- 이미지 정보 -->
                    <div v-if="modalResult" class="p-4 bg-gray-50 border-t">
                        <div class="text-sm text-gray-700">
                            <div class="font-medium mb-2">검증 결과:</div>
                            <div class="text-gray-600">{{ modalResult }}</div>
                        </div>
                    </div>
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
const loadChallengeLogs = async (isAfterUpload = false) => {
    try {
        isLoadingLogs.value = true

        // userChallengeId가 있으면 실제 API 호출, 없으면 certificationData 사용
        if (props.userChallengeId && props.userChallengeId > 0) {
            console.log('실제 API 호출 - userChallengeId:', props.userChallengeId)
            try {
                const logs = await getChallengeLogs(props.userChallengeId)
                console.log('API 응답 원본:', logs)
                console.log('API 응답 타입:', typeof logs)
                console.log('API 응답 길이:', Array.isArray(logs) ? logs.length : '배열 아님')

                if (Array.isArray(logs)) {
                    challengeLogs.value = logs
                    console.log('챌린지 로그 로드 완료:', logs)
                } else {
                    console.warn('API 응답이 배열이 아님:', logs)
                    challengeLogs.value = []
                }
            } catch (error) {
                console.warn('챌린지 로그 API 호출 실패, 빈 배열로 초기화:', error.message)
                console.error('에러 상세:', error)
                challengeLogs.value = []
            }
        } else if (props.certificationData && props.certificationData.length > 0) {
            console.log('certificationData 사용:', props.certificationData)
            // certificationData를 challengeLogs 형식으로 변환 (더 유연한 구조 지원)
            challengeLogs.value = props.certificationData.map((cert, index) => ({
                logId: index + 1,
                userChallengeId: props.userChallengeId || 1,
                userId: 1,
                logDate: cert.uploadedAt || cert.date || new Date().toISOString().split('T')[0],
                imageUrl: cert.url || cert.image,
                verified: cert.isApproved,
                verifiedResult: cert.isApproved ? '인증 성공' : '인증 실패',
                createAt: cert.uploadedAt || cert.date || new Date().toISOString(),
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
const isUploading = ref(false)

// 이미지 모달 상태 및 데이터
const showImageModal = ref(false)
const modalImage = ref('')
const modalDate = ref('')
const modalResult = ref('')

// 이미지 모달 열기
const openImageModal = (imageUrl, date, result) => {
    modalImage.value = imageUrl
    modalDate.value = date
    modalResult.value = result
    showImageModal.value = true
}

// 이미지 모달 닫기
const closeImageModal = () => {
    showImageModal.value = false
    modalImage.value = ''
    modalDate.value = ''
    modalResult.value = ''
}

// 챌린지 로그 데이터를 날짜별로 매핑
const certificationMap = computed(() => {
    const map = {}
    console.log('certificationMap 계산 중, challengeLogs:', challengeLogs.value)

    challengeLogs.value.forEach((log) => {
        // logDate가 배열 형태 [year, month, day]로 오므로 문자열로 변환
        const dateString = Array.isArray(log.logDate)
            ? `${log.logDate[0]}-${String(log.logDate[1]).padStart(2, '0')}-${String(log.logDate[2]).padStart(2, '0')}`
            : log.logDate

        // 점수 추출 및 상태 결정
        let status = 'pending' // 기본값
        let score = 0

        if (log.verifiedResult) {
            const scoreMatch = log.verifiedResult.match(/\[점수:\s*(\d+)\]/)
            if (scoreMatch) {
                score = parseInt(scoreMatch[1])
                if (score >= 71) {
                    status = 'success'
                } else if (score >= 21) {
                    status = 'review'
                } else {
                    status = 'failed'
                }
            } else {
                // 점수가 없는 경우 verified 필드로 판단
                if (log.verified === 'Verified') {
                    status = 'success'
                } else if (log.verified === 'UnVerified') {
                    status = 'failed'
                }
            }
        } else {
            // verifiedResult가 없는 경우 verified 필드로 판단
            if (log.verified === 'Verified') {
                status = 'success'
            } else if (log.verified === 'UnVerified') {
                status = 'failed'
            }
        }

        // 점수 부분을 제외한 메시지 추출
        let displayMessage = log.verifiedResult || ''
        if (displayMessage) {
            displayMessage = displayMessage.replace(/\[점수:\s*\d+\]\s*/, '').trim()
        }

        map[dateString] = {
            image: log.imageUrl,
            status: status,
            score: score,
            uploadedAt: log.createAt,
            verifiedResult: displayMessage,
            originalVerified: log.verified,
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
        .map((log) => {
            // logDate가 배열 형태인 경우 문자열로 변환
            if (Array.isArray(log.logDate)) {
                return `${log.logDate[0]}-${String(log.logDate[1]).padStart(2, '0')}-${String(log.logDate[2]).padStart(2, '0')}`
            }
            return log.logDate
        })
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
            status: certificationMap.value[dateString]?.status || null,
            score: certificationMap.value[dateString]?.score || 0,
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
            status: null,
            score: 0,
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

    // 오늘 데이터가 없으면 업로드 가능
    if (!todayData) {
        console.log('오늘 업로드 가능 여부: true (오늘 데이터 없음)')
        return true
    }

    // 오늘 이미지가 있으면 업로드 불가 (이미 업로드됨)
    if (todayData.image) {
        console.log('오늘 업로드 가능 여부: false (이미 업로드됨)', todayData)
        return false
    }

    // 오늘 이미지가 없으면 업로드 가능
    console.log('오늘 업로드 가능 여부: true (이미지 없음)', todayData)
    return true
})

// 오늘 이미 업로드했는지 여부
const hasUploadedToday = computed(() => {
    // 챌린지에 참여하지 않았으면 업로드하지 않은 것으로 간주
    if (!props.userChallengeId) {
        return false
    }

    const todayData = certificationDays.value.find((day) => day.isToday)

    // 오늘 데이터가 있고 이미지가 있으면 업로드됨
    return todayData && todayData.image
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

        // 업로드 로딩 상태 시작
        isUploading.value = true

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
    } finally {
        isUploading.value = false
    }
}

// 파일을 Data URL로 변환하는 함수
const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
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

        // 파일 유효성 검사
        if (!file || file.size === 0) {
            throw new Error('유효하지 않은 파일입니다.')
        }

        // 날짜 형식 검증
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(todayString)) {
            throw new Error('날짜 형식이 올바르지 않습니다.')
        }

        console.log('API 호출 전 데이터 검증:', {
            userChallengeId: props.userChallengeId,
            file: file.name,
            fileSize: file.size,
            fileType: file.type,
            date: todayString,
            dateValid: dateRegex.test(todayString),
        })

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

        // 백엔드 API 호출
        console.log('verifyChallenge API 호출 시작...')
        const result = await verifyChallenge(props.userChallengeId, formData)
        console.log('업로드 성공:', result)

        // 업로드 성공 후 서버에서 최신 로그 다시 가져오기
        console.log('최신 로그 데이터 다시 가져오기 시작...')
        await loadChallengeLogs(true) // 업로드 후 로딩 상태 표시

        return {
            imageUrl: result.imageUrl || result.data?.imageUrl,
            isApproved: result.verified || result.data?.verified,
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
