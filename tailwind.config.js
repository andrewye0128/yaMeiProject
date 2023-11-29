/** @type {import('tailwindcss').Config} */
module.exports = {
  // layouts 的ejs 也可顯示樣式
  content: ['./public/layouts/*.ejs', './src/**/*.{html,js}', './dist/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sanst: ['Noto Sans TC', 'Noto Sans', 'Segoe UI']
      },

      colors: {
        primary: {
          100: '#E9F7F6',
          200: '#C0E0DF',
          300: '#66BAB7',
          400: '#198783'
        },
        gray: {
          100: '#FAFAFA',
          200: '#F0F0F0',
          300: '#C0C0C0',
          400: '#A0A0A0',
          500: '#666666',
          600: '#363636'
        },
        accent: {
          100: '#FFF5C3'
        }
      },

      width: {
        60: '60px'
      },
      maxWidth: {
        300: '300px'
      },
      height: {
        60: '60px',
        113: '28rem',
        377: '377px'
      },
      padding: {
        100: '100px',
        224: '224px',
        312: '312px'
      },
      borderWidth: {
        16: '16px'
      },
      boxShadow: {
        xl: '0px 4px 10px rgb(235, 235, 235)'
      }

    }
  },
  plugins: []
}
