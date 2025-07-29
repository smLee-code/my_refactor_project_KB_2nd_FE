<template>
  <div class="payment-container">
    <h2>포트원 결제 테스트</h2>
    <button @click="requestPay">결제하기</button>
  </div>
</template>

<script>
export default {
  name: "Payment",
  mounted() {
    // DOM이 완전히 로드된 후 IMP 확인
    this.$nextTick(() => {
      this.initIMP()
    })
  },
  methods: {
    initIMP() {
      console.log("🔍 DOM 로드 후 window.IMP:", window.IMP)
      
      if (window.IMP) {
        window.IMP.init("imp06216030")
        console.log("IMP 초기화 완료")
      } else {
        console.error("IMP 스크립트가 로드되지 않았습니다")
        // 동적으로 스크립트 로드 시도
        this.loadIMPScript()
      }
    },
    
    loadIMPScript() {
      const script = document.createElement('script')
      script.src = 'https://cdn.iamport.kr/v1/iamport.js'
      script.onload = () => {
        console.log("동적 IMP 스크립트 로드 완료")
        if (window.IMP) {
          window.IMP.init("imp06216030")
          console.log("IMP 초기화 완료")
        }
      }
      script.onerror = () => {
        console.error("동적 IMP 스크립트 로드 실패")
      }
      document.head.appendChild(script)
    },
    
    requestPay() {
      const IMP = window.IMP
      if (!IMP) {
        alert("결제 모듈이 아직 로드되지 않았습니다.")
        return
      }

      IMP.request_pay(
        {
          pg: "kakaopay", // ← PG사만 설정
          pay_method: "card",
          merchant_uid: "order_" + new Date().getTime(),
          name: "포트원 테스트",
          amount: 1004,
          buyer_email: "good@portone.io",
          buyer_name: "포트원 기술지원팀",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456",
          m_redirect_url: window.location.href // ← 현재 페이지로 리디렉션
        },
        (rsp) => {
          if (rsp.success) {
            alert("결제 성공: " + rsp.imp_uid)
            // TODO: 백엔드로 imp_uid 전송 등 후속처리
          } else {
            alert("결제 실패: " + rsp.error_msg)
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.payment-container {
  padding: 2rem;
  text-align: center;
}
button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>