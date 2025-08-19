<template>
    <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">나의 기부 내역</h2>

        <div
            v-if="!donations || donations.length === 0"
            class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200"
        >
            <i class="fas fa-hand-holding-heart text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-600">아직 참여한 기부 내역이 없습니다.</p>
        </div>

        <div
            v-else
            class="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200"
        >
            <div
                v-for="donation in donations"
                :key="donation.id"
                class="p-4 flex items-center space-x-4 transition-colors hover:bg-gray-50"
            >
                <img
                    :src="donation.thumbnail"
                    alt="기부 썸네일"
                    class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-500 truncate">To: {{ donation.recipient }}</p>
                    <h3 class="font-semibold text-gray-900 truncate">{{ donation.title }}</h3>
                </div>
                <div class="text-right flex-shrink-0">
                    <p class="text-lg font-bold text-green-600">
                        {{ donation.amount.toLocaleString() }}원
                    </p>
                    <p class="text-xs text-gray-500">기부 완료</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    donations: {
        type: Array,
        required: true,
    },
})
</script>
