<template>
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
                            msg.isSelf
                                ? 'bg-blue-500 text-white'
                                : 'bg-white border border-gray-200',
                        ]"
                    >
                        {{ msg.content }}
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
                <i class="fas fa-paper-plane"></i><span>전송</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import Stomp from 'stompjs'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

import { getChatHistory } from '@/api/chatApi'

// ==== Props ====
const props = defineProps({
    roomId: Number,
})

// ==== Stores / Auth ====
const authStore = useAuthStore()
const token = authStore.loadToken()

// ==== State ====
const mySenderId = ref('') // 서버가 CONNECT 헤더의 토큰으로 유저 식별한다면, 백엔드에서 내려주는 내 닉/아이디를 이후에 세팅
const inputMessage = ref('')
const messages = ref([])
const stompClient = ref(null)
const scrollBox = ref(null)

// ==== Helpers ====
const nowHHmm = (dateLike) => {
    const d = dateLike ? new Date(dateLike) : new Date()
    const h = String(d.getHours()).padStart(2, '0')
    const m = String(d.getMinutes()).padStart(2, '0')
    return `${h}:${m}`
}

const scrollToBottom = async () => {
    await nextTick()
    if (scrollBox.value) {
        scrollBox.value.scrollTop = scrollBox.value.scrollHeight
    }
}

// ==== History ====
const loadHistory = async () => {
    try {
        console.log('✅ token:', token)

        // const res = await axios.get(`/chat/history/${props.roomId}`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // })

        const chatHistory = await getChatHistory(props.roomId)

        console.log('✅ chatHistory:', chatHistory)

        // console.log('✅ res.data:',chatHistory)

        messages.value = chatHistory.map((msg) => {
            // const chatResponse = JSON.parse(msg.body)
            console.log('✅ msg:', msg)
            const chatResponse = msg

            const now = new Date(msg.timestamp) // Assuming msg.timestamp is available from backend
            const hours = String(now.getHours()).padStart(2, '0')
            const minutes = String(now.getMinutes()).padStart(2, '0')
            const currentTime = `${hours}:${minutes}`
            return {
                id: chatResponse.id,
                content: chatResponse.content,
                isSelf: chatResponse.userId === authStore.loadUserId(),
                author: chatResponse.nickname, // UI 표시용
                time: chatResponse.timestamp, // UI 표시용
            }
        })
        console.log('불러온 메시지:', messages.value)
    } catch (error) {
        console.error('채팅 내역 불러오기 실패:', error)
    }
}

// ==== WebSocket ====
const connectWebSocket = () => {
    console.log('🧪 WebSocket 연결 시도 중...') // 👈 여기도 로그 추가

    const wsUrl = 'ws://localhost:8080/chat-app'
    stompClient.value = Stomp.client(wsUrl)

    stompClient.value.debug = (msg) => console.log('[STOMP]', msg)

    stompClient.value.connect(
        { Authorization: `Bearer ${token}` }, // 웹소켓 연결시 최초 1번만 jwt 인증
        () => {
            console.log('✅ 연결 성공')
            stompClient.value.subscribe(`/topic/chat/${props.roomId}`, (msg) => {
                const chatResponse = JSON.parse(msg.body)

                console.log('✅ 메시지 수신:', chatResponse)

                // const now = new Date()
                // const now = chatResponse.timestamp
                // const hours = String(now.getHours()).padStart(2, '0')
                // const minutes = String(now.getMinutes()).padStart(2, '0')
                // const currentTime = `${hours}:${minutes}`

                const processedMessage = {
                    id: chatResponse.id,
                    content: chatResponse.content,
                    isSelf: chatResponse.userId === authStore.loadUserId(),
                    author: chatResponse.username, // UI 표시용
                    time: chatResponse.timestamp, // UI 표시용
                }
                messages.value.push(processedMessage)
            })
        },
        (error) => {
            console.error('❌연결 실패', error)
        },
    )
}

const disconnectWebSocket = () => {
    try {
        if (stompClient.value && stompClient.value.connected) {
            stompClient.value.disconnect(() => console.log('🔌 STOMP 연결 종료'))
        }
    } catch (e) {
        console.warn('STOMP 종료 중 오류', e)
    } finally {
        stompClient.value = null
    }
}

// ==== Send ====
const sendMessage = () => {
    console.log('✅ sendMessage()!')

    if (!stompClient.value || !stompClient.value.connected) {
        console.warn('❗ WebSocket 연결이 아직 완료되지 않았습니다.')
        return
    }

    if (inputMessage.value.trim() !== '') {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const currentTime = `${hours}:${minutes}`

        const chatMessage = {
            sender: mySenderId.value,
            content: inputMessage.value.trim(),
        }

        // 1. 메시지 전송
        stompClient.value.send(`/app/chat/${props.roomId}`, {}, inputMessage.value.trim())

        // 2. 메시지 화면에 반영
        // messages.value.push({
        //     ...chatMessage,
        //     isSelf: true,
        //     author: mySenderId.value,
        //     time: currentTime,
        // })

        // 3. 입력창 비우기
        inputMessage.value = ''
    }
}

// ==== Watchers ====
watch(
    () => props.roomId,
    (newVal, oldVal) => {
        console.log('📌 roomId 감지됨:', newVal, oldVal)
        if (newVal) {
            loadHistory()
            connectWebSocket()
        }
    },
    { immediate: true },
)

// 내 senderId가 바뀌면 isSelf 재계산
watch(mySenderId, (newId) => {
    messages.value = messages.value.map((msg) => ({
        ...msg,
        isSelf: msg.sender === newId,
    }))
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
