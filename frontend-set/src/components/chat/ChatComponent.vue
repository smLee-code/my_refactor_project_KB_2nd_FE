<template>
  <div class="chat-box">
    <div v-for="msg in messages" :key="msg.id">
      <b>{{ msg.sender }}:</b> {{ msg.content }} <small>({{ msg.timestamp }})</small>
    </div>
    <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="메시지를 입력하세요" />
    <button @click="sendMessage">전송</button>
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
