<template>
  <div class="chat-box">
    <div v-for="msg in messages" :key="msg.id">
      <b>{{ msg.sender }}:</b> {{ msg.content }} <small>({{ msg.timestamp }})</small>
    </div>
    <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="메시지를 입력하세요" />
    <button @click="sendMessage">전송</button>
  </div>

  <!-- 실시간 채팅 섹션 -->
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">실시간 채팅</h3>
    <!-- 채팅 메시지 영역 -->
    <div class="h-96 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4 space-y-4">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="[
          'flex items-start space-x-3',
          msg.isSelf ? 'flex-row-reverse space-x-reverse' : '',
        ]"
      >
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <i class="fas fa-user text-gray-600 text-sm"></i>
          </div>
        </div>
        <div :class="['max-w-[70%]', msg.isSelf ? 'items-end' : 'items-start']">
          <div class="flex items-center space-x-2 mb-1">
            <span class="font-medium text-gray-900">{{ msg.author }}</span>
            <span class="text-gray-500 text-xs">{{ msg.time }}</span>
          </div>
          <div
            :class="[
              'p-3 rounded-lg break-words',
              msg.isSelf ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200',
            ]"
          >
            {{ msg.content }} <small>({{ msg.timestamp }})</small>
          </div>
        </div>
      </div>
    </div>
    <!-- 메시지 입력 영역 -->
    <div class="relative">
      <input
        v-model="inputMessage"
        type="text"
        placeholder="메시지를 입력하세요..."
        class="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 !rounded-button font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap transition-all"
      >
        <i class="fas fa-paper-plane">전송</i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Stomp from 'stompjs'
import api from '@/api'
import axios from 'axios'

const props = defineProps({
  roomId: Number,
})

const inputMessage = ref('')
const messages = ref([])
const stompClient = ref(null)

// const loadHistory = async () => {
//   try {
//     const res = await axios.get(`/chat/history/${props.roomId}`)
//     messages.value = res.data
//     console.log('불러온 메시지:', res.data)
//   } catch (error) {
//     console.error('채팅 내역 불러오기 실패:', error)
//   }
// }

const loadHistory = async () => {
  try {
    // const token = localStorage.getItem('jwt')
    // if (!token) throw new Error('JWT 토큰 없음')

    const res = await axios.get(
      `/chat/history/${props.roomId}`,
      //   `http://localhost:8080/api/chat/history/${props.roomId}`,
      // , {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    )
    messages.value = res.data
    console.log('불러온 메시지:', res.data)
  } catch (error) {
    console.error('채팅 내역 불러오기 실패:', error)
  }
}

const connectWebSocket = () => {
  console.log('🧪 WebSocket 연결 시도 중...') // 👈 여기도 로그 추가

  const wsUrl = 'ws://localhost:8080/chat-app'
  stompClient.value = Stomp.client(wsUrl)

  stompClient.value.debug = (msg) => console.log('[STOMP]', msg)

  stompClient.value.connect(
    {},
    () => {
      console.log('✅ 연결 성공')
      stompClient.value.subscribe(`/topic/chat/${props.roomId}`, (msg) => {
        const chatMessage = JSON.parse(msg.body)
        messages.value.push(chatMessage)
      })
    },
    (error) => {
      console.error('❌연결 실패', error)
    },
  )
}

// const sendMessage = () => {
//   if (inputMessage.value.trim() !== '') {
//     const chatMessage = {
//       sender: '사용자', // TODO: 로그인 사용자 정보로 대체
//       content: inputMessage.value,
//     }
//     stompClient.value.send(`/app/chat/${props.roomId}`, {}, JSON.stringify(chatMessage))
//     inputMessage.value = ''
//   }
// }

const sendMessage = () => {
  if (!stompClient.value || !stompClient.value.connected) {
    console.warn('❗ WebSocket 연결이 아직 완료되지 않았습니다.')
    return
  }

  if (inputMessage.value.trim() !== '') {
    const chatMessage = {
      sender: localStorage.getItem('username') || '사용자',
      content: inputMessage.value,
    }
    stompClient.value.send(`/app/chat/${props.roomId}`, {}, JSON.stringify(chatMessage))
    inputMessage.value = ''
  }
}

watch(
  () => props.roomId,
  (newVal) => {
    console.log('📌 roomId 감지됨:', newVal)
    if (newVal) {
      loadHistory()
      connectWebSocket()
    }
  },
  { immediate: true },
)
</script>
