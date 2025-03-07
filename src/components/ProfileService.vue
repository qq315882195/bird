<template>
  <div class="profile-container">
    <!-- 头像 -->
    <div class="avatar-container">
      <img src="../assets/img.png" alt="头像" class="avatar" />
    </div>

    <!-- 昵称 -->
    <div class="nickname">
      {{ user.nickname }}
    </div>

    <!-- 账号 -->
    <div class="username">
      账号: {{ user.username }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 用户信息
const user = ref({
  avatar: 'https://via.placeholder.com/150', // 默认头像
  nickname: '用户昵称',
  username: 'user123'
});

</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #ffffff;
}

.avatar-container {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 3px solid #4a90e2;
}

.nickname {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.username {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.suggestion-button {
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.suggestion-button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>