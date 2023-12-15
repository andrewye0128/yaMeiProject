import "tailwindcss/tailwind.css";
import headers from "./src/js/header.js";
// import '@fortawesome/fontawesome-free/css/all.css'

import { swiper, dialog, news } from "./src/js/index.js";

import { others } from "./src/api/auth.js";

// 漢堡排事件
headers.menu.addEventListener("click", headers.menuDisplayToggle);
headers.close.addEventListener("click", headers.closeDisplayToggle);

// 導覽列滑動改變
headers.scrollChange();

// index 評價
document.addEventListener("DOMContentLoaded", async function () {
  headers.aLink();
  await news.getNewsData();
  news.updatePaginationButtons();
  news.handlePageChange(1);
  await swiper.getRatingDatabase(); // Wait for database ratings to be fetched
  swiper.rating();
  swiper.clickMore();
  swiper.init();
  dialog.submit();
  dialog.init();
});


// 如果已登入，將『登入/註冊』，改為『登出』
others.toggleLoginName();

