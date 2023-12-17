import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API })

const news = {
  currentPage: 1,
  itemsPerPage: 5,
  formattedNews: [],
  getNewsData: async function () {
    try {
      const response = await api.get('/News')
      const serverData = response.data
      // console.log(serverData)
      // Static data
      const staticData = [
        {
          id: 1,
          title: '小孩都有刷牙，為何仍蛀牙了？',
          content: '...',
          date: '2023-12-10'
        },
        {
          id: 2,
          title: '兒童口腔衛教講座親子同場學習',
          content: '...',
          date: '2023-11-10'
        }
      ]

      // Combine static data with server data
      const combinedData = [...staticData, ...serverData]
      // Map and format the combined data
      this.formattedNews = combinedData.map((newsItem) => {
        return {
          id: newsItem.id,
          title: newsItem.title,
          content: newsItem.content,
          date: newsItem.date ? new Date(newsItem.date).toISOString().split('T')[0] : 'N/A'
        }
      })
      const newsList = document.querySelector('.content ul')
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      const currentNews = this.formattedNews.slice(startIndex, endIndex)

      // Clear existing items in the list
      newsList.innerHTML = ''

      // Add news items to the list
      currentNews.forEach((newsItem) => {
        const listItem = createNewsListItem(newsItem)
        newsList.appendChild(listItem)
      })

      // Update pagination buttons
      this.updatePaginationButtons()
    } catch (error) {
      console.error('Error fetching news data:', error)
    }
  },

  updatePaginationButtons: function () {
    const totalPages = Math.ceil(this.formattedNews.length / this.itemsPerPage)

    const paginationContainer = document.querySelector('.pagination')
    paginationContainer.innerHTML = ''

    const startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(totalPages, this.currentPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('div')
      pageButton.classList.add(
        'h-10',
        'w-10',
        'flex',
        'items-center',
        'justify-center',
        'text-gray-600',
        'text-lg',
        'rounded-full',
        'transition',
        'duration-300',
        'hover:bg-yellow-100'
      )
      pageButton.textContent = i
      pageButton.addEventListener('click', () => this.handlePageChange(i))
      paginationContainer.appendChild(pageButton)
    }
  },

  handlePageChange: function (page) {
    if (this.currentPage !== page) {
      this.currentPage = page

      // Clear existing items in the list
      const newsList = document.querySelector('.content ul')
      newsList.innerHTML = ''

      // Get and display news data for the new page
      this.getNewsData()
    }
  }
}

function createNewsListItem(news) {
  const listItem = document.createElement('li')
  listItem.classList.add(
    'border-b-2',
    'border-solid',
    'border-primary-100',
    'px-3',
    'py-5',
    'md:border-b-0',
    'md:px-10',
    'md:flex'
  )
  listItem.innerHTML = `
    <span class="time-font">${news.date}</span>
    <p class="item-font">${news.title}</p>
  `
  return listItem
}

const swiper = {
  rating: function () {
    const swiperCards = document.querySelectorAll('.swiper-card')

    swiperCards.forEach((card, cardIndex) => {
      const cardSuffix = cardIndex + 1
      const stars = card.querySelectorAll('.star-rating [type="radio"]')

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
      // console.log(JSON.stringify(reviews.data))
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

const dialog = {
  init: function () {
    console.log(localStorage)
    const dialog = document.getElementById('dialog')
    const closeBtn = document.getElementById('closeBtn')
    const button = document.querySelector('.recieve')
    let down = false
    button.addEventListener('click', (e) => {
      e.preventDefault()
      down = true
      if (down) {
        dialog.style.display = 'block'
      }
    })
    // 點擊關閉按鈕時隱藏對話框
    closeBtn.addEventListener('click', (e) => {
      down = false

      e.preventDefault()
      dialog.style.display = 'none'
    })
  },
  submit: async function () {
    const inputRadios = document.querySelectorAll('.input-rating [type="radio"]')
    const submit = document.querySelector('.submit')
    const dn = document.querySelector('.dialog-name')
    const name = dn.children[0].children[0].innerText
    const content = document.querySelector('.dialog-content').children[0]

    // 獲取當前日期和時間
    const today = new Date()
    // 獲取年、月和日
    const year = today.getFullYear()
    // 月份是從0開始的，所以要加1
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    // 構建 yyyy-mm-dd 格式的日期字符串
    const date = `${year}-${month}-${day}`
    const form = {}
    let count = 0

    try {
      const reviews = await api.get('/Review')
      findData(reviews.data, inputRadios)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }

    function setStarStyles(radio, count) {
      const label = radio.previousElementSibling
      const starIcon = label.querySelector('i')

      if (parseInt(radio.value) <= count) {
        starIcon.style.color = '#faec1b'
        starIcon.style.textShadow = '0 0 2px #ffffff, 0 0 10px #ffee58'
      } else {
        starIcon.style.color = '' // Reset to default color
        starIcon.style.textShadow = '' // Reset to default text shadow
      }
    }

    function updateStarStyles(inputRadios, count) {
      inputRadios.forEach((radio) => {
        setStarStyles(radio, count)
      })
    }

    inputRadios.forEach((radio) => {
      radio.addEventListener('change', function () {
        count = parseInt(radio.value)
        updateStarStyles(inputRadios, count)
        console.log(count)
      })
    })

    function findData(datas, inputRadios) {
      for (const data of datas) {
        if (data.name === name) {
          content.value = data.content
          const rating = parseInt(data.rating)
          count = rating
          updateStarStyles(inputRadios, rating)
          break // 找到後中斷迴圈
        }
      }
    }

    submit.addEventListener('click', async (e) => {
      e.preventDefault()

      form.name = name
      form.rating = count
      form.content = content.value
      form.date = date

      try {
        const reviews = await api.get('/Review')

        const existingReview = reviews.data.find((data) => data.name === name)
        if (existingReview) {
          const response = await api.put(`/Review/${existingReview.id}`, form)
          console.log('Review updated successfully:', response.data)
        } else {
          const response = await api.post('/Review', form)
          console.log('Review submitted successfully:', response.data)
        }
      } catch (error) {
        // 處理錯誤
        console.error('Error submitting/updating review:', error)
      }
    })
  }

}

export { swiper, dialog, news }
