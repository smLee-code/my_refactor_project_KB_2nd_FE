<template>
    <div class="flex items-center space-x-3 p-2 rounded-lg" :class="rankBgStyle(rank - 1)">
        <span class="text-xl font-bold" :class="rankIndexStyle(rank - 1)">{{ rank }}</span>
        <div class="flex-1">
            <div class="text-sm font-medium text-gray-800">
                {{ title }}
            </div>

            <div class="text-xs text-gray-600 flex items-center gap-3">
                참여자 {{ voteCount }}명
            </div>
        </div>
        <span class="text-[11px] text-grey-600 bg-gray-100 px-1.5 py-1 rounded-full"
            >{{ typeMap[projectType] }}형</span
        >
    </div>
</template>
<script setup>
const props = defineProps({
    projectId: Number,
    rank: Number,
    title: String,
    description: String,
    participants: Number,
    image: String,
    projectType: String,
    voteCount: Number,
})

const typeMap = {
    Savings: '저축',
    Loan: '대출',
    Challenge: '챌린지',
    Donation: '기부',
}

function rankIndexStyle(index) {
    if (index === 0) return 'text-amber-600 '
    if (index === 1) return 'text-gray-500'
    if (index === 2) return 'text-gray-500'
    return 'text-gray-400'
}

function rankBgStyle(index) {
    if (index === 0) return 'bg-orange-50'
    if (index === 1) return 'bg-yellow-50'
    if (index === 2) return 'bg-yellow-50'
    return 'text-gray-600'
}
</script>
