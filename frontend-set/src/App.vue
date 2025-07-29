<template>
  <component :is="headerComponent" />
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import AuthHeader from '@/components/layout/AuthHeader.vue'

const route = useRoute()

// auth 페이지에서는 AuthHeader, 그 외 페이지에서는 Header 컴포넌트 사용
const headerComponent = computed(() => {
  if (['login', 'join'].includes(route.name)) {
    return AuthHeader
  }
  return Header
})
</script>

<style scoped></style>
