<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <!-- Chat Header -->
    <div class="bg-gradient-to-r from-[#FFD338] to-[#FFBC00] p-6">
      <div class="flex items-center gap-3">
        <div class="bg-white/20 p-2 rounded-full">
          <i class="ri-chat-3-line text-black w-5 h-5 flex items-center justify-center"></i>
        </div>
        <div>
          <h3 class="text-xl font-bold text-black">실시간 채팅</h3>
          <p class="text-black/80 text-sm">창작자와 후원자들과 소통해보세요</p>
        </div>
        <div class="ml-auto">
          <span class="bg-white/20 text-black px-3 py-1 rounded-full text-sm font-medium">
            {{ messages.length }}개 메시지
          </span>
        </div>
      </div>
    </div>

    <!-- Chat Messages -->
    <div class="h-96 overflow-y-auto p-6 space-y-4">
      <div v-for="msg in messages" :key="msg.id" :class="[`flex gap-3`, msg.user === '나' ? 'flex-row-reverse' : '']">
        <img
          :src="`https://readdy.ai/api/search-image?query=${msg.avatar}`"
          :alt="msg.user"
          class="w-10 h-10 rounded-full object-cover object-top flex-shrink-0"
        />
        <div :class="[`flex-1 max-w-xs`, msg.user === '나' ? 'text-right' : '']">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-medium text-gray-900">{{ msg.user }}</span>
            <span v-if="msg.isCreator" class="bg-[#6B5B4C] text-white px-2 py-0.5 text-xs rounded-full">
              창작자
            </span>
            <span class="text-xs text-gray-500">{{ msg.time }}</span>
          </div>
          <div :class="[`p-3 rounded-2xl`, 
            msg.user === '나' 
              ? 'bg-[#FFD338] text-black' 
              : msg.isCreator 
                ? 'bg-[#6B5B4C] text-white'
                : 'bg-gray-100 text-gray-900'
          ]">
            <p class="text-sm leading-relaxed">{{ msg.message }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex gap-3">
        <div class="flex-1 relative">
          <textarea
            v-model="message"
            @keypress="handleKeyPress"
            placeholder="메시지를 입력하세요..."
            class="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD338] focus:border-transparent text-sm"
            rows="2"
            maxlength="500"
          />
          <div class="absolute bottom-2 right-2 text-xs text-gray-400">
            {{ message.length }}/500
          </div>
        </div>
        <button
          @click="handleSendMessage"
          :disabled="!message.trim()"
          :class="[`px-6 py-3 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap`, 
            message.trim()
              ? 'bg-[#FFD338] hover:bg-[#FFBC00] text-black'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          ]"
        >
          전송
        </button>
      </div>
      
      <div class="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            실시간 연결됨
          </span>
          <span>참여자 42명</span>
        </div>
        <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
const messages = ref([
  {
    id: 1,
    user: "김후원자",
    avatar: "Friendly supporter profile picture, casual smile, modern background, approachable expression&width=100&height=100&seq=user1&orientation=squarish",
    message: "프로젝트 정말 기대됩니다! 언제쯤 배송 예정인가요?",
    time: "2분 전",
    isCreator: false
  },
  {
    id: 2,
    user: "김테크",
    avatar: "Professional tech entrepreneur portrait, friendly smile, modern office background, business casual attire, confident expression&width=100&height=100&seq=creator1&orientation=squarish",
    message: "감사합니다! 펀딩 성공 후 약 2-3개월 내에 배송 예정입니다.",
    time: "1분 전",
    isCreator: true
  },
  {
    id: 3,
    user: "박지원",
    avatar: "Young tech enthusiast profile, excited expression, modern casual style, bright background&width=100&height=100&seq=user2&orientation=squarish",
    message: "무선 충전 속도가 궁금해요. 기존 무선 충전기보다 빠른가요?",
    time: "30초 전",
    isCreator: false
  }
]);

const handleSendMessage = () => {
  if (message.value.trim()) {
    const newMessage = {
      id: messages.value.length + 1,
      user: "나",
      avatar: "User profile picture placeholder, neutral expression, simple background&width=100&height=100&seq=currentuser&orientation=squarish",
      message: message.value,
      time: "방금",
      isCreator: false
    };
    messages.value.push(newMessage);
    message.value = '';
  }
};

const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
