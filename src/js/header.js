// 抓取節點
const menu = document.querySelector('#menu')
const links = document.querySelector('#links')
const close = document.querySelector('#close')

// 點擊menu函式
function menuDisplayToggle() {
  links.style.width = '100vw'
}

// 點擊close函式
function closeDisplayToggle() {
  links.style.width = '0vw'
}

const header = document.querySelector('#header')
let prevScrollPos = window.scrollY

const scrollChange = () => {
  window.addEventListener('scroll', () => {
    const currentScrollPos = window.scrollY

    if (prevScrollPos > currentScrollPos) {
      // 向上滾動，顯示導航欄
      header.style.top = '0'
    } else {
      // 向下滾動，隱藏導航欄
      header.style.top = '-85px'
    }

    prevScrollPos = currentScrollPos
  })

  // 頁面載入時顯示導航欄
  window.addEventListener('DOMContentLoaded', () => {
    header.style.top = '0'
  })
}

function aLink() {
  // console.log("路徑" + window.location.pathname);
  // console.log();
  const pathNamesMap = {
    診所介紹: 'clinic-intro',
    服務項目: 'treatment',
    醫護團隊: 'medical-team',
    診所預約: 'appointment'
  }

  const host = window.location.origin
  // console.log(window.location.pathname)
  // 開發用請使用這個路徑
  // const BASE_PATH = '/yaMeiProject/src/pages/front/'
  const BASE_PATH = '/yaMeiProject/front/'
  let page
  const a = document.querySelectorAll('a')

  for (const s of a) {
    const linkText = s.innerText.trim()
    if (s.getElementsByTagName('img').length > 0) {
      s.href = host + BASE_PATH + 'index.html'
    }
    if (linkText === '登入/註冊') {
      // s.href = host + '/yaMeiProject/src/pages/back/login.html'
      s.href = host + '/yaMeiProject/back/login.html'
    } else if (pathNamesMap.hasOwnProperty(linkText)) {
      console.log(pathNamesMap.hasOwnProperty(linkText));
      s.href = host + BASE_PATH + pathNamesMap[linkText] + '.html'
    }

    // console.log(s.href)
  }
}

// heder全部內容一次打包導出
const headers = {
  menu,
  links,
  close,
  header,
  prevScrollPos,
  menuDisplayToggle,
  closeDisplayToggle,
  scrollChange,
  aLink
}

export default headers
