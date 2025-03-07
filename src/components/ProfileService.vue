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

    <!-- 新增按钮：订单和购物车 -->
    <div class="button-container">
      <button class="profile-button" @click="goToOrders">
        <i class="fas fa-list-alt"></i>我的订单
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';

// 用户信息
const user = ref({
  avatar: 'https://via.placeholder.com/150', // 默认头像
  nickname: '用户昵称',
  username: 'user123'
});

// 获取父组件提供的 changeTab 方法
const changeTab = inject('changeTab');

// 跳转到订单页面
const goToOrders = () => {
  if (changeTab) {
    changeTab('orderList'); // 切换到订单列表 Tab
  }
  console.log('跳转到订单页面');
};
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
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.username {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

/* 新增按钮容器样式 */
.button-container {
  display: flex;
  gap: 1rem; /* 按钮之间的间距 */
  margin-top: 1rem;
}

/* 按钮样式 */
.profile-button {
  padding: 0.8rem 1.5rem;
  background: #4a90e2;
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 图标和文本之间的间距 */
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.profile-button i {
  font-size: 1.2rem;
}
</style>