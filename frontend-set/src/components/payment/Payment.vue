<template>
  <div class="payment-container">
    <h2>포트원 결제 테스트</h2>
    <div class="amount-input">
      <label for="amount">결제 금액:</label>
      <input 
        id="amount"
        v-model.number="amount" 
        type="number" 
        placeholder="금액을 입력하세요"
        min="100"
        step="100"
      >
      <span>원</span>
    </div>
    <div class="payment-methods">
      <button @click="requestKakaoPay" class="kakao-btn">카카오페이 결제</button>
      <button @click="requestSettlePay" class="settle-btn">헥토파이낸셜 결제</button>
      <button @click="requestKCPPay" class="kcp-btn">NHN KCP 결제</button>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: "Payment",
  data() {
    return {
      amount: 1000 // 기본 금액
    }
  },
  mounted() {
    // DOM이 완전히 로드된 후 IMP 확인
    this.$nextTick(() => {
      // 약간의 지연을 추가하여 스크립트 로드 확실히 함
      setTimeout(() => {
        this.initIMP()
      }, 100)
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
      // 이미 스크립트가 있는지 확인
      const existingScript = document.querySelector('script[src*="iamport.js"]')
      if (existingScript) {
        console.log("IMP 스크립트가 이미 존재합니다. 재시도 중...")
        // 스크립트가 완전히 로드될 때까지 재시도
        let retryCount = 0
        const checkIMP = setInterval(() => {
          if (window.IMP) {
            clearInterval(checkIMP)
            window.IMP.init("imp06216030")
            console.log("IMP 초기화 완료 (재시도)")
          } else if (retryCount++ > 10) {
            clearInterval(checkIMP)
            console.error("IMP 로드 실패")
          }
        }, 200)
        return
      }
      
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
    
    async requestKakaoPay() {
      const IMP = window.IMP
      if (!IMP) {
        alert("결제 모듈이 아직 로드되지 않았습니다.")
        return
      }

      // 백엔드에서 주문 생성
      const orderData = await this.createOrder()
      if (!orderData) return

      IMP.request_pay(
        {
          pg: "kakaopay",
          pay_method: "card",
          merchant_uid: orderData.merchant_uid,
          name: "포트원 테스트",
          amount: orderData.amount,
          buyer_email: "good@portone.io",
          buyer_name: "포트원 기술지원팀",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456",
          m_redirect_url: window.location.href
        },
        (rsp) => {
          if (rsp.success) {
            // 백엔드로 결제 정보 전송
            this.sendPaymentToBackend({
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid
            })
          } else {
            alert("결제 실패: " + rsp.error_msg)
          }
        }
      )
    },
    
    async requestSettlePay() {
      const IMP = window.IMP
      if (!IMP) {
        alert("결제 모듈이 아직 로드되지 않았습니다.")
        return
      }

      // 백엔드에서 주문 생성
      const orderData = await this.createOrder()
      if (!orderData) return

      IMP.request_pay(
        {
          pg: "settle",
          pay_method: "card",
          merchant_uid: orderData.merchant_uid,
          name: "주문명:결제테스트",
          amount: orderData.amount,
          buyer_email: "iamport@siot.do",
          buyer_name: "구매자이름",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456",
          company: "아임포트",
          m_redirect_url: window.location.href
        },
        (rsp) => {
          if (rsp.success) {
            // 백엔드로 결제 정보 전송
            this.sendPaymentToBackend({
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid
            })
          } else {
            alert("결제 실패: " + rsp.error_msg)
          }
        }
      )
    },
    
    async requestKCPPay() {
      const IMP = window.IMP
      if (!IMP) {
        alert("결제 모듈이 아직 로드되지 않았습니다.")
        return
      }

      // 백엔드에서 주문 생성
      const orderData = await this.createOrder()
      if (!orderData) return

      IMP.request_pay(
        {
          pg: "kcp.AO09C",
          pay_method: "card",
          merchant_uid: orderData.merchant_uid,
          name: "주문명:결제테스트",
          amount: orderData.amount,
          buyer_email: "iamport@siot.do",
          buyer_name: "구매자이름",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456",
          m_redirect_url: window.location.href
        },
        (rsp) => {
          if (rsp.success) {
            // 백엔드로 결제 정보 전송
            this.sendPaymentToBackend({
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid
            })
          } else {
            alert("결제 실패: " + rsp.error_msg)
          }
        }
      )
    },
    
    async createOrder() {
      // 금액 유효성 검사
      if (!this.amount || this.amount < 100) {
        alert('100원 이상의 금액을 입력해주세요.')
        return null
      }
      
      try {
        const response = await api.post('/payments/create', {
          fundId: this.$route.params.id,
          amount: this.amount
        })
        
        return response.data // { merchant_uid, amount }
      } catch (error) {
        console.error('주문 생성 오류:', error)
        alert('주문 생성 중 오류가 발생했습니다.')
        return null
      }
    },
    
    async sendPaymentToBackend(paymentData) {
      try {
        const response = await api.post('/payments/complete', paymentData)
        
        if (response.data.success) {
          alert('결제가 완료되었습니다!')
          // 결제 완료 후 페이지 이동 등 처리
          // this.$router.push('/orders')
        } else {
          alert('결제 검증 실패: ' + response.data.message)
        }
      } catch (error) {
        console.error('결제 검증 오류:', error)
        alert('결제 검증 중 오류가 발생했습니다.')
      }
    }
  }
}
</script>

<style scoped>
.payment-container {
  padding: 2rem;
  text-align: center;
}
.amount-input {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}
.amount-input label {
  margin-right: 1rem;
  font-weight: bold;
}
.amount-input input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 150px;
  text-align: right;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.amount-input span {
  margin-left: 0.5rem;
}
.payment-methods {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: all 0.3s;
}
.kakao-btn {
  background-color: #FEE500;
  color: #000000;
}
.kakao-btn:hover {
  background-color: #FADA0A;
}
.settle-btn {
  background-color: #007AFF;
  color: #FFFFFF;
}
.settle-btn:hover {
  background-color: #0051D5;
}
.kcp-btn {
  background-color: #FF6B00;
  color: #FFFFFF;
}
.kcp-btn:hover {
  background-color: #E55A00;
}
</style>