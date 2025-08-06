<template>
    <Card :title="title" :icon="icon" :iconColor="iconColor">
        <div class="flex items-center">
            <!-- 차트 -->
            <canvas ref="chartCanvas" class="w-2/3 h-full"></canvas>

            <!-- 범례 -->
            <ul class="flex flex-col space-y-2 w-1/3 pl-4">
                <li v-for="item in chartData" :key="item.label" class="flex items-center text-sm">
                    <span
                        class="w-3 h-3 rounded-full mr-2"
                        :style="{ backgroundColor: item.color }"
                    ></span>
                    <span class="flex-1">{{ item.label }}</span>
                    <span class="font-semibold">{{ item.value }}%</span>
                </li>
            </ul>
        </div>
    </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from './Card.vue'

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    iconColor: {
        type: String,
        default: '#000',
    },
    chartType: {
        type: String, // 'line' 또는 'pie'
        required: true,
    },
    chartData: {
        type: Array,
        default: () => [],
    },
})

const chartCanvas = ref(null)

onMounted(() => {
    if (!chartCanvas.value) return
    const ctx = chartCanvas.value.getContext('2d')
    if (!ctx) return

    if (props.chartType === 'line') {
        ctx.strokeStyle = '#3B82F6'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(10, 30)
        ctx.lineTo(30, 20)
        ctx.lineTo(50, 35)
        ctx.lineTo(70, 15)
        ctx.lineTo(90, 25)
        ctx.stroke()
    } else if (props.chartType === 'pie') {
        const centerX = chartCanvas.value.width / 2
        const centerY = chartCanvas.value.height / 2
        const radius = 60
        let currentAngle = 0
        props.chartData.forEach((item) => {
            const sliceAngle = (item.value / 100) * 2 * Math.PI
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
            ctx.lineTo(centerX, centerY)
            ctx.fillStyle = item.color
            ctx.fill()
            currentAngle += sliceAngle
        })
    }
})
</script>

<style>
canvas {
    aspect-ratio: 1 / 1; /* 가로:세로 비율 고정 */
    object-fit: contain; /* 내용이 잘리지 않게 */
}
</style>

<!-- 그래프 아이콘 -->
<!-- fas fa-chart-line -->
