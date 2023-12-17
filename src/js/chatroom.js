// const chatMessages = document.querySelector('.chat-messages')
window.onload = function () {
  document.getElementById('.enterMessage').focus()
}
// eslint-disable-next-line no-unused-vars
function sendMessage () {
// 在這裡處理送出訊息的邏輯
  const inputElement = document.querySelector('.enterMessage')
  const message = inputElement.value

  if (message.trim() !== '') {
    const messagesContainer = document.querySelector('.chat-messages')
    const newMessage = document.createElement('div')
    const timestamp = new Date().toLocaleTimeString() // 取得現在時間
    // 使用 innerHTML 替代 textContent
    newMessage.innerHTML = `<div class="timestamp">${timestamp}</div>${message}`
    const timestampElement = newMessage.querySelector('.timestamp')
    timestampElement.style.fontSize = '0.7em'
    // 為新消息設定背景樣式
    newMessage.style.backgroundColor = '#66BAB7'
    newMessage.style.borderRadius = '10px'
    newMessage.style.padding = '8px'
    newMessage.style.color = '#fff'
    newMessage.style.fontSize = '1.2em'
    // 動態計算寬度
    const messageWidth = (message.length + 8) * 10 // 調整字元與寬度的比例
    newMessage.style.marginLeft = 'auto'
    newMessage.style.width = `${messageWidth}px`

    // 將新消息添加到消息容器中
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
