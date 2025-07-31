<template>
  <div
    class="bg-kb-ui-11 rounded-2xl border border-kb-ui-09 p-5 hover:shadow-card hover:-translate-y-1 transition-all duration-200 cursor-pointer"
  >
    <!-- 썸네일 -->
    <div class="w-full h-48 bg-kb-ui-10 rounded-xl overflow-hidden mb-4">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover object-top"
      />
    </div>

    <!-- 카테고리 태그와 좋아요 -->
    <div class="flex items-center justify-between mb-3">
      <span class="bg-kb-ui-09 text-kb-ui-03 px-3 py-1 rounded-full caption font-medium">
        {{ project.projectType }}
      </span>
      <div class="flex items-center space-x-1 text-kb-ui-05">
        <<button @click.stop="$emit('toggle-like', project.id)" class="cursor-pointer">
          <i
            class="fa-heart text-sm"
            :class="project.isLiked ? 'fas text-status-error' : 'far text-kb-ui-06'"
          ></i>
        </button>

        <span class="caption">{{ project.likes }}</span>
      </div>
    </div>

    <!-- 제목 -->
    <h3 class="title-md text-kb-ui-02 font-bold mb-2 line-clamp-2">
      {{ project.title }}
    </h3>

    <!-- 한 줄 요약 -->
    <p class="body-md text-kb-ui-04 mb-4 line-clamp-2">{{ project.description }}</p>

    <!-- 구분선 -->
    <div class="border-t border-kb-ui-09 pt-3">
      <div class="flex items-center justify-between caption text-kb-ui-05">
        <!-- <span>{{ project.proposer }}</span> -->
        <span>{{ project.createdAt }}</span>
      </div>
    </div>

    <!-- 상태 + 자세히 보기 -->
    <div class="mt-3 flex items-center justify-between">
      <span
        class="px-2 py-1 rounded-full caption font-medium"
        :class="{
          'bg-status-positive/10 text-status-positive': project.status == '진행중',
          'bg-kb-ui-09 text-kb-ui-04': project.status === '마감',
        }"
      >
        {{ project.status }}
      </span>
      <button
        class="caption text-status-positive hover:text-status-positive/80 font-medium whitespace-nowrap"
      >
        자세히 보기
      </button>
    </div>
  </div>
</template>

<script setup>
// project: 프로젝트 객체 (필수)
defineProps({
  project: { type: Object, required: true },
})
</script>
