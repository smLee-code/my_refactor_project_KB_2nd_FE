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
import { ref, watch, nextTick } from 'vue'
import Stomp from 'stompjs'
import { useAuthStore } from '@/stores/auth'
import { getChatHistory } from '@/api/chatApi'

// Props 정의
// @param {number} roomId - 채팅방 id (= 프로젝트 id)

const props = defineProps({
    roomId: Number,
})

const authStore = useAuthStore()
const token = authStore.loadToken()

const mySenderId = ref('') // 서버가 CONNECT 헤더의 토큰으로 유저 식별한다면, 백엔드에서 내려주는 내 닉/아이디를 이후에 세팅
const inputMessage = ref('')
const messages = ref([])
const stompClient = ref(null)
const scrollBox = ref(null)

const scrollToBottom = async () => {
    await nextTick()
    if (scrollBox.value) {
        scrollBox.value.scrollTop = scrollBox.value.scrollHeight
    }
}

const loadHistory = async () => {
    try {
        const chatHistory = await getChatHistory(props.roomId)

        messages.value = chatHistory.map((msg) => {
            const chatResponse = msg

            const [year, month, day, hour, minute] = msg.timestamp
            const pad = (n) => n.toString().padStart(2, '0')
            const currentTime = `${year}.${pad(month)}.${pad(day)} ${pad(hour)}:${pad(minute)}`

            return {
                id: chatResponse.id,
                content: chatResponse.content,
                isSelf: chatResponse.userId === authStore.loadUserId(),
                author: chatResponse.nickname, // UI 표시용
                time: currentTime, // UI 표시용
            }
        })
    } catch (error) {
        console.error('채팅 내역 불러오기 실패:', error)
    }
}

// ==== WebSocket ====
const connectWebSocket = () => {
    const wsUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace('http', 'ws') + '/chat-app'
    stompClient.value = Stomp.client(wsUrl)

    stompClient.value.debug = (msg) => console.log('[STOMP]', msg)

    stompClient.value.connect(
        { Authorization: `Bearer ${token}` }, // 웹소켓 연결시 최초 1번만 jwt 인증
        () => {
            stompClient.value.subscribe(`/topic/chat/${props.roomId}`, (msg) => {
                const chatResponse = JSON.parse(msg.body)
                const [year, month, day, hour, minute] = chatResponse.timestamp
                const pad = (n) => n.toString().padStart(2, '0')
                const currentTime = `${year}.${pad(month)}.${pad(day)} ${pad(hour)}:${pad(minute)}`

                const processedMessage = {
                    id: chatResponse.id,
                    content: chatResponse.content,
                    isSelf: chatResponse.userId === authStore.loadUserId(),
                    author: chatResponse.nickname, // UI 표시용
                    time: currentTime, // UI 표시용
                }
                messages.value.push(processedMessage)
            })
        },
        (error) => {
            console.error('❌연결 실패', error)
        },
    )
}

// ==== Send ====
const sendMessage = () => {
    if (!stompClient.value || !stompClient.value.connected) {
        console.warn('❗ WebSocket 연결이 아직 완료되지 않았습니다.')
        return
    }

    if (inputMessage.value.trim() !== '') {
        stompClient.value.send(`/app/chat/${props.roomId}`, {}, inputMessage.value.trim())
        inputMessage.value = ''
    }
}

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
