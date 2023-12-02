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

// heder全部內容一次打包導出
const headers = {
  menu,
  links,
  close,
  header,
  prevScrollPos,
  menuDisplayToggle,
  closeDisplayToggle,
  scrollChange
}

export default headers
