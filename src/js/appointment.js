// 查詢預約資訊
axios.get('http://localhost:4000/Appointment')
  .then(function (response) {
    const data = response.data
   
    // 渲染資料到畫面上
    function renderInfo(targetHTML) {
      const inquireInfo = document.querySelector('.inquireInfo')
      inquireInfo.innerHTML = targetHTML
    }

    function generateInquireHTML(targetInfo) {
      return targetInfo
        .map((data) => {
          return `<div class="bg-white mt-5">
     <h3 class="bg-primary-300 text-center px-12 text-white">預約訊息</h3>
     <div class="bg-white p-3">
     <h4 class="text-center px-12 text-primary-300 ">症狀</h4>
     <p class="departCheck p-3 text-center ">${data.depart}</p>
     <p class="symptomCheck p-3 text-center ">${data.symptom}</p>
     <h4 class="text-center px-12 text-primary-300 ">預約日期及時間</h4>
     <p class="dateCheck p-3 text-center ">預約日期</p>
     <p class="timeCheck p-3 text-center ">${data.time}</p>
     <h4 class="text-center px-12 text-primary-300">看診號碼</h4>

     </div>
     </div>`
        })
    }

    document.querySelector('[data-appointmentInfo-form]').addEventListener('submit', (e) => {
      e.preventDefault()
      if (inquireFilter(e.target.searchIdNum.value).length > 0 ){
      renderInfo(generateInquireHTML(inquireFilter(e.target.searchIdNum.value)))
    }else{
      alert(`查無此資料`)
    }
    })

    function inquireFilter(targetInfo, allAppointment = data) {
      return allAppointment.filter((data) => {
        return data.idNum.includes(targetInfo)
      })
    }
  })

// 預約表單
const send = document.querySelector('.send')

const nameId = document.querySelector('.name')
const idNumber = document.querySelector('.idNumber')
const birth = document.querySelector('.birth')
const mail = document.querySelector('.mail')
const phone = document.querySelector('.phone')
const remark = document.querySelector('.remark')

const departCheck = document.querySelector('.departCheck')
const dateCheck = document.querySelector('.dateCheck')
const timeCheck = document.querySelector('.timeCheck')
const symptomCheck = document.querySelector('.symptomCheck')
const nameCheck = document.querySelector('.nameCheck')
const idNumCheck = document.querySelector('.idNumCheck')
const birthCheck = document.querySelector('.birthCheck')
const mailCheck = document.querySelector('.mailCheck')
const phoneCheck = document.querySelector('.phoneCheck')
const sexCheck = document.querySelector('.sexCheck')
const remarkCheck = document.querySelector('.remarkCheck')

// 送出預約表單資訊
send.addEventListener('click', function (e) {
  const selectDepart = document.querySelector('input[type=radio][name=department]:checked')
  departCheck.innerHTML = `<p>${selectDepart.value}</p>`
  const selectTime = document.querySelector('input[type=radio][name=time]:checked')
  timeCheck.innerHTML = `<p>${selectTime.value}</p>`
  const selected = document.querySelector('input[type=radio][name=sex]:checked')
  sexCheck.innerHTML = `<p>${selected.value}</p>`
  const symptom = document.querySelector('#symptom')
  symptomCheck.innerHTML = `<p>${symptom.value}</p>`
  const date = document.querySelector('#date')
  dateCheck.innerHTML = `<p>${date.value}</p>`
  nameCheck.innerHTML = `<p>${nameId.value}</p>`
  idNumCheck.innerHTML = `<p>${idNumber.value}</p>`
  birthCheck.innerHTML = `<p>${birth.value}</p>`
  mailCheck.innerHTML = `<p>${mail.value}</p>`
  phoneCheck.innerHTML = `<p>${phone.value}</p>`
  remarkCheck.innerHTML = `<p>${remark.value}</p>`
})

// 將預約表單資訊推入資料庫
const save = document.querySelector('.save')

save.addEventListener('click', function (e) {
  const selectDepart = document.querySelector('input[type=radio][name=department]:checked')
  const selectTime = document.querySelector('input[type=radio][name=time]:checked')
  const symptom = document.querySelector('#symptom')
  const date = document.querySelector('#date')
  const selected = document.querySelector('input[type=radio][name=sex]:checked')
  axios.post('http://localhost:4000/Appointment', {

    depart: selectDepart.value,
    date: date.value,
    time: selectTime.value,
    symptom: symptom.value,
    name: nameId.value,
    sex: selected.value,
    idNum: idNumber.value,
    birth: birth.value,
    mail: mail.value,
    phone: phone.value,
    remark: remark.value
  })

  alert('預約成功')

  // 清空輸入格內值，方便下次輸入
  // selectDepart.value ="";
  symptom.value = ''
  date.value = ''
  nameId.value = ''
  idNumber.value = ''
  birth.value = ''
  mail.value = ''
  phone.value = ''
  remark.value = ''
})
