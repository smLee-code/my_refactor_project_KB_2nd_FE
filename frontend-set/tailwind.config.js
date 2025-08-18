/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // 컨테이너 설정
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '1.5rem',
                    lg: '2rem',
                },
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1024px',
                    '2xl': '1024px',
                },
            },

            // 폰트 설정
            fontFamily: {
                sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
                nums: ['Roboto', 'sans-serif'], // 숫자 전용
            },

            // 컬러 설정
            colors: {
                // KB Yellow
                'kb-yellow-positive': '#FFBC00',
                'kb-yellow': '#FFD338',
                'kb-yellow-native': '#FFCC00',

                // Gray
                'kb-gray': '#60584C',
                'kb-gray-alt': '#918274',

                // UI 그레이스케일
                'kb-ui-01': '#000000',
                'kb-ui-02': '#26282C',
                'kb-ui-03': '#484B51',
                'kb-ui-04': '#696E76',
                'kb-ui-05': '#8C949E',
                'kb-ui-06': '#AAB0B8',
                'kb-ui-07': '#C6CBD0',
                'kb-ui-08': '#DDE1E4',
                'kb-ui-09': '#EBEEF0',
                'kb-ui-10': '#F7F7F8',
                'kb-ui-11': '#FFFFFF',

                // 상태 컬러
                'status-positive': '#287EFF',
                'status-error': '#F23F3F',
                'status-error-input': '#FF5858',
                'status-caution': '#FFD338',
                'status-font-error': '#EC645E',
            },

            // 폰트 사이즈
            fontSize: {
                // Title
                'title-lg': ['24px', { lineHeight: '33px', letterSpacing: '-0.2px' }],
                'title-md': ['20px', { lineHeight: '28px', letterSpacing: '-0.2px' }],

                // Body
                'body-lg': ['16px', { lineHeight: '23px', letterSpacing: '-0.2px' }],
                'body-md': ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],

                // Caption
                caption: ['12px', { lineHeight: '17px', letterSpacing: '-0.1px' }],

                // Number (Roboto)
                number: ['16px', { lineHeight: '22px', letterSpacing: '-0.2px' }],
            },

            // 그림자
            boxShadow: {
                list: '0px 4px 20px rgba(65, 66, 77, 0.22)',
                card: '0px 4px 6px rgba(0, 0, 0, 0.07)',
                module: '0px 0px 12px rgba(0, 0, 0, 0.04)',
            },
        },
    },
    plugins: [],
}
