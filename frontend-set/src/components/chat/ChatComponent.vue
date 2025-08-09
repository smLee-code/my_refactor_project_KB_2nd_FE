<template>
    <!-- 실시간 채팅 섹션 -->
    <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">실시간 채팅</h3>

        <!-- 채팅 메시지 영역 -->
        <div ref="scrollBox" class="h-96 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4 space-y-4">
            <div
                v-for="msg in messages"
                :key="msg.id ?? `${msg.sender}-${msg.time}-${Math.random()}`"
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
                <i class="fas fa-paper-plane"></i>
                <span>전송</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import Stomp from 'stompjs'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// ==== Props ====
const props = defineProps({
    roomId: {
        type: [String, Number],
        required: true,
    },
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
        const res = await axios.get(`/chat/history/${props.roomId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        // 서버에서 내려오는 필드에 맞춰 매핑
        messages.value = (res.data || []).map((msg) => ({
            ...msg,
            isSelf: mySenderId.value && msg.sender === mySenderId.value,
            author: msg.sender,
            time: nowHHmm(msg.timestamp),
        }))
        await scrollToBottom()
        // 서버가 "내 senderId"를 내려주는 API가 따로 있다면 여기서 세팅하면 좋음
    } catch (error) {
        console.error('채팅 내역 불러오기 실패:', error)
    }
}

// ==== WebSocket ====
const connectWebSocket = () => {
    if (stompClient.value?.connected) return

    const wsUrl = 'wss://fund-ing.store/chat-app' // 서버 주소에 맞게 수정
    stompClient.value = Stomp.client(wsUrl)

    // 디버깅 로그 (필요시 주석)
    stompClient.value.debug = (msg) => console.log('[STOMP]', msg)

    // JWT를 STOMP CONNECT frame header에 포함
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    stompClient.value.connect(
        headers,
        () => {
            console.log('✅ STOMP 연결 성공')
            // 구독
            stompClient.value.subscribe(`/topic/chat/${props.roomId}`, (frame) => {
                try {
                    const chatMessage = JSON.parse(frame.body)
                    const processedMessage = {
                        ...chatMessage,
                        isSelf: mySenderId.value && chatMessage.sender === mySenderId.value,
                        author: chatMessage.sender,
                        time: nowHHmm(),
                    }
                    messages.value.push(processedMessage)
                    scrollToBottom()
                } catch (e) {
                    console.error('메시지 파싱 실패:', e)
                }
            })

            // (선택) 서버가 CONNECT ACK 시 사용자 식별자를 별도 엔드포인트로 돌려준다면 여기서 요청해서 mySenderId 세팅
            // 예: fetchMe()
        },
        (error) => {
            console.error('❌ STOMP 연결 실패', error)
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
    if (!stompClient.value || !stompClient.value.connected) {
        console.warn('❗ WebSocket 연결이 아직 완료되지 않았습니다.')
        return
    }
    const content = inputMessage.value.trim()
    if (!content) return

    const time = nowHHmm()
    const msg = {
        sender: mySenderId.value, // 서버가 토큰으로 식별한다면 이 값은 서버에서 무시될 수도 있음
        content,
    }

    // 서버 전송
    stompClient.value.send(`/app/chat/${props.roomId}`, {}, JSON.stringify(msg))

    // 낙관적 UI 반영
    messages.value.push({
        ...msg,
        isSelf: true,
        author: mySenderId.value || '나',
        time,
    })
    inputMessage.value = ''
    scrollToBottom()
}

// ==== Watchers ====
watch(
    () => props.roomId,
    async (newVal, oldVal) => {
        if (!newVal) return
        // 방 이동 시 기존 연결 정리 후 재연결 + 히스토리 로드
        disconnectWebSocket()
        await loadHistory()
        connectWebSocket()
    },
    { immediate: true },
)

// 내 senderId가 바뀌면 isSelf 재계산
watch(mySenderId, (newId) => {
    messages.value = messages.value.map((m) => ({ ...m, isSelf: m.sender === newId }))
})

// ==== Lifecycle ====
onMounted(async () => {
    // (선택) 내 식별자 API가 있다면 여기서 세팅
    // const me = await axios.get('/me', { headers: { Authorization: `Bearer ${getToken()}` }})
    // mySenderId.value = me.data.username
    // 임시 고정(테스트용)
    if (!mySenderId.value) mySenderId.value = 'me'

    await loadHistory()
    connectWebSocket()
})

onBeforeUnmount(() => {
    disconnectWebSocket()
})
</script>

<style scoped>
.\!rounded-button {
    border-radius: 8px;
}
</style>
