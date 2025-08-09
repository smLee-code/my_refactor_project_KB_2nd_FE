<template>
    <div class="min-h-screen bg-[#EBEEF0]">
        <main class="p-6">
            <div
                class="grid grid-cols-3 grid-rows-2 gap-6 max-w-7xl mx-auto auto-rows-fr h-[700px]"
            >
                <!-- 1열 (펀딩 관리) - 세로 병합 -->
                <div class="bg-white rounded-xl shadow-sm p-6 row-span-2 h-full overflow-y-auto">
                    <DashboardCard
                        title="펀딩 관리"
                        icon="fas fa-coins text-amber-600 text-xl"
                        iconColor="#2563EB"
                        :totalFunding="1230"
                        :activeFunding="160"
                    />
                </div>

                <!-- 2열 (프로젝트 순위) - 세로 병합 -->
                <div class="bg-white rounded-xl shadow-sm p-6 row-span-2 h-full overflow-y-auto">
                    <PopularProjectCard
                        title="프로젝트 순위"
                        icon="fas fa-fire text-orange-500 text-xl"
                        iconColor="red"
                    />
                </div>

                <!-- 3열-1행: 파이차트 -->
                <!-- 현재 시점의 프로젝트 유형별 점유율 -->
                <PieChart
                    class="h-full"
                    title="프로젝트 유형별 점유율 "
                    icon="fas fa-chart-pie"
                    iconColor="green"
                />

                <!-- 3열-2행: 라인차트 -->
                <!-- 최근 6개월간 변화: 지금은 대출형이 40%지만, 지난 6개월간 점점 증가하고 있다. -->
                <LineChart
                    class="h-full"
                    title="프로젝트 등록 추이"
                    icon="fas fa-chart-line"
                    iconColor="green"
                />
            </div>
        </main>
        <div class="grid grid-cols-1 grid-rows-1 gap-6 max-w-7xl mx-auto auto-rows-fr max-auto">
            <TableFundingStatus
                title="펀딩 리포트"
                icon="fas fa-file-signature"
                iconColor="olivedrab"
                :headers="['펀딩명', '타입', '진행률', '참여자', '마감일', '상태', '상세보기']"
                :data="[
                    {
                        name: '청년 창업 지원 적금',
                        type: '적금',
                        progressColor: '#22C55E',
                        progress: 83,
                        participants: 1234,
                        deadline: '2024-02-15',
                        status: '진행중',
                        statusBg: '#287EFF',
                        statusColor: '#fff',
                    },
                ]"
            ></TableFundingStatus>
        </div>
    </div>
</template>

<script setup>
import DashboardCard from '@/components/mypage/DashboardCard.vue'
import PopularProjectCard from './PopularProjectCard.vue'
import TableFundingStatus from '@/components/mypage/TableFundingStatus.vue'
import PieChart from '@/components/mypage/PieChart.vue'
import LineChart from '@/components/mypage/LineChart.vue'
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(async () => {
    try {
        const res = await axios.get('/fund/my/fund/all', {
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
