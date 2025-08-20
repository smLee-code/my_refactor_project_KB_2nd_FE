<template>
    <Card :title="title" :icon="icon" :iconColor="iconColor">
        <div class="flex items-center">
            <!-- 차트 -->
            <canvas ref="chartCanvas" class="flex-1 h-64" width="400" height="200"></canvas>

            <!-- 범례 -->
            <ul class="flex flex-col space-y-2 w-1/4 pl-4">
                <li v-for="item in chartData" :key="item.label" class="flex items-center text-sm">
                    <span
                        class="w-3 h-3 rounded-full mr-2"
                        :style="{ backgroundColor: item.color }"
                    ></span>
                    <span class="flex-1">{{ item.label }}</span>
                </li>

                <li>단위(일주일)</li>
            </ul>
        </div>
    </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from './Card.vue'
import axios from 'axios'

const chartData = ref([])

const props = defineProps({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    iconColor: { type: String, default: '#000' },
})

const chartCanvas = ref(null)

onMounted(async () => {
    try {
        const res = await axios.get('/project/trend')
        const raw = res.data // 여기서 raw 할당

        // 변환
        chartData.value = [
            { label: '저축', color: '#3B82F6', values: raw.Savings || [] },
            { label: '대출', color: '#10B981', values: raw.Loan || [] },
            { label: '기부', color: '#F59E0B', values: raw.Donation || [] },
            { label: '챌린지', color: '#8B5CF6', values: raw.Challenge || [] },
        ]
        console.log(`프로젝트 등록 추이`, res.data)

        drawChart()
    } catch (e) {
        console.error('그래프 데이터 로딩 실패:', e)
    }
})

function drawChart() {
    if (!chartCanvas.value) return
    const ctx = chartCanvas.value.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, chartCanvas.value.width, chartCanvas.value.height)

    const padding = 20
    const chartWidth = chartCanvas.value.width - padding * 2
    const chartHeight = chartCanvas.value.height - padding * 2

    const maxVal = Math.max(
        ...chartData.value.reduce((acc, cur) => acc.concat(cur.values || []), []),
    )

    // 세로 기준선 (주차 구분, 5주)
    const verticalLines = chartData.value[0]?.values.length - 1 || 4
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= verticalLines; i++) {
        const x = padding + (i / verticalLines) * chartWidth
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, chartHeight + padding)
        ctx.stroke()
    }

    // 가로 기준선
    const horizontalLines = 5
    for (let i = 0; i <= horizontalLines; i++) {
        const y = padding + (i / horizontalLines) * chartHeight
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(chartWidth + padding, y)
        ctx.stroke()
    }

    // 데이터 라인 + 값 그리기
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    chartData.value.forEach((series) => {
        ctx.strokeStyle = series.color
        ctx.lineWidth = 2
        ctx.beginPath()

        series.values.forEach((val, idx) => {
            const x = padding + (idx / (series.values.length - 1)) * chartWidth
            const y = chartHeight - (val / maxVal) * chartHeight + padding

            if (idx === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }

            // 값 표시
            ctx.fillStyle = series.color
            ctx.fillText(val, x, y - 5)
        })

        ctx.stroke()
    })
}
</script>

<style>
canvas {
    object-fit: contain;
}
</style>
