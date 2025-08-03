<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
    <div class="bg-gray-50 w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <div class="text-center px-4">
            <div class="mb-8">
                <i class="fas fa-map-signs text-6xl text-yellow-400 mb-4"></i>
                <h1 class="text-4xl font-bold text-gray-900 mb-2">페이지를 찾을 수 없습니다</h1>
                <p class="text-lg text-gray-600 mb-8">
                    요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                </p>
            </div>
            <div class="space-y-4">
                <router-link
                    to="/"
                    class="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 !rounded-button transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                    홈으로 돌아가기
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type='number'] {
    -moz-appearance: textfield;
}
@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
@media (max-width: 768px) {
    .text-3xl {
        font-size: 1.5rem;
        line-height: 2rem;
    }
    .text-2xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
    .p-6 {
        padding: 1rem;
    }
}
</style>
