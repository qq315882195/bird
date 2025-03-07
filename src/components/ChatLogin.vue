<template>
  <div class="chat-container">
    <!-- 账号称输入 -->
    <div class="username-input">
      <input v-model="tempUsername" placeholder="请输入账号" />
      <input v-model="tempPassword" placeholder="请输入密码" />
      <div class="button-group">
        <button class="login-button" @click="setUsername">登录</button>
        <button class="register-button" @click="goRegister">注册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 导入 useRouter
import { ref, onUnmounted } from 'vue'
import Swal from 'sweetalert2' // 引入 SweetAlert2
import axios from 'axios' // 引入 axios

// ------------ 状态管理 ------------
const username = ref('') // 当前账号
const tempUsername = ref('') // 临时账号输入
const tempPassword = ref('') // 临时账号输入
const router = useRouter(); // 获取路由实例
// ------------ WebSocket 连接 ------------
let stompClient = null

// ------------ 功能方法 ------------
// 设置账号
const goRegister = async () => {
  router.push('/userRegister'); // 跳转到注册页面
  return;
}
// 设置账号
const setUsername = async () => {
  if (tempUsername.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      text: '账号不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  if (tempPassword.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      text: '密码不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }

  try {
    // 发送 AJAX 请求
    await axios.post('http://localhost:8082/account/login', {
      account: tempUsername.value.trim(),
      password: tempPassword.value.trim(),
    }, {
      headers: {
        'Content-Type': 'application/json', // 设置请求头
      }
    }).then(response => {
      console.log('响应数据:', response);
      // 处理响应
      if (response.data.code==="0000" && response.data.data) {
        username.value = response.data.data.name;
        router.push('/chatRoom'); // 跳转到聊天室页面
      } else if(response.data.code==="0001"||response.data.code==="1001"){
        Swal.fire({
          icon: 'error',
          text: response.data.message,
          confirmButtonText: '确定',
          confirmButtonColor: '#4a90e2',
        });
      }else if(response.data.code==="1002"){
        Swal.fire({
          icon: 'warning',
          text: response.data.message,
          confirmButtonText: '前往注册',
          confirmButtonColor: '#4a90e2',
          showCloseButton: true,
          didOpen: () => {
            // 获取确认按钮
            const confirmButton = Swal.getConfirmButton();
            // 为确认按钮添加点击事件
            confirmButton.addEventListener('click', () => {
              console.log('确认按钮被点击了');
              // 在这里添加点击确认按钮后的逻辑
              // 跳转到注册页面
              // 使用 router.push 跳转到注册页面
              router.push('/userRegister');
            });
          }
        });
      }
    })

  } catch (error) {
    console.error('AJAX请求失败:', error);
    Swal.fire({
      icon: 'error',
      text: '无法连接到服务器，请稍后重试',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
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
  background: linear-gradient(145deg, rgba(30, 30, 47, 0.8), rgba(42, 42, 64, 0.8)); /* 替换为阿信的图片链接 */
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
/* ========== 按钮组 ========== */
.button-group {
  display: flex;
  gap: 1rem; /* 按钮之间的间距 */
  width: 100%;
  max-width: 400px;
}

/* ========== 登录按钮 ========== */
.login-button {
  flex: 1; /* 均匀分布 */
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #4a90e2; /* 蓝色 */
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #357abd; /* 深蓝色 */
}

/* ========== 注册按钮 ========== */
.register-button {
  flex: 1; /* 均匀分布 */
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #50c878; /* 绿色 */
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-button:hover {
  background: #3cb371; /* 深绿色 */
}
</style>