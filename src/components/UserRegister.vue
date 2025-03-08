<template>
  <div class="chat-container">
    <!-- 注册表单 -->
    <div class="username-input">
      <input v-model="username" placeholder="请输入姓名" />
      <input v-model="account" placeholder="请输入账号" />
      <input v-model="password" placeholder="请输入密码" type="password" />
      <input v-model="phone" placeholder="请输入手机号" />
      <input v-model="email" placeholder="请输入邮箱" />

      <!-- 验证码输入框和获取验证码按钮 -->
      <div class="captcha-wrapper">
        <input v-model="captcha" placeholder="请输入验证码" />
        <button class="captcha-button" @click="getCaptcha" :disabled="isCaptchaLoading || countdown > 0">
          {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
        </button>
      </div>

      <!-- 注册和返回按钮 -->
      <div class="button-group">
        <button class="register-button" @click="userRegister">注册</button>
        <button class="back-button" @click="goBack">返回</button>
      </div>

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
const username = ref(''); // 姓名
const account = ref(''); // 账号
const password = ref(''); // 密码
const phone = ref(''); // 手机号
const email = ref(''); // 邮箱
const captcha = ref(''); // 验证码
const isCaptchaLoading = ref(false); // 是否正在获取验证码
const countdown = ref(0); // 倒计时

// ------------ 校验手机号 ------------
const validatePhone = (phone) => {
  const phoneRegex = /^1[3456789]\d{9}$/; // 中国大陆手机号正则
  return phoneRegex.test(phone);
};

// ------------ 校验邮箱 ------------
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 简单邮箱正则
  return emailRegex.test(email);
};

// ------------ 获取验证码 ------------
const getCaptcha = async () => {
  // 校验手机号和邮箱
  if (!validatePhone(phone.value)) {
    Swal.fire({
      icon: 'error',
      text: '请输入有效的手机号',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  if (!validateEmail(email.value)) {
    Swal.fire({
      icon: 'error',
      text: '请输入有效的邮箱',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  try {
    isCaptchaLoading.value = true; // 禁用按钮，防止重复点击

    // 调用获取验证码接口
    const response = await axios.post('http://localhost:8082/captcha/getCaptcha', {
      phone: phone.value,
      email: email.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.data.code === "0000") {
      Swal.fire({
        icon: 'info',
        text: '验证码已发送',
        timer: 1000,
        showConfirmButton: false,
        showCloseButton: true,
      });

      // 开始倒计时
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    } else {
      Swal.fire({
        icon: 'error',
        text: response.data.message,
        confirmButtonText: '确定',
        confirmButtonColor: '#4a90e2',
      });
    }
  } catch (error) {
    console.error('获取验证码失败:', error);
    Swal.fire({
      icon: 'error',
      text: '无法连接到服务器，请稍后重试',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
  } finally {
    isCaptchaLoading.value = false; // 恢复按钮状态
  }
};

// ------------ 注册逻辑 ------------
const goBack= () => {
  window.location.href = '/';
  return;
}
const userRegister = async () => {
  if (username.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      text: '姓名不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  if (account.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      text: '账号不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  if (password.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      text: '密码不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }
  if (captcha.value.trim() === "") {
    Swal.fire({
      icon: 'error',
      text: '验证码不能为空',
      confirmButtonText: '确定',
      confirmButtonColor: '#4a90e2',
    });
    return;
  }

  try {
    // 先验证验证码
    const verifyResponse = await axios.post('http://localhost:8082/captcha/verifyCaptcha', {
      captcha: captcha.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim()
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (verifyResponse.data.code !== "0000") {
      Swal.fire({
        icon: 'error',
        text: verifyResponse.data.message,
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1000
      });
      return;
    }

    // 验证码通过后，发送注册请求
    const registerResponse = await axios.post('http://localhost:8082/account/createAccount', {
      name: username.value.trim(),
      password: password.value.trim(),
      account: account.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // 处理注册响应
    if (registerResponse.data.code === "0000") {
      Swal.fire({
        icon: 'success',
        text: '注册成功，请登录以继续',
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
        text: registerResponse.data.message,
        confirmButtonText: '确定',
        confirmButtonColor: '#4a90e2',
      });
    }
  } catch (error) {
    console.error('注册请求失败:', error);
    Swal.fire({
      icon: 'error',
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

/* ========== 验证码输入框和按钮 ========== */
.captcha-wrapper {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.captcha-wrapper input {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
}

.captcha-button {
  flex-shrink: 0;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #ff6b6b; /* 验证码按钮背景色 */
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.captcha-button:hover {
  background: #ff5252; /* 验证码按钮悬停背景色 */
}

.captcha-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* ========== 注册按钮 ========== */
.register-button {
  width: 100%;
  max-width: 400px;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #4a90e2; /* 注册按钮背景色 */
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-button:hover {
  background: #357abd; /* 注册按钮悬停背景色 */
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
/* ========== 按钮组 ========== */
.button-group {
  display: flex;
  gap: 1rem; /* 按钮之间的间距 */
  width: 100%;
  max-width: 400px;
}

/* ========== 注册按钮 ========== */
.register-button {
  flex: 1; /* 均匀分布 */
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #50c878; /* 蓝色 */
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-button:hover {
  background: #3cb371; /* 深蓝色 */
}

/* ========== 返回按钮 ========== */
.back-button {
  flex: 1; /* 均匀分布 */
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #4a90e2; /* 红色 */
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: #357abd; /* 深红色 */
}
</style>