<template>
  <div>
    <h1 v-if="project && project.projectId">{{ project.title }}</h1>
    <div v-else>로딩 중...</div>
    <h1>hi</h1>

    <!-- 채팅방 컴포넌트에 projectId 넘겨줌 -->
    <ChatComponent v-if="project.projectId" :roomId="project.projectId" />

    <!-- jwt 토큰 사용하는 버전 -->
    <!-- <ChatComponent v-if="jwtToken && project.projectId" :roomId="project.projectId" /> -->

    <!-- <ChatComponent :roomId="project.projectId" /> -->
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ChatComponent from '../../components/chat/ChatComponent.vue'
import { computed } from 'vue'

const route = useRoute()

const jwtToken = computed(() => localStorage.getItem('jwt'))

const project = reactive({
  projectId: null,
  title: '',
  promotion: '',
  projectType: '',
  progress: '',
  deadline: [],
  createAt: [],
  userId: null,
})

onMounted(async () => {
  const token = localStorage.getItem('jwt')
  const id = route.params.projectId

  const { data } = await axios.get(`/project/list/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  console.log('🔥 프로젝트 응답 데이터:', data) // 👈 이걸 꼭 보자
  Object.assign(project, data) // ✅ 올바른 방식
  console.log('project.projectId:', project.projectId)
})
</script>
