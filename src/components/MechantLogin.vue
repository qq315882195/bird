<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">运营平台登录</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
              type="text"
              id="username"
              v-model="username"
              placeholder="请输入用户名"
              required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
              type="password"
              id="password"
              v-model="password"
              placeholder="请输入密码"
              required
          />
        </div>
        <div class="form-options">
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        <button type="submit" class="login-button">
          <i class="fas fa-sign-in-alt"></i> 登录
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 表单数据
const username = ref('');
const password = ref('');
const rememberMe = ref(false);

// 处理登录
const handleLogin = () => {
  console.log('登录信息:', {
    username: username.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });

  // 模拟登录成功
  alert('登录成功！');
  router.push('/mainMechantPage'); // 跳转到仪表盘页面
};
</script>

<style scoped>
/* 背景动画 */
@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #1e1e1e, #2c3e50, #34495e, #1e1e1e);
  background-size: 400% 400%;
  animation: gradientBackground 10s ease infinite;
  color: #ffffff;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffffff;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  display: block;
}

input {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.3s ease, background 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  background: rgba(255, 255, 255, 0.2);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.forgot-password {
  font-size: 0.9rem;
  color: #4a90e2;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: rgba(255, 255, 255, 0.8);
}

.login-button {
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(45deg, #4a90e2, #00cc66);
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.login-button:hover {
  background: linear-gradient(45deg, #00cc66, #4a90e2);
  transform: translateY(-2px);
}

.login-button:active {
  transform: translateY(0);
}
</style>