import 'tailwindcss/tailwind.css'
import headers from './src/js/header.js'
import '@fortawesome/fontawesome-free/css/all.css'
import swiper from './src/js/index.js'
import {
  authSigns,
  authLogins,
  authAdminLogins,
  others
} from './src/api/auth.js'

// 漢堡排事件
headers.menu.addEventListener('click', headers.menuDisplayToggle)
headers.close.addEventListener('click', headers.closeDisplayToggle)

// 導覽列滑動改變
headers.scrollChange()

// index 評價
document.addEventListener('DOMContentLoaded', async function () {
  await swiper.getRatingDatabase() // Wait for database ratings to be fetched
  swiper.rating()
  swiper.clickMore()
  swiper.init()
})

// 註冊、登入頁面
// 確認目前在哪個頁面上
if (authSigns.signForm) {
  // console.log(`目前在註冊頁面`);

  // 註冊事件
  authSigns.signAddEvent()
} else if (authLogins.loginForm) {
  // console.log(`目前在前台登入頁面`);

  // 登入事件
  authLogins.loginEvent()
} else if (authAdminLogins.adminLoginForm) {
  // console.log(`目前在後台登入頁面`);
  authAdminLogins.loginEvent()
}

// 如果已登入，將『登入/註冊』，改為『登出』
others.toggleLoginName()

// 登出點擊事件
others.loginName.addEventListener('click', others.logOut)
