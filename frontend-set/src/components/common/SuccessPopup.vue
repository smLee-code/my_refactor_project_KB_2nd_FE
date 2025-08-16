<template>
    <Transition name="popup">
        <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- 배경 오버레이 -->
            <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="handleClose"></div>
            
            <!-- 팝업 컨텐츠 -->
            <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all">
                <!-- 성공 아이콘 애니메이션 -->
                <div class="flex justify-center mb-6">
                    <div class="success-icon-wrapper">
                        <div class="success-icon">
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                        <!-- 반짝이는 별 효과 -->
                        <div class="sparkles">
                            <div class="sparkle sparkle-1">✨</div>
                            <div class="sparkle sparkle-2">⭐</div>
                            <div class="sparkle sparkle-3">✨</div>
                            <div class="sparkle sparkle-4">⭐</div>
                        </div>
                    </div>
                </div>
                
                <!-- 메시지 -->
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ title }}</h2>
                    <p class="text-gray-600">{{ message }}</p>
                </div>
                
                <!-- 서브 메시지 (선택적) -->
                <div v-if="subMessage" class="bg-yellow-50 rounded-lg p-4">
                    <p class="text-sm text-yellow-800 text-center">{{ subMessage }}</p>
                </div>
                
                <!-- 축하 이모지 애니메이션 -->
                <div class="celebration-emojis">
                    <span class="emoji emoji-1">🎉</span>
                    <span class="emoji emoji-2">🎊</span>
                    <span class="emoji emoji-3">🎈</span>
                    <span class="emoji emoji-4">🎁</span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '성공!'
    },
    message: {
        type: String,
        default: '작업이 완료되었습니다.'
    },
    subMessage: {
        type: String,
        default: ''
    },
    autoClose: {
        type: Boolean,
        default: true
    },
    autoCloseDelay: {
        type: Number,
        default: 2000
    }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

const isVisible = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
    isVisible.value = newVal
    if (newVal && props.autoClose) {
        setTimeout(() => {
            emit('confirm')
            handleClose()
        }, props.autoCloseDelay)
    }
})

const handleClose = () => {
    isVisible.value = false
    emit('update:modelValue', false)
    emit('close')
}
</script>

<style scoped>
/* 팝업 트랜지션 */
.popup-enter-active,
.popup-leave-active {
    transition: all 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

/* 성공 아이콘 래퍼 */
.success-icon-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
}

/* 성공 아이콘 */
.success-icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: scaleIn 0.5s ease-out;
}

/* 체크마크 SVG */
.checkmark {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: white;
    stroke-miterlimit: 10;
}

.checkmark-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: white;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
}

.checkmark-check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.9s forwards;
}

/* 반짝이는 별 효과 */
.sparkles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
}

.sparkle {
    position: absolute;
    font-size: 20px;
    animation: sparkle 2s ease-in-out infinite;
}

.sparkle-1 {
    top: -10px;
    left: -10px;
    animation-delay: 0s;
}

.sparkle-2 {
    top: -10px;
    right: -10px;
    animation-delay: 0.5s;
}

.sparkle-3 {
    bottom: -10px;
    left: -10px;
    animation-delay: 1s;
}

.sparkle-4 {
    bottom: -10px;
    right: -10px;
    animation-delay: 1.5s;
}

/* 축하 이모지 */
.celebration-emojis {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    overflow: hidden;
}

.emoji {
    position: absolute;
    font-size: 30px;
    animation: float 3s ease-in-out infinite;
}

.emoji-1 {
    top: 20%;
    left: -50px;
    animation-delay: 0s;
}

.emoji-2 {
    top: 60%;
    right: -50px;
    animation-delay: 0.7s;
}

.emoji-3 {
    top: 40%;
    left: -50px;
    animation-delay: 1.4s;
}

.emoji-4 {
    top: 80%;
    right: -50px;
    animation-delay: 2.1s;
}

/* 애니메이션 정의 */
@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes scaleIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes sparkle {
    0%, 100% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
    }
}

@keyframes float {
    0% {
        transform: translateX(0) translateY(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(100px) translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}

/* 반응형 */
@media (max-width: 640px) {
    .success-icon-wrapper {
        width: 80px;
        height: 80px;
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
    }
    
    .checkmark {
        width: 50px;
        height: 50px;
    }
    
    .sparkle {
        font-size: 16px;
    }
    
    .emoji {
        font-size: 24px;
    }
}
</style>