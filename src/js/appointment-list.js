import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm'
const appointmentTable = document.querySelector('#appointmentTable')
let rowCount = 1 // 用於計算表格行數

function getAppointmentList() {
  axios.get('https://yameiproject.onrender.com/Appointment')
    .then(function (response) {
      const data = response.data

      function init() {
        data.forEach(function (item) {
          // 判斷看診狀態
          let status = ''
          if (item.attendStatus == true) {
            status = '已看診'
          } else {
            status = '未看診'
          }

          const newRow = appointmentTable.insertRow() // 創建新行
          // 創建表格資料
          const cell1 = newRow.insertCell(0)
          const cell2 = newRow.insertCell(1)
          const cell3 = newRow.insertCell(2)
          const cell4 = newRow.insertCell(3)
          const cell5 = newRow.insertCell(4)
          const cell6 = newRow.insertCell(5)

          cell1.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
          cell1.textContent = rowCount
          rowCount++

          cell2.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
          cell2.textContent = item.name

          cell3.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
          cell3.textContent = item.sex

          cell4.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
          cell4.textContent = item.birth

          cell5.classList.add('border', 'border-slate-300', 'px-3', 'text-center', 'underline', 'text-primary-300')
          const link = document.createElement('a')
          link.href = '#'
          link.setAttribute('data-href', item.id)
          link.textContent = '病歷'
          cell5.appendChild(link)

          cell6.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
          const attendBtn = document.createElement('input')
          attendBtn.type = 'button'
          attendBtn.value = status
          attendBtn.setAttribute('data-id', item.id)
          attendBtn.setAttribute('data-status', item.attendStatus)
          attendBtn.classList.add('px-3', 'ml-1', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer', 'attendStatus')
          cell6.appendChild(attendBtn)
        })
      }
      init()

      // 篩選器
      const searchDate = document.querySelector('#searchDate')

      searchDate.addEventListener('change', function (e) {
        e.preventDefault()
        const nowDate = e.target.value
        appointmentTable.innerHTML = ''
        rowCount = 1
        data.forEach(function (item, index) {
          // 全部顯示
          if (nowDate == '') {
            // 判斷看診狀態
            let status = ''
            if (item.attendStatus == true) {
              status = '已看診'
            } else {
              status = '未看診'
            }
            const newRow = appointmentTable.insertRow() // 創建新行
            // 創建表格資料
            const cell1 = newRow.insertCell(0)
            const cell2 = newRow.insertCell(1)
            const cell3 = newRow.insertCell(2)
            const cell4 = newRow.insertCell(3)
            const cell5 = newRow.insertCell(4)
            const cell6 = newRow.insertCell(5)

            cell1.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell1.textContent = rowCount
            rowCount++

            cell2.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell2.textContent = item.name

            cell3.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell3.textContent = item.sex

            cell4.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell4.textContent = item.birth

            cell5.classList.add('border', 'border-slate-300', 'px-3', 'text-center', 'underline', 'text-primary-300')
            const link = document.createElement('a')
            link.href = '#'
            link.setAttribute('data-href', item.id)
            link.textContent = '病歷'
            cell5.appendChild(link)

            cell6.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            const attendBtn = document.createElement('input')
            attendBtn.type = 'button'
            attendBtn.value = status
            attendBtn.setAttribute('data-id', item.id)
            attendBtn.setAttribute('data-status', item.attendStatus)
            attendBtn.classList.add('px-3', 'ml-1', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer', 'attendStatus')
            cell6.appendChild(attendBtn)
          }
          // 判斷日期
          else if (nowDate == item.date) {
            // 判斷看診狀態
            let status = ''
            if (item.attendStatus == true) {
              status = '已看診'
            } else {
              status = '未看診'
            }
            const newRow = appointmentTable.insertRow() // 創建新行
            // 創建表格資料
            const cell1 = newRow.insertCell(0)
            const cell2 = newRow.insertCell(1)
            const cell3 = newRow.insertCell(2)
            const cell4 = newRow.insertCell(3)
            const cell5 = newRow.insertCell(4)
            const cell6 = newRow.insertCell(5)

            cell1.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell1.textContent = rowCount
            rowCount++

            cell2.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell2.textContent = item.name

            cell3.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell3.textContent = item.sex

            cell4.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            cell4.textContent = item.birth

            cell5.classList.add('border', 'border-slate-300', 'px-3', 'text-center', 'underline', 'text-primary-300')
            const link = document.createElement('a')
            link.href = '#'
            link.setAttribute('data-href', item.id)
            link.textContent = '病歷'
            cell5.appendChild(link)

            cell6.classList.add('border', 'border-slate-300', 'px-3', 'text-center')
            const attendBtn = document.createElement('input')
            attendBtn.type = 'button'
            attendBtn.value = status
            attendBtn.setAttribute('data-id', item.id)
            attendBtn.setAttribute('data-status', item.attendStatus)
            attendBtn.classList.add('px-3', 'ml-1', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer', 'attendStatus')
            cell6.appendChild(attendBtn)
          }
        })
      })
    })
}
getAppointmentList()

// 編輯看診狀態
appointmentTable.addEventListener('click', function (e) {
  e.preventDefault()

  const orderId = e.target.getAttribute('data-id')

  const appointmentStatus = e.target.getAttribute('data-status')

  if (appointmentStatus == 'true') {
    axios.patch(`https://yameiproject.onrender.com/Appointment/${orderId}`, {
      attendStatus: false
    })
    appointmentTable.innerHTML = ''
    rowCount = 1
    getAppointmentList()
  } else {
    axios.patch(`https://yameiproject.onrender.com/Appointment/${orderId}`, {
      attendStatus: true
    })
    appointmentTable.innerHTML = ''
    rowCount = 1
    getAppointmentList()
  }
  const dataHref = e.target.getAttribute('data-href')

  if (dataHref == null) {

  } else {
    window.location.href = 'yaMeiProject/back/appointment-record.html'
  }
})

// 叫號系統
const num = document.querySelector('.num')
const nextBtn = document.querySelector('.nextBtn')

let count = 0

nextBtn.addEventListener('click', function (e) {
  count++
  num.textContent = `${count}`
  localStorage.setItem('callNumber', count.toString())
})

// 歸零
const zeroBtn = document.querySelector('.zeroBtn')

zeroBtn.addEventListener('click', function (e) {
  count = 0
  num.textContent = `${count}`
  localStorage.setItem('callNumber', count.toString())
})
