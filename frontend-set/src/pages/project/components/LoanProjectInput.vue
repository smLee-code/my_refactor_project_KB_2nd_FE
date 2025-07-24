<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">대출형 프로젝트 정보</h3>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                총 대출 원금 <span class="text-red-500">*</span>
            </label>
            <input
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="총 대출 원금을 입력하세요"
                required
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                상환 기간 (개월) <span class="text-red-500">*</span>
            </label>
            <input
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="총 상환 개월 수를 입력하세요"
                required
            />
        </div>
    </div>
</template>

<script setup>
// Props나 이벤트를 추가할 수 있습니다.
</script>