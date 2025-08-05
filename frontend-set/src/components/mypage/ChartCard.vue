<template>
    <DashboardCard :title="title" :icon="icon" :iconColor="iconColor">
        <canvas ref="chartCanvas" class="w-full h-full"></canvas>
    </DashboardCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DashboardCard from './DashboardCard.vue'

const props = defineProps<{
    title: string
    icon: string
    iconColor?: string
    chartType: 'line' | 'pie'
    chartData: any
}>()

const chartCanvas = ref<HTMLCanvasElement>()

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
        props.chartData.forEach((item: any) => {
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
