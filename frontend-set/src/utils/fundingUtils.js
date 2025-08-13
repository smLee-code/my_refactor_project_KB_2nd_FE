// 펀딩 관련 유틸리티 함수들

// 날짜 기반 진행률 계산
const calculateTimeProgress = (launchAt, endAt) => {
    try {
        const launchDate = Array.isArray(launchAt) 
            ? new Date(launchAt[0], launchAt[1] - 1, launchAt[2])
            : new Date(launchAt)
        const endDate = Array.isArray(endAt)
            ? new Date(endAt[0], endAt[1] - 1, endAt[2])
            : new Date(endAt)
        const today = new Date()
        
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

// 가중 평균 방식으로 펀딩 진행률 계산
export const calculateFundingProgress = (fund) => {
    let progress = 0
    let weights = 0
    
    // 1. 날짜 기반 진행률 (가중치 80%)
    if (fund.launchAt && fund.endAt) {
        const timeProgress = calculateTimeProgress(fund.launchAt, fund.endAt)
        progress += timeProgress * 0.8
        weights += 0.8
    }
    
    // 2. 참여 인원 기반 진행률 (가중치 15%)
    if (fund.participantCount !== undefined || fund.retryVotesCount !== undefined) {
        const participantCount = fund.participantCount || fund.retryVotesCount || 0
        // 목표 인원이 없으면 100명 기준
        const targetParticipants = fund.targetParticipantCount || 100
        const participantProgress = Math.min(100, (participantCount / targetParticipants) * 100)
        progress += participantProgress * 0.15
        weights += 0.15
    }
    
    // 3. 기부형인 경우 목표금액 진행률 추가 (가중치 5%)
    if (fund.fundType === 'Donation' && fund.targetAmount && fund.currentAmount !== undefined) {
        const amountProgress = Math.min(100, (fund.currentAmount / fund.targetAmount) * 100)
        progress += amountProgress * 0.05
        weights += 0.05
    }
    
    // 가중치로 나누어 최종 진행률 계산
    const finalProgress = weights > 0 ? Math.round(progress / weights) : 0
    
    // 최대 100%로 제한
    return Math.min(100, Math.max(0, finalProgress))
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