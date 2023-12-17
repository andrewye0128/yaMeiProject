import headers from "../js/header.js";

import { authSigns, authLogins, authAdminLogins, others } from "../api/auth.js";

// 漢堡排事件
headers.menu.addEventListener("click", headers.menuDisplayToggle);
headers.close.addEventListener("click", headers.closeDisplayToggle);


document.addEventListener("DOMContentLoaded", async function () {
  headers.aLink();
});

// 註冊、登入頁面
// 確認目前在哪個頁面上
if (authSigns.signForm) {
  // console.log(`目前在註冊頁面`);

  // 註冊事件
  authSigns.signAddEvent();
} else if (authLogins.loginForm) {
  // console.log(`目前在前台登入頁面`);

  // 登入事件
  authLogins.loginEvent();
} else if (authAdminLogins.adminLoginForm) {
  // console.log(`目前在後台登入頁面`);
  authAdminLogins.adminLoginEvent();
}

// 前台登出點擊事件
others.loginName.addEventListener("click", others.logOut);

// 如果已登入，將『登入/註冊』，改為『登出』
others.toggleLoginName();

