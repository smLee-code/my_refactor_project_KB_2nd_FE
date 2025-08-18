// 펀딩 관련 유틸리티 함수들

// 날짜 기반 진행률 계산
const calculateTimeProgress = (launchAt, endAt) => {
    try {
        // 배열 형태: [year, month, day, hour, minute, second] 또는 [year, month, day]
        const launchDate = Array.isArray(launchAt) 
            ? new Date(launchAt[0], (launchAt[1] || 1) - 1, launchAt[2] || 1, launchAt[3] || 0, launchAt[4] || 0, launchAt[5] || 0)
            : new Date(launchAt)
        const endDate = Array.isArray(endAt)
            ? new Date(endAt[0], (endAt[1] || 1) - 1, endAt[2] || 1, endAt[3] || 0, endAt[4] || 0, endAt[5] || 0)
            : new Date(endAt)
        const today = new Date()
        
        // 아직 시작하지 않은 펀딩인 경우 0% 반환
        if (today < launchDate) {
            console.log('펀딩이 아직 시작되지 않음 - 진행률 0%')
            return 0
        }
        
        // 이미 종료된 펀딩인 경우 100% 반환
        if (today > endDate) {
            console.log('펀딩이 이미 종료됨 - 진행률 100%')
            return 100
        }
        
        const totalDuration = endDate - launchDate
        const elapsedDuration = today - launchDate
        
        if (totalDuration > 0) {
            const progress = Math.round((elapsedDuration / totalDuration) * 100)
            return Math.min(100, Math.max(0, progress))
        }
    } catch (error) {
        console.error('날짜 진행률 계산 실패:', error)
    }
    return 0
}

// 날짜 기반으로만 펀딩 진행률 계산
export const calculateFundingProgress = (fund) => {
    // 날짜 기반 진행률만 사용
    if (fund.launchAt && fund.endAt) {
        const timeProgress = calculateTimeProgress(fund.launchAt, fund.endAt)
        // 최대 100%로 제한
        return Math.min(100, Math.max(0, timeProgress))
    }
    
    // 날짜 정보가 없으면 0% 반환
    return 0
}

// 펀딩 타입 한글 변환
export const getFundTypeKorean = (type) => {
    const typeMap = {
        'Savings': '저축형',
        'Loan': '대출형',
        'Donation': '기부형',
        'Challenge': '챌린지형'
    }
    return typeMap[type] || type
}

// 남은 일수 계산
export const getDaysLeft = (endAt) => {
    try {
        const end = Array.isArray(endAt)
            ? new Date(endAt[0], endAt[1] - 1, endAt[2])
            : new Date(endAt)
        const today = new Date()
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24))
        return diff >= 0 ? diff : 0
    } catch (error) {
        console.error('남은 일수 계산 실패:', error)
        return 0
    }
}