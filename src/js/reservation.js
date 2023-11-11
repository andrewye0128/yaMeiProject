const nameId = document.querySelector('.name')
const idNum = document.querySelector('.idNum')
const birth = document.querySelector('.birth')
const mail = document.querySelector('.mail')
const phone = document.querySelector('.phone')
const remark = document.querySelector('.remark')

const inquire = document.querySelector('.inquire')
const send = document.querySelector('.send')
const save = document.querySelector('.save')

const departCheck = document.querySelector('.departCheck')
const timeCheck = document.querySelector('.timeCheck')
// const symptomCheck = document.querySelector('.symptomCheck');
const nameCheck = document.querySelector('.nameCheck')
const idNumCheck = document.querySelector('.idNumCheck')
const birthCheck = document.querySelector('.birthCheck')
const mailCheck = document.querySelector('.mailCheck')
const phoneCheck = document.querySelector('.phoneCheck')
const sexCheck = document.querySelector('.sexCheck')
const remarkCheck = document.querySelector('.remarkCheck')

const remindNameId = document.querySelector('.remindNameId')
const remindIdNum = document.querySelector('.remindIdNum')
const remindBirth = document.querySelector('.remindBirth')
const remindMail = document.querySelector('.remindMail')
const remindPhone = document.querySelector('.remindPhone')

send.addEventListener('click', function (e) {
  const selectDepart = document.querySelector('input[type=radio][name=department]:checked')
  departCheck.innerHTML = `<p>${selectDepart.value}</p>`
  const selectTime = document.querySelector('input[type=radio][name=time]:checked')
  timeCheck.innerHTML = `<p>${selectTime.value}</p>`
  const selected = document.querySelector('input[type=radio][name=sex]:checked')
  sexCheck.innerHTML = `<p>${selected.value}</p>`
  // const symptom = document.getElementsByName('symptom');
  // symptomCheck.innerHTML=`<p>${symptom.option[index].value}</p>`;
  nameCheck.innerHTML = `<p>${nameId.value}</p>`
  idNumCheck.innerHTML = `<p>${idNum.value}</p>`
  birthCheck.innerHTML = `<p>${birth.value}</p>`
  mailCheck.innerHTML = `<p>${mail.value}</p>`
  phoneCheck.innerHTML = `<p>${phone.value}</p>`
  remarkCheck.innerHTML = `<p>${remark.value}</p>`

  if (nameId.value == '') {
    remindNameId.innerHTML = '<span>*請輸入正確資訊</span>'
  } else if (idNum.value == '') {
    remindIdNum.innerHTML = '<span>*請輸入正確資訊</span>'
  } else if (birth.value == '') {
    remindIdNum.innerHTML = '<span>*請輸入正確資訊</span>'
  } else if (mail.value == '') {
    remindIdNum.innerHTML = '<span>*請輸入正確資訊</span>'
  } else if (phone.value == '') {
    remindIdNum.innerHTML = '<span>*請輸入正確資訊</span>'
  }
})

save.addEventListener('click', function (e) {
  const selected = document.querySelector('input[type=radio][name=sex]:checked')
  axios.post('http://localhost:3000/Resver', {
    name: nameId.value,
    sex: selected.value,
    idNum: idNum.value,
    birth: birth.value,
    mail: mail.value,
    phone: phone.value,
    remark: remark.value
  })
})
