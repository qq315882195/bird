<template>
  <div class="chat-container">
    <!-- 聊天主界面 -->
    <div  class="chat-main">
      <div class="message-list" ref="messageList">
        <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message-item"
            :class="{ 'message-item-right': msg.sender === username, 'message-item-left': msg.sender !== username }"
        >
          <div class="message-content-wrapper">
            <span class="message-time">{{ msg.currentTime }}</span>
            <span class="message-content">{{ msg.content }}</span>
          </div>
        </div>
      </div>

      <div class="message-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted, nextTick } from 'vue'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

// ------------ 状态管理 ------------
const username = ref('') // 当前账号
const newMessage = ref('') // 新消息输入
const messages = reactive([]) // 消息列表
const messageList = ref(null) // 消息容器的DOM引用
// ------------ WebSocket 连接 ------------
let stompClient = null

// 连接WebSocket
const connect = () => {
  const socket = new SockJS('http://127.0.0.1:8082/ws-chat') // 后端WebSocket地址
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 50000,
    heartbeatIncoming: 40000,
    heartbeatOutgoing: 40000,
    onConnect: () => {
      stompClient.subscribe('/topic/messages', (message) => {
        const msg = JSON.parse(message.body)
        console.log('msg', msg);
        messages.push(msg);
        scrollToBottom()
      })
    },
    onStompError: (frame) => {
      console.error('WebSocket连接错误:', frame.headers.message)
    },
  })
  console.log('stompClient', stompClient);
  stompClient.activate()
}
connect();
// ------------ 功能方法 ------------

// 发送消息
const sendMessage = () => {
  console.log('sendMessage',stompClient?.connected);
  if (newMessage.value.trim() && stompClient?.connected) {
    const message = {
      sender: username.value,
      content: newMessage.value.trim(),
      currentTime: new Date().toLocaleTimeString()
    }
    stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(message)
    })
    messages.push(message);
    newMessage.value = ''
  }
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight
  }
}

// ------------ 生命周期 ------------
onUnmounted(() => {
  if (stompClient) {
    stompClient.deactivate() // 断开连接
  }
})
</script>

<style scoped>
/* ========== 全局响应式容器 ========== */
.chat-container {
  width: 95%;
  max-width: 800px;
  min-height: 90vh;
  margin: 2vh auto;
  padding: 2rem;
  border-radius: 1.5rem;
  background: linear-gradient(145deg, rgba(30, 30, 47, 0.8), rgba(42, 42, 64, 0.8)), url('../assets/img.png'); /* 替换为阿信的图片链接 */
  background-size: cover;
  background-position: center;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  color: #ffffff;
  position: relative;
}

.chat-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; /* 半透明遮罩层 */
  border-radius: 1.5rem;
  z-index: 1;
}

.chat-container > * {
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .chat-container {
    width: 100%;
    margin: 0;
    border-radius: 0;
    min-height: 100vh;
    padding: 1rem;
  }
}

/* ========== 自适应标题 ========== */
h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  text-align: center;
  margin: 1rem 0;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* ========== 弹性输入区域 ========== */
.username-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 15rem;
}

.username-input input {
  width: 100%;
  max-width: 400px;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
}

.username-input input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.username-input button {
  width: 100%;
  max-width: 400px;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #4a90e2;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.username-input button:hover {
  background: #357abd;
}

/* ========== 响应式消息列表 ========== */
.message-list {
  flex: 1;
  height: 60vh;
  margin-bottom: 1.5rem;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}

@media (max-width: 480px) {
  .message-list {
    height: 70vh;
    padding: 0.5rem;
  }
}

/* ========== 自适应消息气泡 ========== */
.message-item {
  max-width: 75%;
  margin: 1rem 0;
  padding: 1rem;
  font-size: clamp(14px, 2vw, 16px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: #ffffff;
  transition: transform 0.3s ease;
  position: relative;
}

.message-item:hover {
  transform: translateY(-5px);
}

/* 右侧消息气泡 */
.message-item-right {
  margin-left: auto;
  background: #4a90e2;
  border-radius: 1rem 1rem 0 1rem;
}

/* 左侧消息气泡 */
.message-item-left {
  margin-right: auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem 1rem 1rem 0;
}

/* 消息内容容器 */
.message-content-wrapper {
  display: flex;
  flex-direction: column;
}

/* 时间显示 */
.message-time {
  font-size: clamp(10px, 1.6vw, 12px);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  line-height: 0; /* 设置行高为0.8rem */
}

/* 鼠标悬浮时显示时间 */
.message-item:hover .message-time {
  opacity: 1;
}

/* 消息内容 */
.message-content {
  word-break: break-word;
}

/* 发送者名称 */
.message-sender {
  font-size: clamp(12px, 1.8vw, 14px);
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .message-item {
    max-width: 90%;
    padding: 0.8rem;
    margin: 0.8rem 0;
  }
}

/* ========== 弹性输入框 ========== */
.message-input {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.message-input input {
  flex: 1;
  min-width: 120px;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
}

.message-input input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.message-input button {
  flex-shrink: 0;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #4a90e2;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.message-input button:hover {
  background: #357abd;
}

@media (max-width: 480px) {
  .message-input {
    flex-direction: column;
  }
}

/* ========== 自适应按钮系统 ========== */
button {
  font-size: clamp(14px, 2vw, 16px);
  padding: 0.8rem 1.5rem;
  white-space: nowrap;
}

/* ========== 移动端优化 ========== */
@media (hover: none) {
  .message-item:hover {
    transform: none;
  }

  button:hover {
    transform: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

/* ========== 系统消息响应式 ========== */
.system-message {
  font-size: clamp(12px, 1.8vw, 14px);
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: #ffffff;
}
</style>