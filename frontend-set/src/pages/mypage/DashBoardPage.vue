<template>
    <div class="min-h-screen bg-[#EBEEF0]">
        <main class="p-6">
            <div
                class="grid grid-cols-3 grid-rows-2 gap-6 max-w-7xl mx-auto auto-rows-fr h-[700px]"
            >
                <div
                    class="bg-white rounded-xl shadow-sm p-6 row-span-2 h-full overflow-y-auto flex flex-col"
                >
                    <DashboardCard
                        title="펀딩 관리"
                        icon="fas fa-coins text-amber-600 text-xl"
                        iconColor="#2563EB"
                        :totalFunding="fundingStats.totalFunding"
                        :progressFunding="fundingStats.progressFunding"
                        :urgentFunding="fundingStats.urgentFunding"
                        :todayProducts="fundingStats.todayProducts"
                        :recentFunding="fundingStats.recentFunding"
                        :bestFunding="fundingStats.bestFunding"
                        :recentFundingId="fundingStats.recentFundingId"
                        :bestFundingId="fundingStats.bestFundingId"
                    />

                    <div
                        v-if="authStore.userRole === 'ROLE_FINANCE'"
                        class="mt-8 pt-6 border-t border-gray-200"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-bold text-gray-800 flex items-center">
                                <i class="fas fa-landmark text-blue-600 text-xl mr-3"></i>
                                내 대출 상품 관리
                            </h3>
                        </div>
                        <p class="text-sm text-gray-600 mb-5">
                            직접 생성한 대출 상품 목록을 확인하고 신청 내역을 관리합니다.
                        </p>
                        <router-link
                            to="/admin/my-loans"
                            class="w-full text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 block"
                        >
                            관리 페이지로 이동
                        </router-link>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-6 row-span-2 h-full overflow-y-auto">
                    <PopularProjectCard
                        title="프로젝트 순위"
                        icon="fas fa-fire text-orange-500 text-xl"
                        iconColor="red"
                    />
                </div>

                <PieChart
                    class="h-full"
                    title="프로젝트 유형별 점유율"
                    icon="fas fa-chart-pie"
                    iconColor="green"
                />

                <LineChart
                    class="h-full"
                    title="프로젝트 등록 추이"
                    icon="fas fa-chart-line"
                    iconColor="green"
                />
            </div>

            <div class="grid grid-cols-1 grid-rows-1 gap-6 max-w-7xl mx-auto mt-6">
                <TableFundingStatus
                    title="펀딩 리포트"
                    icon="fas fa-file-signature"
                    iconColor="olivedrab"
                    :headers="['펀딩명', '타입', '진행률', '참여자', '마감일', '상태', '상세보기']"
                    :data="myFundingList"
                ></TableFundingStatus>
            </div>
        </main>
    </div>
</template>

<script setup>
import DashboardCard from '@/components/mypage/DashboardCard.vue'
import PopularProjectCard from './PopularProjectCard.vue'
import TableFundingStatus from '@/components/mypage/TableFundingStatus.vue'
import PieChart from '@/components/mypage/PieChart.vue'
import LineChart from '@/components/mypage/LineChart.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { calculateFundingProgress } from '@/utils/fundingUtils'

const authStore = useAuthStore()
const myfund = ref([])
const myFundingList = ref([])

// 펀딩 통계 데이터
const fundingStats = ref({
    totalFunding: 0,
    progressFunding: 0,
    urgentFunding: 0,
    todayProducts: 0,
    recentFunding: '',
    bestFunding: '',
    recentFundingId: null,
    bestFundingId: null
})

// 펀딩 타입 한글 변환
const getFundTypeKorean = (type) => {
    const typeMap = {
        Savings: '저축',
        Loan: '대출',
        Challenge: '챌린지',
        Donation: '기부'
    }
    return typeMap[type] || type
}

onMounted(async () => {
    // onMounted는 클라이언트 사이드에서만 실행되므로, authStore.token 접근이 안전합니다.
    if (!authStore.token) {
        console.log('토큰이 없어 내 펀딩 조회를 건너뜁니다.')
        return
    }

    try {
        // 내 펀딩 목록 가져오기
        const res = await axios.get('/fund/my/fund/all', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        })
        myfund.value = res.data
        console.log(`내 펀딩 관리: `, res.data)
        
        // 전체 펀딩 목록 가져오기 (통계용)
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
        const allFundingsRes = await axios.get(`${baseURL}/api/fund/list`, {
            params: { progress: 'Launch' }
        })
        const allFundings = allFundingsRes.data || []
        console.log('전체 펀딩 목록:', allFundings)
        
        // 펀딩 리포트 테이블용 데이터 변환 - 각 펀딩의 상세 정보를 가져옴
        if (res.data && res.data.length > 0) {
            const fundingPromises = res.data.map(async (fund) => {
                try {
                    // 각 펀딩의 상세 정보 API 호출
                    const detailRes = await axios.get(`/fund/${fund.fundId}`, {
                        headers: {
                            Authorization: `Bearer ${authStore.token}`,
                        },
                    })
                    const detailData = detailRes.data
                    console.log(`펀딩 상세 정보 (${fund.fundId}):`, detailData)
                    
                    // 날짜 배열을 Date 객체로 변환하는 함수
                    const arrayToDate = (dateArray) => {
                        if (!dateArray || dateArray.length < 3) return null
                        const [year, month, day] = dateArray
                        return new Date(year, month - 1, day)
                    }
                    
                    // 남은 일수 계산
                    const calculateDaysLeft = (endAt) => {
                        if (!endAt || endAt.length < 3) return 0
                        const endDate = arrayToDate(endAt)
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        endDate.setHours(0, 0, 0, 0)
                        const diffTime = endDate - today
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                        return diffDays
                    }
                    
                    const daysLeft = calculateDaysLeft(detailData.endAt)
                    
                    // 진행률 계산 (펀딩 유틸 함수 사용)
                    const progress = calculateFundingProgress(detailData)
                    
                    // 마감일 표시 형식 (날짜 배열을 년월일로 변환)
                    const formatDateArray = (dateArray) => {
                        if (!dateArray || dateArray.length < 3) return '-'
                        const [year, month, day] = dateArray
                        return `${year}년 ${month}월 ${day}일`
                    }
                    
                    const deadlineText = formatDateArray(detailData.endAt)
                    
                    return {
                        name: fund.productName || detailData.name || '상품명 없음',
                        type: getFundTypeKorean(fund.fundType),
                        progressColor: '#FFC107', // 노란색으로 통일
                        progress: Math.round(progress),
                        participants: detailData.participantCount || 0, // 상세 API에서 참여자 수 가져옴
                        deadline: deadlineText,
                        status: fund.progress === 'Launch' ? '진행중' : '종료',
                        statusBg: fund.progress === 'Launch' ? '#287EFF' : '#6C757D',
                        statusColor: '#fff',
                        fundId: fund.fundId,
                        financialInstitution: fund.financialInstitution
                    }
                } catch (detailErr) {
                    console.error(`펀딩 ${fund.fundId} 상세 정보 조회 실패:`, detailErr)
                    
                    // 상세 정보 조회 실패 시 기본값 사용
                    const now = new Date()
                    const endDate = new Date(fund.endAt)
                    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))
                    
                    return {
                        name: fund.productName || '상품명 없음',
                        type: getFundTypeKorean(fund.fundType),
                        progressColor: '#6C757D',
                        progress: 0,
                        participants: 0,
                        deadline: daysLeft > 0 ? `D-${daysLeft}` : '종료됨',
                        status: fund.progress === 'Launch' ? '진행중' : '종료',
                        statusBg: fund.progress === 'Launch' ? '#287EFF' : '#6C757D',
                        statusColor: '#fff',
                        fundId: fund.fundId,
                        financialInstitution: fund.financialInstitution
                    }
                }
            })
            
            // 모든 Promise가 완료될 때까지 대기
            myFundingList.value = await Promise.all(fundingPromises)
            
            // 펀딩 통계 계산
            // 총 펀딩 수와 진행 중인 펀딩은 전체 펀딩 기준
            fundingStats.value.totalFunding = allFundings.length
            fundingStats.value.progressFunding = allFundings.filter(f => f.progress === 'Launch').length
            
            // 마감 임박 (7일 이내) 펀딩 계산 - 내 펀딩 중에서
            const urgentFundings = myFundingList.value.filter(f => {
                const deadline = f.deadline
                if (deadline.startsWith('D-')) {
                    const days = parseInt(deadline.replace('D-', ''))
                    return days <= 7 && days > 0
                }
                return false
            })
            fundingStats.value.urgentFunding = urgentFundings.length
            
            // 오늘 등록된 펀딩 계산 (launchAt이 오늘인 펀딩) - 내 펀딩 중에서
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            
            const todayFundings = res.data.filter(fund => {
                const launchDate = new Date(fund.launchAt)
                return launchDate >= today && launchDate < tomorrow
            })
            fundingStats.value.todayProducts = todayFundings.length
            
            // 최근 생성된 펀딩 2개 (launchAt 기준 정렬)
            const sortedByRecent = [...res.data].sort((a, b) => {
                const dateA = new Date(a.launchAt)
                const dateB = new Date(b.launchAt)
                return dateB - dateA // 최신순
            })
            
            if (sortedByRecent.length > 0) {
                fundingStats.value.recentFunding = sortedByRecent[0].productName || '없음'
                fundingStats.value.recentFundingId = sortedByRecent[0].fundId
            }
            if (sortedByRecent.length > 1) {
                fundingStats.value.bestFunding = sortedByRecent[1].productName || '없음'
                fundingStats.value.bestFundingId = sortedByRecent[1].fundId
            }
        } else {
            // 데이터가 없을 경우 기본값
            myFundingList.value = [
                {
                    name: '청년 창업 지원 저축',
                    type: '저축',
                    progressColor: '#22C55E',
                    progress: 83,
                    participants: 1234,
                    deadline: '2025-02-15',
                    status: '진행중',
                    statusBg: '#287EFF',
                    statusColor: '#fff',
                },
            ]
        }
    } catch (err) {
        console.log(`내 펀딩 실패:`, err)
        // 에러 시 기본값
        myFundingList.value = [
            {
                name: '청년 창업 지원 저축',
                type: '저축',
                progressColor: '#22C55E',
                progress: 83,
                participants: 1234,
                deadline: '2025-02-15',
                status: '진행중',
                statusBg: '#287EFF',
                statusColor: '#fff',
            },
        ]
    }
})
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
    background: #dde1e4;
    border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #484b51;
    border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #262b2c;
}
</style>
