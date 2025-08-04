<template>
    <footer class="bg-gray-900 text-white py-16 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div>
                    <h3 class="text-2xl font-bold mb-6">Fund:ing</h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        창의적인 아이디어를 현실로 만드는 금융 상품 크라우드펀딩 플랫폼입니다.
                    </p>
                    <div class="flex space-x-4">
                        <a
                            href="#"
                            class="w-10 h-10 bg-[#FFD338] rounded-full flex items-center justify-center text-black hover:bg-[#FFBC00] transition-colors cursor-pointer"
                        >
                            <i
                                class="ri-facebook-fill w-5 h-5 flex items-center justify-center"
                            ></i>
                        </a>
                        <a
                            href="#"
                            class="w-10 h-10 bg-[#FFD338] rounded-full flex items-center justify-center text-black hover:bg-[#FFBC00] transition-colors cursor-pointer"
                        >
                            <i class="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
                        </a>
                        <a
                            href="#"
                            class="w-10 h-10 bg-[#FFD338] rounded-full flex items-center justify-center text-black hover:bg-[#FFBC00] transition-colors cursor-pointer"
                        >
                            <i
                                class="ri-instagram-fill w-5 h-5 flex items-center justify-center"
                            ></i>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 class="font-semibold text-lg mb-4">프로젝트</h4>
                    <ul class="space-y-3">
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >전체 프로젝트</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >테크놀로지</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >디자인</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >게임</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >성공 사례</router-link
                            >
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold text-lg mb-4">지원</h4>
                    <ul class="space-y-3">
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >도움말 센터</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >창작자 가이드</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >후원자 가이드</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >커뮤니티</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >블로그</router-link
                            >
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold text-lg mb-4">회사</h4>
                    <ul class="space-y-3">
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >회사 소개</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >채용</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >보도자료</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >파트너십</router-link
                            >
                        </li>
                        <li>
                            <router-link
                                to="#"
                                class="text-gray-300 hover:text-[#FFD338] transition-colors"
                                >문의하기</router-link
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-700 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div class="flex flex-wrap gap-6 text-sm text-gray-400">
                        <router-link to="#" class="hover:text-[#FFD338] transition-colors"
                            >이용약관</router-link
                        >
                        <router-link to="#" class="hover:text-[#FFD338] transition-colors"
                            >개인정보처리방침</router-link
                        >
                        <router-link to="#" class="hover:text-[#FFD338] transition-colors"
                            >쿠키 설정</router-link
                        >
                        <router-link to="#" class="hover:text-[#FFD338] transition-colors"
                            >법적 고지</router-link
                        >
                    </div>
                    <div class="text-sm text-gray-400">
                        © 2025 Fund:ing Platform. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// 필요한 경우 여기에 스크립트를 추가합니다.
</script>

<style scoped>
/* 필요한 경우 여기에 컴포넌트별 스타일을 추가합니다. */
</style>
