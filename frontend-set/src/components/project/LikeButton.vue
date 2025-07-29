<template>
  <button
    class="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
    @click="toggleLike"
  >
    <i :class="isLiked ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-700'"></i>
  </button>
</template>

<script setup></script>
