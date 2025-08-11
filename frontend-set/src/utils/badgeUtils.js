// 뱃지 이름에 따른 이미지 매핑
export const getBadgeImage = (badgeName) => {
    const badgeImageMap = {
        // 실제 데이터베이스 뱃지들 - badge_id에 맞는 이미지
        'CertifiedCompany4 (업체 인증)': '/images/badges/1.webp',
        'Expert (전문가)': '/images/badges/2.webp',
        'Donor (기부가)': '/images/badges/3.webp',
        'Challenger (챌린저)': '/images/badges/4.webp',
        'Financier (금융러)': '/images/badges/5.webp',
        'Influencer (인플루언서)': '/images/badges/6.webp',
        'Supporter (서포터즈)': '/images/badges/7.webp',
        'CommentKing (댓글왕)': '/images/badges/8.webp',
        'Hitmaker (히트메이커)': '/images/badges/9.webp',

        // 뱃지 ID로도 매핑 가능하도록
        CertifiedCompany4: '/images/badges/1.webp',
        Expert: '/images/badges/2.webp',
        Donor: '/images/badges/3.webp',
        Challenger: '/images/badges/4.webp',
        Financier: '/images/badges/5.webp',
        Influencer: '/images/badges/6.webp',
        Supporter: '/images/badges/7.webp',
        CommentKing: '/images/badges/8.webp',
        Hitmaker: '/images/badges/9.webp',

        // 한글 이름으로도 매핑
        '업체 인증': '/images/badges/1.webp',
        전문가: '/images/badges/2.webp',
        기부가: '/images/badges/3.webp',
        챌린저: '/images/badges/4.webp',
        금융러: '/images/badges/5.webp',
        인플루언서: '/images/badges/6.webp',
        서포터즈: '/images/badges/7.webp',
        댓글왕: '/images/badges/8.webp',
        히트메이커: '/images/badges/9.webp',
    }

    // 정확한 매칭이 없으면 기본 뱃지 이미지 반환
    return badgeImageMap[badgeName] || '/images/badges/1.webp'
}

// 뱃지 등급에 따른 색상 클래스 반환
export const getBadgeColorClass = (badgeName) => {
    const badgeColorMap = {
        // 골드 등급 (최고 등급) - 특별한 뱃지들
        'Expert (전문가)': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        전문가: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        'Hitmaker (히트메이커)': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        히트메이커: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        'Influencer (인플루언서)': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        인플루언서: 'bg-gradient-to-r from-yellow-400 to-yellow-600',

        // 실버 등급 (고급 등급) - 전문적인 뱃지들
        'CertifiedCompany4 (업체 인증)': 'bg-gradient-to-r from-gray-300 to-gray-500',
        '업체 인증': 'bg-gradient-to-r from-gray-300 to-gray-500',
        'Financier (금융러)': 'bg-gradient-to-r from-gray-300 to-gray-500',
        금융러: 'bg-gradient-to-r from-gray-300 to-gray-500',
        'CommentKing (댓글왕)': 'bg-gradient-to-r from-gray-300 to-gray-500',
        댓글왕: 'bg-gradient-to-r from-gray-300 to-gray-500',

        // 브론즈 등급 (중급 등급) - 활동 관련 뱃지들
        'Donor (기부가)': 'bg-gradient-to-r from-orange-400 to-orange-600',
        기부가: 'bg-gradient-to-r from-orange-400 to-orange-600',
        'Challenger (챌린저)': 'bg-gradient-to-r from-orange-400 to-orange-600',
        챌린저: 'bg-gradient-to-r from-orange-400 to-orange-600',
        'Supporter (서포터즈)': 'bg-gradient-to-r from-orange-400 to-orange-600',
        서포터즈: 'bg-gradient-to-r from-orange-400 to-orange-600',
    }

    // 기본 색상 (파란색 계열)
    return badgeColorMap[badgeName] || 'bg-gradient-to-r from-blue-400 to-blue-600'
}

// 뱃지 설명을 더 친근하게 변환
export const getBadgeDescription = (description) => {
    if (!description) return '특별한 성취를 인정받은 뱃지입니다.'

    // 기본 설명이 이미 친근하다면 그대로 반환
    if (
        description.includes('축하') ||
        description.includes('감사') ||
        description.includes('특별')
    ) {
        return description
    }

    // 일반적인 설명을 친근하게 변환
    return `축하합니다! ${description}`
}
