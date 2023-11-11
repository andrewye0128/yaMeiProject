// 將資料庫內容顯示於HTML
const nameId = document.querySelector('.name')
const idNum = document.querySelector('.idNum')
const birth = document.querySelector('.birth')
const time = document.querySelector('.time')
const cause = document.querySelector('.cause')

const appointmentTable = document.querySelector('#appointmentTable')
let rowCount = 1 // 用於計算表格行數

axios.get('http://localhost:4000/Appointment')
  .then(function (response) {
    const data = response.data
    function init() {
      data.forEach(function (item) {
        const newRow = appointmentTable.insertRow() // 創建新行
        // 創建表格資料
        const cell1 = newRow.insertCell(0)
        const cell2 = newRow.insertCell(1)
        const cell3 = newRow.insertCell(2)
        const cell4 = newRow.insertCell(3)
        const cell5 = newRow.insertCell(4)
        const cell6 = newRow.insertCell(5)
        const cell7 = newRow.insertCell(6)

        cell1.classList.add('border', 'border-slate-300', 'px-3')
        cell1.textContent = rowCount
        rowCount++

        cell2.classList.add('border', 'border-slate-300', 'px-3')
        cell2.textContent = item.name

        cell3.classList.add('border', 'border-slate-300', 'px-3')
        cell3.textContent = item.sex

        cell4.classList.add('border', 'border-slate-300', 'px-3')
        cell4.textContent = item.birth

        cell5.classList.add('border', 'border-slate-300', 'px-3')
        cell5.innerHTML = '<a href="">病歷</a>'

        cell6.classList.add('border', 'border-slate-300', 'px-3')
        const modifyBtn = document.createElement('input')
        modifyBtn.type = 'button'
        modifyBtn.value = '已看診'
        modifyBtn.classList.add('px-3', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer')
        cell6.appendChild(modifyBtn)

        const deleteBtn = document.createElement('input')
        deleteBtn.type = 'button'
        deleteBtn.value = '未看診'
        deleteBtn.classList.add('px-3', 'ml-1', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer')
        cell6.appendChild(deleteBtn)
      })
    }
    init()

    // 篩選器
    const searchDate = document.querySelector('#searchDate')

    searchDate.addEventListener('mouseup', function (e) {
      appointmentTable.innerHTML = ''
      rowCount = 1
      data.forEach(function (item, index) {
        // 全部顯示
        if (e.target.value == '') {
          const newRow = appointmentTable.insertRow() // 創建新行
          // 創建表格資料
          const cell1 = newRow.insertCell(0)
          const cell2 = newRow.insertCell(1)
          const cell3 = newRow.insertCell(2)
          const cell4 = newRow.insertCell(3)
          const cell5 = newRow.insertCell(4)
          const cell6 = newRow.insertCell(5)
          const cell7 = newRow.insertCell(6)

          cell1.classList.add('border', 'border-slate-300', 'px-3')
          cell1.textContent = rowCount
          rowCount++

          cell2.classList.add('border', 'border-slate-300', 'px-3')
          cell2.textContent = item.name

          cell3.classList.add('border', 'border-slate-300', 'px-3')
          cell3.textContent = item.sex

          cell4.classList.add('border', 'border-slate-300', 'px-3')
          cell4.textContent = item.birth

          cell5.classList.add('border', 'border-slate-300', 'px-3')
          cell5.textContent = item.time

          cell6.classList.add('border', 'border-slate-300', 'px-3')
          cell6.textContent = item.symptom

          cell7.classList.add('border', 'border-slate-300', 'px-3')
          const modifyBtn = document.createElement('input')
          modifyBtn.type = 'button'
          modifyBtn.value = '修改'
          modifyBtn.classList.add('px-3', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer')
          cell7.appendChild(modifyBtn)

          const deleteBtn = document.createElement('input')
          deleteBtn.type = 'button'
          deleteBtn.value = '刪除'
          deleteBtn.classList.add('px-3', 'ml-1', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer')
          cell7.appendChild(deleteBtn)
        }
        // 判斷日期
        else if (e.target.value == item.date) {
          const newRow = appointmentTable.insertRow() // 創建新行
          // 創建表格資料
          const cell1 = newRow.insertCell(0)
          const cell2 = newRow.insertCell(1)
          const cell3 = newRow.insertCell(2)
          const cell4 = newRow.insertCell(3)
          const cell5 = newRow.insertCell(4)
          const cell6 = newRow.insertCell(5)
          const cell7 = newRow.insertCell(6)

          cell1.classList.add('border', 'border-slate-300', 'px-3')
          cell1.textContent = rowCount
          rowCount++

          cell2.classList.add('border', 'border-slate-300', 'px-3')
          cell2.textContent = item.name

          cell3.classList.add('border', 'border-slate-300', 'px-3')
          cell3.textContent = item.sex

          cell4.classList.add('border', 'border-slate-300', 'px-3')
          cell4.textContent = item.birth

          cell5.classList.add('border', 'border-slate-300', 'px-3')
          cell5.textContent = item.time

          cell6.classList.add('border', 'border-slate-300', 'px-3')
          cell6.textContent = item.symptom

          cell7.classList.add('border', 'border-slate-300', 'px-3')
          const modifyBtn = document.createElement('input')
          modifyBtn.type = 'button'
          modifyBtn.value = '修改'
          modifyBtn.classList.add('px-3', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer')
          cell7.appendChild(modifyBtn)

          const deleteBtn = document.createElement('input')
          deleteBtn.type = 'button'
          deleteBtn.value = '刪除'
          deleteBtn.classList.add('px-3', 'ml-1', 'rounded-lg', 'text-white', 'bg-primary-300', 'hover:bg-primary-400', 'cursor-pointer')
          cell7.appendChild(deleteBtn)
        }
      })
    })
  })

// 叫號系統
const num = document.querySelector('.num')
const nextBtn = document.querySelector('.nextBtn')

let count = 0

nextBtn.addEventListener('click', function (e) {
  count++
  num.textContent = `${count}`
})

// 歸零
const zeroBtn = document.querySelector('.zeroBtn')

zeroBtn.addEventListener('click', function (e) {
  count = 0
  num.textContent = `${count}`
})
