<template>
  <div class="chat-container">、
    <h1>注册新用户</h1>
    <!-- 注册表单 -->
    <div class="username-input">

      <input v-model="username" placeholder="请输入用户名" />
      <input v-model="password" placeholder="请输入密码" type="password" />
      <input v-model="confirmPassword" placeholder="请确认密码" type="password" @keyup.enter="userRegister" />
      <button @click="userRegister">注册</button>
      <p class="login-link">
        已有账号？<a href="/">去登录</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

// ------------ 状态管理 ------------
const username = ref(''); // 用户名
const password = ref(''); // 密码
const confirmPassword = ref(''); // 确认密码

// ------------ 注册逻辑 ------------
const userRegister = async () => {
  if (username.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      title: '错误',
      text: '用户名不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  if (password.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      title: '错误',
      text: '密码不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: '错误',
      text: '两次输入的密码不一致',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }

  try {
    // 发送注册请求
    const response = await axios.post('http://localhost:8082/account/createAccount', {
      username: username.value.trim(),
      password: password.value.trim(),
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // 处理响应
    if (response.data.code === "0000") {
      Swal.fire({
        icon: 'success',
        title: '注册成功',
        text: '请登录以继续',
        confirmButtonText: '去登录',
        confirmButtonColor: '#4a90e2',
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.addEventListener('click', () => {
            // 跳转到登录页面
            window.location.href = '/'; // 替换为你的登录页面路径
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '注册失败',
        text: response.data.message,
        confirmButtonText: '确定',
        confirmButtonColor: '#4a90e2',
      });
    }
  } catch (error) {
    console.error('注册请求失败:', error);
    Swal.fire({
      icon: 'error',
      title: '请求失败',
      text: '无法连接到服务器，请稍后重试',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
  }
};
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
  background: linear-gradient(145deg, rgba(30, 30, 47, 0.8), rgba(42, 42, 64, 0.8)), url('../assets/img2.webp'); /* 替换为你的背景图链接 */
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
  bottom: 0;
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

/* ========== 登录链接 ========== */
.login-link {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
}

.login-link a {
  color: #4a90e2;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>