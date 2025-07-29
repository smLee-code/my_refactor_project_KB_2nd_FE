<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->
<template>
  <div class="min-h-screen" style="background-color: var(--kb-ui-10)">
    <!-- 메인 콘텐츠 -->
    <div class="max-w-[1200px] mx-auto px-5 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 좌측 콘텐츠 영역 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 프로젝트 헤더 (사진 부분) -->
          <DetailHeader></DetailHeader>
          <!-- 프로젝트 정보 -->
          <ProjectInfo :project="projectData" />
          <!-- 실시간 채팅 섹션 -->
          <ChatComponent :roomId="projectId"></ChatComponent>
        </div>

        <!-- 우측 정보 영역 -->
        <div class="space-y-6">
          <!-- 기본 정보 -->
          <summary-basic-info :detail="projectData"></summary-basic-info>

          <!-- 작성자 정보 -->
          <writer-info :detail="projectData"></writer-info>

          <!-- 좋아요 -->
          <project-vote
            :userId="loginId"
            :projectId="projectId"
            :isLiked="isLiked"
            @update-like="handleUpdateLike"
          />
        </div>
      </div>

      <!-- 관련 프로젝트 추천 -->
      <RecommendRelated></RecommendRelated>
    </div>
    <!-- 푸터 -->
    <Footer></Footer>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, nextTick, onMounted } from 'vue'

import { useRoute } from 'vue-router'
import ProjectInfo from '@/components/project/detail/ProjectInfo.vue'
import SummaryBasicInfo from '@/components/project/detail/SummaryBasicInfo.vue'
import WriterInfo from '@/components/project/detail/WriterInfo.vue'
import ProjectVote from '@/components/project/detail/ProjectVote.vue'
import '@/assets/styles/projectDetail.css'
import ChatComponent from '@/components/chat/ChatComponent.vue'
import Footer from '@/components/layout/Footer.vue'
import RecommendRelated from '@/components/project/detail/RecommendRelated.vue'
import DetailHeader from '@/components/project/detail/DetailHeader.vue'

const route = useRoute()
const projectId = route.params.id

const projectData = ref(null)
const isLoggedIn = ref(false)
const isLiked = ref(false)
const likeCount = ref(98)
const loginId = ref(null) // 로그인된 사용자 ID

const handleUpdateLike = (newState) => {
  isLiked.value = newState
  likeCount.value += newState ? 1 : -1
}

onMounted(async () => {
  try {
    const res = await axios.get(`/project/list/detail/${projectId}/full`)
    projectData.value = res.data
    console.log('✅ 프로젝트 API 응답:', res.data)
  } catch (e) {
    console.error('❌ 프로젝트 정보 요청 실패:', e)
    alert('프로젝트 정보를 불러올 수 없습니다.')
    return
  }

  // 사용자 정보는 별도 처리 (로그인 안 된 경우 대비)
  try {
    const userRes = await axios.get('/user/me')
    loginId.value = userRes.data.id
    console.log('✅ 사용자 API 응답:', loginId.value)
  } catch (e) {
    console.warn('⚠ 사용자 정보 요청 실패 (비로그인 상태일 수 있음):', e)
    // loginId.value = 2
  }
})
</script>
