
import { others } from "../api/auth.js";


// 抓取節點
const pageLinks = document.querySelectorAll(".page-link");

function Links() {
  const pageLinkPath = {
    病歷管理: "medical-record",
    預約紀錄: "appointment-record",
    當日看診: "appointment-list",
  };

  const host = window.location.origin;
  // const BASE_PATH = "/yaMeiProject/src/pages/back/";
  const BASE_PATH = '/yaMeiProject/back/'

  for (const link of pageLinks) {
    const linkText = link.innerText.trim();
    if (pageLinkPath.hasOwnProperty(linkText)) {
      link.href = host + BASE_PATH + pageLinkPath[linkText] + ".html";
    }
  }
}

Links();

// 後台登出點擊事件
others.adminLoginName.addEventListener("click", others.adminLoginOut);