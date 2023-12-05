// eslint-disable-next-line no-unused-vars
function sendMessage () {
// 在這裡處理送出訊息的邏輯
  const inputElement = document.querySelector('.enterMessage')
  const message = inputElement.value

  if (message.trim() !== '') {
    const messagesContainer = document.querySelector('.chat-messages')
    const newMessage = document.createElement('div')
    newMessage.textContent = message
    messagesContainer.appendChild(newMessage)

    // 清空輸入框
    inputElement.value = ''

    // 滾動到最底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
}

// 監聽 input 元素的鍵盤事件
document.querySelector('.enterMessage').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage()
  }
})

// 控制聊天室的顯示與隱藏
// eslint-disable-next-line no-unused-vars
function toggleChat () {
  const chatContainer = document.querySelector('.chatroom')
  chatContainer.style.bottom = chatContainer.style.bottom === '0px' ? '-660px' : '0px'
}
