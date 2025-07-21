<template>
  <!-- Header.vue -->
  <header class="bg-kb-ui-11 shadow-card sticky top-0 z-50 w-full">
    <div class="max-w-[1200px] mx-auto px-5 lg:px-10">
      <div class="flex items-center justify-between h-16">
        <!-- 로고 -->
        <div class="flex items-center">
          <h1 class="text-title-md font-bold text-kb-ui-01 drop-shadow-sm">Fund:ing</h1>
        </div>

        <!-- 네비게이션 -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-body-md text-kb-ui-01 font-bold border-b-2 border-kb-ui-01 pb-1">
            홈
          </a>
          <a
            href="#"
            class="text-body-md text-kb-ui-03 hover:text-kb-ui-01 font-medium transition-colors hover:border-b-2 hover:border-kb-ui-01 pb-1"
          >
            펀딩
          </a>
          <a
            href="#"
            class="text-body-md text-kb-ui-03 hover:text-kb-ui-01 font-medium transition-colors hover:border-b-2 hover:border-kb-ui-01 pb-1"
          >
            프로젝트
          </a>
        </nav>

        <!-- 로그인 버튼 -->
        <div class="flex items-center space-x-4">
          <button
            class="bg-kb-ui-02 text-kb-ui-11 px-5 py-2 rounded-[8px] font-medium shadow-card hover:shadow-list hover:bg-kb-ui-03 transition-all duration-150"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped></style>
