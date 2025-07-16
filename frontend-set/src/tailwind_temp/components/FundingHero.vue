<template>
  <section class="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 px-6 overflow-hidden">
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <!-- 3D Floating Elements -->
    <div class="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform rotate-12 opacity-20 animate-float"></div>
    <div class="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-30 animate-float-delayed"></div>
    <div class="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl transform -rotate-6 opacity-15 animate-float"></div>
    
    <div class="relative max-w-6xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-8">
        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span class="text-sm text-gray-600 font-medium">현재 245개 프로젝트 진행 중</span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        혁신적인 아이디어를
        <br />
        <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          현실로 만들어보세요
        </span>
      </h1>
      
      <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
        전 세계의 창작자들과 함께 미래를 만들어가는
        <br />
        차세대 크라우드펀딩 플랫폼입니다.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
        <button class="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3">
          <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <i class="ri-rocket-line w-5 h-5 flex items-center justify-center"></i>
          </div>
          프로젝트 둘러보기
        </button>
        <button class="group bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
            <i class="ri-add-line text-white w-5 h-5 flex items-center justify-center"></i>
          </div>
          프로젝트 시작하기
        </button>
      </div>
      
      <div class="grid grid-cols-3 gap-12 max-w-2xl mx-auto">
        <div class="group">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <i class="ri-trophy-line text-white w-8 h-8 flex items-center justify-center"></i>
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-2">2,847</div>
          <div class="text-sm text-gray-600 font-medium">성공 프로젝트</div>
        </div>
        <div class="group">
          <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <i class="ri-money-dollar-circle-line text-white w-8 h-8 flex items-center justify-center"></i>
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-2">₩45억</div>
          <div class="text-sm text-gray-600 font-medium">누적 펀딩액</div>
        </div>
        <div class="group">
          <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <i class="ri-group-line text-white w-8 h-8 flex items-center justify-center"></i>
          </div>
          <div class="text-3xl font-bold text-gray-900 mb-2">125K+</div>
          <div class="text-sm text-gray-600 font-medium">후원자</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 필요한 경우 여기에 스크립트를 추가합니다.
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(12deg); }
  50% { transform: translateY(-20px) rotate(12deg); }
}
@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite 2s;
}
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
