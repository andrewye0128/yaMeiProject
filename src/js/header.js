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

// menu點擊事件
menu.addEventListener('click', menuDisplayToggle)
close.addEventListener('click', closeDisplayToggle)

let preScroll = window.scrollY

const header = document.querySelector('#header')
const newsBox = document.querySelector('.news-box')
let isNavbarVisible = false

window.onscroll = () => {
  const currentScrollPos = window.scrollY

  // 滾動方向
  if (preScroll > currentScrollPos) {
    isNavbarVisible = true
  } else {
    isNavbarVisible = false
  }

  // 顯示或隱藏
  if (isNavbarVisible) {
    header.style.top = '0'
  } else {
    header.style.top = '-85px' // 隱藏
  }

  preScroll = currentScrollPos

  const newsBoxTop = newsBox.offsetTop
  const scrollRange = 20 // 範圍
  if (currentScrollPos >= newsBoxTop && currentScrollPos <= newsBoxTop + scrollRange && preScroll <= currentScrollPos) {
    header.style.top = '0'
    preScroll = currentScrollPos
  }
}
