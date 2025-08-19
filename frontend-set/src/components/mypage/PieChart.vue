<template>
    <Card :title="title" :icon="icon" :iconColor="iconColor">
        <div class="flex items-center">
            <!-- 차트 -->
            <canvas ref="chartCanvas" class="w-2/3 h-full"></canvas>

            <!-- 범례 -->
            <ul class="flex flex-col space-y-2 w-1/3 pl-4">
                <li
                    v-for="item in distribution"
                    :key="item.label"
                    class="flex items-center text-sm"
                >
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
import { nextTick } from 'vue'
import Card from './Card.vue'
import axios from 'axios'

const distribution = ref([])

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
})

const chartCanvas = ref(null)

onMounted(async () => {
    try {
        const res = await axios.get('/project/distribution/type')
        distribution.value = res.data
        console.log(`프로젝트 유형별 점유율:`, res.data)
        // DOM 업데이트 이후 차트 그리기
        await nextTick()
        drawChart()
    } catch (e) {}
})

function drawChart() {
    if (!chartCanvas.value) return
    const ctx = chartCanvas.value.getContext('2d')
    if (!ctx) return

    // 반지름은 캔버스 크기에 맞게 조정
    const radius = Math.min(chartCanvas.value.width, chartCanvas.value.height) / 2 - 10
    const centerX = chartCanvas.value.width / 2
    const centerY = chartCanvas.value.height / 2
    let currentAngle = 0

    distribution.value.forEach((item) => {
        const sliceAngle = (item.value / 100) * 2 * Math.PI
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
        ctx.closePath()
        ctx.fillStyle = item.color || '#ccc' // 0%도 표시
        ctx.fill()
        currentAngle += sliceAngle
    })
}
</script>

<style>
canvas {
    aspect-ratio: 1 / 1; /* 가로:세로 비율 고정 */
    object-fit: contain; /* 내용이 잘리지 않게 */
}
</style>
