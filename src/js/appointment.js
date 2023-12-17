import headers from "../js/header.js";

// // 漢堡排事件
headers.menu.addEventListener("click", headers.menuDisplayToggle);
headers.close.addEventListener("click", headers.closeDisplayToggle);


document.addEventListener("DOMContentLoaded", async function () {
  headers.aLink();
});

// 目前看診號碼
const nowNum = document.querySelector('.nowNum')

function getNum() {
  const callNumberStr = localStorage.getItem('callNumber')
  nowNum.textContent = `${callNumberStr}`
}

getNum()

// 查詢預約資訊
axios.get('https://yameiproject.onrender.com/Appointment')
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
     <p class="timeCheck p-3 text-center ">${data.num}</p>

     </div>
     </div>`
        })
    }

    document.querySelector('[data-appointmentInfo-form]').addEventListener('submit', (e) => {
      e.preventDefault()
      if (inquireFilter(e.target.searchIdNum.value).length > 0) {
        renderInfo(generateInquireHTML(inquireFilter(e.target.searchIdNum.value)))
      } else {
        alert('查無此資料')
      }
    })

    function inquireFilter(targetInfo, allAppointment = data) {
      return allAppointment.filter((data) => {
        return data.idNum.includes(targetInfo)
      })
    }
  })

// 送出預約表單資訊
const send = document.querySelector('#send')
const nameId = document.querySelector('.name')
const idNumber = document.querySelector('.idNumber')
const birth = document.querySelector('.birth')
const mail = document.querySelector('.mail')
const phone = document.querySelector('.phone')
const remark = document.querySelector('.remark')

const departCheck = document.querySelector('.departCheck')
const dateCheck = document.querySelector('.dateCheck')
const timeCheck = document.querySelector('.timeCheck')
const numCheck = document.querySelector('.numCheck')
const symptomCheck = document.querySelector('.symptomCheck')
const nameCheck = document.querySelector('.nameCheck')
const idNumCheck = document.querySelector('.idNumCheck')
const birthCheck = document.querySelector('.birthCheck')
const mailCheck = document.querySelector('.mailCheck')
const phoneCheck = document.querySelector('.phoneCheck')
const sexCheck = document.querySelector('.sexCheck')
const remarkCheck = document.querySelector('.remarkCheck')

function sendForm() {
  // 預約表單
  send.addEventListener('click', function (e) {
    const selectDepart = document.querySelector(
      "input[type=radio][name=department]:checked"
    );


    // 如果使用者沒有輸入任何預約資訊
    if (
      Object.is(selectDepart, null) ||
      Object.is(dateCheck, null) ||
      Object.is(timeCheck, null) ||
      Object.is(numCheck, null) ||
      Object.is(symptomCheck, null) ||
      Object.is(nameCheck, null) ||
      Object.is(idNumCheck, null) ||
      Object.is(birthCheck, null) ||
      Object.is(mailCheck, null) ||
      Object.is(phoneCheck, null) ||
      Object.is(sexCheck, null) ||
      Object.is(remarkCheck, null)
    ) {

      Swal.fire({
        title: "預約資訊空白",
        text: "請輸入個人預約資訊",
        icon: "error",
      });

      return
    }

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


    // 預約號碼生成
    axios
      .get("https://yameiproject.onrender.com/Appointment")
      .then(function (response) {
        const data = response.data;
        // const date = document.querySelector('#date')

        const dateTotal = {};
        data.forEach(function (item) {
          if (dateTotal[item.date] == undefined) {
            dateTotal[item.date] = 1;
          } else {
            dateTotal[item.date] += 1;
          }
        });

        const dateArr = Object.keys(dateTotal);
        const numArr = Object.values(dateTotal);
        const indexOfDate = dateArr.indexOf(date.value);

        if (indexOfDate !== -1) {
          const numIndex = numArr[indexOfDate];
          numCheck.innerHTML = `<span>${numIndex + 1}</span>`;
        } else {
          numCheck.innerHTML = "<span >1</span>";
        }

        // 提示查看『請檢查輸入訊息』欄位
        Swal.fire({
          title: "小提醒",
          text: "請查看『請檢查輸入訊息』欄位",
          icon: "info",
        });
      });
  })
}

// 將預約表單資訊推入資料庫
const save = document.querySelector('#save')

function saveForm() {
  save.addEventListener('click', function (e) {
    const selectDepart = document.querySelector(
      "input[type=radio][name=department]:checked"
    );
    const selectTime = document.querySelector(
      "input[type=radio][name=time]:checked"
    );
    const symptom = document.querySelector("#symptom");
    const date = document.querySelector("#date");
    const selected = document.querySelector(
      "input[type=radio][name=sex]:checked"
    );

    axios.post("https://yameiproject.onrender.com/Appointment", {
      depart: selectDepart.value,
      date: date.value,
      time: selectTime.value,
      num: numCheck.innerText,
      symptom: symptom.value,
      name: nameId.value,
      sex: selected.value,
      idNum: idNumber.value,
      birth: birth.value,
      mail: mail.value,
      phone: phone.value,
      remark: remark.value,
      attendStatus: false,
    });

    // 提示 => 預約成功
    Swal.fire({
      title: "預約成功!",
      icon: "success",
    });

    // 清空輸入格內值，方便下次輸入
    // selectDepart.value ="";
    symptom.value = "";
    date.value = "";
    nameId.value = "";
    idNumber.value = "";
    birth.value = "";
    mail.value = "";
    phone.value = "";
    remark.value = "";
  })
}

sendForm();
saveForm();

// 將所有需要匯出的內容放入一個物件
const appointmentModule = {
  nowNum,
  getNum,
  sendForm,
  saveForm
  // send,
  // nameId,
  // idNumber,
  // birth,
  // mail,
  // phone,
  // remark,
  // departCheck,
  // dateCheck,
  // timeCheck,
  // numCheck,
  // symptomCheck,
  // nameCheck,
  // idNumCheck,
  // birthCheck,
  // mailCheck,
  // phoneCheck,
  // sexCheck,
  // remarkCheck
}

// 導出整個物件
// export default appointmentModule
