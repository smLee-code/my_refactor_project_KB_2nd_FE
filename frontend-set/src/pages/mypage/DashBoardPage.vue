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
                        :totalFunding="1230"
                        :activeFunding="160"
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
                    :data="[
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
                    ]"
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

const authStore = useAuthStore()
const myfund = ref([])

onMounted(async () => {
    // onMounted는 클라이언트 사이드에서만 실행되므로, authStore.token 접근이 안전합니다.
    if (!authStore.token) {
        console.log('토큰이 없어 내 펀딩 조회를 건너뜁니다.')
        return
    }

    try {
        const res = await axios.get('/api/fund/my/fund/all', {
            // /api 프리픽스 추가 가정
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        })
        myfund.value = res.data
        console.log(`내 펀딩 관리: `, res.data)
    } catch (err) {
        console.log(`내 펀딩 실패:`, err)
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
