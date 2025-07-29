<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- 이미지 갤러리 -->
    <div class="relative">
      <!-- 공유/좋아요 버튼 -->
      <div class="absolute top-4 right-4 flex space-x-2">
        <!-- 공유 버튼 -->
        <shareBox></shareBox>
      </div>
    </div>
    <!-- 썸네일 -->
    <Thumbnail></Thumbnail>
  </div>
</template>

<script setup>
import MainImage from '../MainImage.vue'
import shareBox from './shareBox.vue'
import Thumbnail from '../Thumbnail.vue'
</script>
