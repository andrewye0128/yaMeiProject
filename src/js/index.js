import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API })

const swiper = {
  rating: function () {
    const swiperCards = document.querySelectorAll('.swiper-card')

    swiperCards.forEach((card, cardIndex) => {
      const cardSuffix = cardIndex + 1
      const stars = card.querySelectorAll('.star-rating [type="radio"]')

      // stars.forEach((star) => {
      //   star.addEventListener('change', () => {
      //     // console.log('Change event triggered')
      //     const rating = parseInt(star.value)

      //     // 將星星值更新到資料庫
      //     this.setRatingToDatabase(cardIndex, rating)

      //     // 更新星星樣式
      //     stars.forEach((s) => {
      //       const sSuffix = parseInt(s.value)
      //       s.checked = sSuffix <= rating
      //     })
      //   })
      // })

      // 獲取資料庫的星星值
      const ratingFromDatabase = 5

      // 設定星星的初始狀態
      stars.forEach((star, starIndex) => {
        const starSuffix = starIndex + 1
        star.checked = starSuffix <= ratingFromDatabase
        star.id = `rate-${starSuffix}-${cardSuffix}`
        star.name = `rating-${cardSuffix}`
      })
    })
  },
  getRatingDatabase: async function () {
    const content = document.querySelector('.swiper-content')

    try {
      const reviews = await api.get('/Review')
      console.log(JSON.stringify(reviews.data))
      for (const [key, review] of Object.entries(reviews.data)) {
        // 創建評論卡片
        const createCard = document.createElement('div')
        createCard.className = 'swiper-card'

        // 創建頭像
        const createAvatar = document.createElement('div')
        createAvatar.classList.add('avatar')

        // 創建圖片元素
        const createImage = document.createElement('img')
        createImage.src = `https://picsum.photos/300/200/?random=${1 + key}`
        createAvatar.appendChild(createImage)
        // 創建名字
        const createName = document.createElement('div')
        createName.className = 'name'
        createName.textContent = review.name
        createAvatar.appendChild(createName)
        // 創建rating
        const createStarRating = document.createElement('span')
        createStarRating.className = 'star-rating flex text-primary-200'

        for (let i = 1; i <= 5; i++) {
          const label = document.createElement('label')
          label.setAttribute('for', `rate-${i}`)
          label.style = `--i:${i}`
          const starIcon = document.createElement('i')
          starIcon.className = 'fa-solid fa-star'

          const input = document.createElement('input')
          input.type = 'radio'
          input.value = i

          label.appendChild(starIcon)
          label.appendChild(input)

          createStarRating.appendChild(label)
          // 設定星星樣式
        }

        const stars = createStarRating.querySelectorAll('.star-rating input')
        stars.forEach((s, index) => {
          s.checked = index + 1 <= review.rating
          s.id = `rate-${index + 1}-${parseInt(key + 10)}`
          s.name = `rating-${parseInt(key + 10)}`
          // console.log(`s ${s.id} : ${s.checked}`)
          // Apply style to checked stars
          if (s.checked) {
            const label = s.parentElement
            const starIcon = label.querySelector('i')
            starIcon.style.color = '#faec1b'
            starIcon.style.textShadow = '0 0 2px #ffffff, 0 0 10px #ffee58'
          }
        })
        createName.appendChild(createStarRating)

        const createCardContent = document.createElement('div')
        createCardContent.classList.add('card-content')
        createCardContent.innerText = review.content

        const createMore = document.createElement('a')
        createMore.className = 'more text-primary-400'
        createMore.innerText = '閱讀更多'

        // 將所有元素加入到卡片中
        createCard.appendChild(createAvatar)
        createCard.appendChild(createCardContent)

        // 將卡片加入到 .swiper-content 中
        content.appendChild(createCard)
        createCard.appendChild(createMore)
      }
      console.log(content)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  },
  clickMore: async function () {
    const read = document.querySelectorAll('.more')
    read.forEach((read) => {
      read.addEventListener('click', (e) => {
        const card = e.target.closest('.swiper-card')
        if (card) {
          card.classList.toggle('expanded')

          // 手动应用或删除 .expanded 类到 .card-content 元素
          const cardContent = card.querySelector('.card-content')
          if (cardContent) {
            cardContent.classList.toggle('expanded')
          }
        }
      })
    })
  },
  init: function () {
    const swiperWrapper = document.querySelector('.swiper-content')

    let isDown = false
    let startX
    let scrollLeft
    swiperWrapper.addEventListener('mousedown', handleMouseDown)
    swiperWrapper.addEventListener('touchstart', handleTouchStart)

    swiperWrapper.addEventListener('mouseleave', handleMouseLeave)
    swiperWrapper.addEventListener('touchend', handleTouchEnd)

    swiperWrapper.addEventListener('mouseup', handleMouseUp)
    swiperWrapper.addEventListener('touchmove', handleTouchMove)
    swiperWrapper.addEventListener('mousemove', handleMouseMove)

    function handleMouseDown(e) {
      isDown = true
      startX = e.pageX - swiperWrapper.offsetLeft
      scrollLeft = swiperWrapper.scrollLeft
    }

    function handleTouchStart(e) {
      isDown = true
      startX = e.pageX - swiperWrapper.offsetLeft
      scrollLeft = swiperWrapper.scrollLeft
    }

    function handleMouseLeave() {
      isDown = false
    }

    function handleTouchEnd() {
      isDown = false
    }

    function handleMouseUp() {
      isDown = false
    }

    function handleTouchMove(e) {
      if (!isDown) return
      e.preventDefault()
      const x = e.touches[0].pageX - swiperWrapper.offsetLeft
      const walk = (x - startX) * 2
      swiperWrapper.scrollLeft = scrollLeft - walk
    }

    function handleMouseMove(e) {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - swiperWrapper.offsetLeft
      const walk = (x - startX) * 2
      swiperWrapper.scrollLeft = scrollLeft - walk
    }
  }
}

export default swiper
