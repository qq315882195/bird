<template>
  <div class="profile-container">
    <!-- 右上角图标 -->
    <div class="top-right-icons">

      <i class="fas fa-headset icon" @click="showCustomerService"></i>
      <i class="fas fa-sign-out-alt icon" @click="logout"></i>
    </div>

    <!-- 头像 -->
    <div class="avatar-container">
      <img src="../assets/img.png" alt="头像" class="avatar" />
    </div>

    <!-- 昵称 -->
    <div class="nickname">
      {{ user.nickname }}
    </div>

    <!-- 新增按钮：订单和退出 -->
    <div class="button-container">
      <button class="profile-button" @click="goToOrders">
        <i class="fas fa-list-alt"></i>我的订单
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.css';

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

// 跳转到聊天页面
const showCustomerService = () => {
  if (changeTab) {
    changeTab('chatRoom'); // 切换到订单列表 Tab
  }
  console.log('跳转到聊天页面');
};

// 退出登录
const router = useRouter();
const logout = () => {
  // 确认机制
  Swal.fire({
    text: '确定要退出吗？',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4a90e2',
    cancelButtonColor: '#ff6b6b',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then((result) => {
    if (result.isConfirmed) {
      // 用户点击了确定按钮
      router.push('/'); // 假设登录页面的路由是 '/login'
    }
  });
};


</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #ffffff;
  position: relative; /* 使右上角图标定位生效 */
}

/* 右上角图标容器 */
.top-right-icons {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem; /* 图标之间的间距 */
}

/* 图标样式 */
.icon {
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.icon:hover {
  color: #4a90e2; /* 鼠标悬停时改变颜色 */
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
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.profile-button i {
  font-size: 1.2rem;
}

.out-button {
  padding: 0.8rem 2.5rem;
  background: #ff6b6b;
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
}

.out-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.out-button i {
  font-size: 1.2rem;
}
</style>