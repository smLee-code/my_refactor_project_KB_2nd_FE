<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="min-h-screen bg-[#EBEEF0]">
        <!-- 메인 콘텐츠 -->
        <main class="p-6">
            <div class="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
                <!-- 대시보드 카드 -->
                <DashboardCard
                    title="대시보드"
                    icon="fas fa-chart-line"
                    iconColor="#2563EB"
                    :totalFunding="1230"
                    :activeFunding="160"
                ></DashboardCard>

                <!-- 펀딩 관리 카드 -->
                <div
                    class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">펀딩 관리</h3>
                        <i class="fas fa-coins text-amber-600 text-xl"></i>
                    </div>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">진행 중인 펀딩</span>
                            <span class="text-2xl font-bold text-amber-600">42</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">마감 임박</span>
                            <span class="text-lg font-semibold text-red-500">8</span>
                        </div>
                        <div class="bg-amber-50 rounded-lg p-3">
                            <div class="text-xs text-amber-700 mb-1">최근 생성된 펀딩</div>
                            <div class="text-sm font-medium text-amber-800">
                                청년 창업 지원 펀딩
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 사용자 관리 카드 -->
                <div
                    class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">사용자 관리</h3>
                        <i class="fas fa-users text-green-600 text-xl"></i>
                    </div>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">총 참여자</span>
                            <div class="text-right">
                                <span class="text-2xl font-bold text-green-600">89,012</span>
                                <span class="text-green-500 text-sm ml-2">↗ +15%</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">신규 가입</span>
                            <span class="text-lg font-semibold text-blue-600">1,234</span>
                        </div>
                        <div class="bg-green-50 rounded-lg p-3">
                            <div class="text-xs text-green-700 mb-1">이번 주 활성 사용자</div>
                            <div class="text-sm font-medium text-green-800">15,678명</div>
                        </div>
                    </div>
                </div>
                <!-- 통계 분석 카드 -->
                <div
                    class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">통계 분석</h3>
                        <i class="fas fa-chart-pie text-purple-600 text-xl"></i>
                    </div>
                    <div class="h-40">
                        <canvas ref="pieChart" class="w-full h-full"></canvas>
                    </div>
                    <div class="mt-3 text-center">
                        <div class="text-xs text-gray-600">펀딩 타입별 분포</div>
                    </div>
                </div>
                <!-- 상품 관리 카드 -->
                <div
                    class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">상품 관리</h3>
                        <i class="fas fa-box text-indigo-600 text-xl"></i>
                    </div>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">등록된 상품</span>
                            <span class="text-2xl font-bold text-indigo-600">156</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">인기 상품</span>
                            <span class="text-lg font-semibold text-orange-500">23</span>
                        </div>
                        <div class="bg-indigo-50 rounded-lg p-3">
                            <div class="text-xs text-indigo-700 mb-1">이번 달 베스트</div>
                            <div class="text-sm font-medium text-indigo-800">청년 적금 플러스</div>
                        </div>
                    </div>
                </div>
                <!-- 인기 프로젝트 카드 -->
                <div
                    class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">인기 프로젝트</h3>
                        <i class="fas fa-fire text-orange-500 text-xl"></i>
                    </div>
                    <div class="space-y-2">
                        <div class="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">
                            <span class="text-xl font-bold text-orange-500">1</span>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-800">
                                    청년 창업 지원 펀딩
                                </div>
                                <div class="text-xs text-gray-600">참여자 2,345명</div>
                            </div>
                            <span class="text-green-500">↑ 12%</span>
                        </div>
                        <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                            <span class="text-xl font-bold text-gray-400">2</span>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-800">
                                    소상공인 대출 지원
                                </div>
                                <div class="text-xs text-gray-600">참여자 1,892명</div>
                            </div>
                            <span class="text-green-500">↑ 8%</span>
                        </div>
                        <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                            <span class="text-xl font-bold text-[#CD7F32]">3</span>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-800">
                                    스타트업 성장 펀드
                                </div>
                                <div class="text-xs text-gray-600">참여자 1,654명</div>
                            </div>
                            <span class="text-green-500">↑ 5%</span>
                        </div>
                        <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                            <span class="text-xl font-bold text-gray-400">4</span>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-800">
                                    환경 보호 프로젝트
                                </div>
                                <div class="text-xs text-gray-600">참여자 1,234명</div>
                            </div>
                            <span class="text-red-500">↓ 2%</span>
                        </div>
                        <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                            <span class="text-xl font-bold text-gray-400">5</span>
                            <div class="flex-1">
                                <div class="text-sm font-medium text-gray-800">
                                    디지털 혁신 펀드
                                </div>
                                <div class="text-xs text-gray-600">참여자 1,123명</div>
                            </div>
                            <span class="text-green-500">↑ 3%</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 최근 펀딩 현황 테이블 -->
            <!-- <div class="mt-8 bg-white rounded-xl shadow-sm p-6 max-w-7xl mx-auto">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">최근 펀딩 현황</h3>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    펀딩명
                                </th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    타입
                                </th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    진행률
                                </th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    참여자
                                </th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    마감일
                                </th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    상태
                                </th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-gray-700">
                                    관리
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b hover:bg-blue-50 transition-colors">
                                <td class="py-3 px-4 text-sm text-gray-800">청년 창업 지원 적금</td>
                                <td class="py-3 px-4 text-sm text-gray-600">적금</td>
                                <td class="py-3 px-4">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                class="bg-green-500 h-2 rounded-full"
                                                style="width: 85%"
                                            ></div>
                                        </div>
                                        <span class="text-sm text-gray-600">85%</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-sm text-gray-600">1,234명</td>
                                <td class="py-3 px-4 text-sm text-gray-600">2024-02-15</td>
                                <td class="py-3 px-4">
                                    <span
                                        class="bg-[#287EFF] text-white text-xs px-2 py-1 rounded-full"
                                        >진행중</span
                                    >
                                </td>
                                <td class="py-3 px-4">
                                    <button
                                        class="text-[#287EFF] hover:text-[#1B5FBF] text-sm cursor-pointer !rounded-button whitespace-nowrap px-2 py-1"
                                    >
                                        관리
                                    </button>
                                </td>
                            </tr>
                            <tr class="border-b hover:bg-blue-50 transition-colors">
                                <td class="py-3 px-4 text-sm text-gray-800">소상공인 창업 대출</td>
                                <td class="py-3 px-4 text-sm text-gray-600">대출</td>
                                <td class="py-3 px-4">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                class="bg-[#FFBC00] h-2 rounded-full"
                                                style="width: 92%"
                                            ></div>
                                        </div>
                                        <span class="text-sm text-gray-600">92%</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-sm text-gray-600">567명</td>
                                <td class="py-3 px-4 text-sm text-gray-600">2024-01-28</td>
                                <td class="py-3 px-4">
                                    <span
                                        class="bg-[#FFD338] text-[#262B2C] text-xs px-2 py-1 rounded-full"
                                        >마감임박</span
                                    >
                                </td>
                                <td class="py-3 px-4">
                                    <button
                                        class="text-[#287EFF] hover:text-[#1B5FBF] text-sm cursor-pointer !rounded-button whitespace-nowrap px-2 py-1"
                                    >
                                        관리
                                    </button>
                                </td>
                            </tr>
                            <tr class="border-b hover:bg-blue-50 transition-colors">
                                <td class="py-3 px-4 text-sm text-gray-800">환경보호 기부 펀딩</td>
                                <td class="py-3 px-4 text-sm text-gray-600">기부</td>
                                <td class="py-3 px-4">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                class="bg-purple-500 h-2 rounded-full"
                                                style="width: 67%"
                                            ></div>
                                        </div>
                                        <span class="text-sm text-gray-600">67%</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-sm text-gray-600">2,891명</td>
                                <td class="py-3 px-4 text-sm text-gray-600">2024-03-10</td>
                                <td class="py-3 px-4">
                                    <span
                                        class="bg-[#287EFF] text-white text-xs px-2 py-1 rounded-full"
                                        >진행중</span
                                    >
                                </td>
                                <td class="py-3 px-4">
                                    <button
                                        class="text-[#287EFF] hover:text-[#1B5FBF] text-sm cursor-pointer !rounded-button whitespace-nowrap px-2 py-1"
                                    >
                                        관리
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> -->
            <TableFundingStatus
                :headers="['펀딩명', '타입', '진행률', '참여자', '마감일', '상태', '관리']"
                :data="[
                    {
                        name: '청년 창업 지원 적금',
                        type: '적금',
                        progressColor: '#22C55E',
                        participants: 1234,
                        deadline: '2024-02-15',
                        status: '진행중',
                        statusBg: '#287EFF',
                        statusColor: '#fff',
                    },
                ]"
            ></TableFundingStatus>
        </main>
    </div>
</template>
<script lang="ts" setup>
import DashboardCard from '@/components/mypage/DashboardCard.vue'
import ChartCard from '@/components/mypage/ChartCard.vue'
import TableFundingStatus from '@/components/mypage/TableFundingStatus.vue'

import { ref, onMounted } from 'vue'
const dashboardChart = ref<HTMLCanvasElement>()
const pieChart = ref<HTMLCanvasElement>()
onMounted(() => {
    // 대시보드 미니 차트 그리기
    if (dashboardChart.value) {
        const ctx = dashboardChart.value.getContext('2d')
        if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, dashboardChart.value.width, 0)
            gradient.addColorStop(0, '#3B82F6')
            gradient.addColorStop(1, '#8B5CF6')
            ctx.strokeStyle = gradient
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(10, 30)
            ctx.lineTo(30, 20)
            ctx.lineTo(50, 35)
            ctx.lineTo(70, 15)
            ctx.lineTo(90, 25)
            ctx.stroke()
        }
    }
    // 파이 차트 그리기
    if (pieChart.value) {
        const ctx = pieChart.value.getContext('2d')
        if (ctx) {
            const centerX = pieChart.value.width / 2
            const centerY = pieChart.value.height / 2
            const radius = 60
            const data = [
                { label: '적금', value: 40, color: '#3B82F6' },
                { label: '대출', value: 35, color: '#10B981' },
                { label: '기부', value: 15, color: '#F59E0B' },
                { label: '기타', value: 10, color: '#8B5CF6' },
            ]
            let currentAngle = 0
            data.forEach((item) => {
                const sliceAngle = (item.value / 100) * 2 * Math.PI
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
                ctx.lineTo(centerX, centerY)
                ctx.fillStyle = item.color
                ctx.fill()
                currentAngle += sliceAngle
            })
        }
    }
})
</script>
<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
/* 스크롤바 스타일링 */
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
/* 테이블 호버 효과 */
tbody tr:hover {
    background-color: #ebeef0;
}
/* 카드 호버 효과 */
.hover\:shadow-md:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
/* 반응형 처리 */
@media (max-width: 1024px) {
    .grid-cols-3 {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 768px) {
    .grid-cols-3 {
        grid-template-columns: 1fr;
    }
}
</style>
