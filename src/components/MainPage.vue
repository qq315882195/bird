<template>
  <div class="chat-container">
    <!-- 页面标题 -->
    <h1>主页面</h1>

    <!-- Tab 内容 -->
    <div class="tab-content">
      <!-- 客服页面 -->
      <div v-if="activeTab === 'customerService'" class="tab-pane">
        <h2>客服页面</h2>
        <p>这里是客服页面内容。</p>
      </div>

      <!-- 商城页面 -->
      <div v-if="activeTab === 'shop'" class="tab-pane">
        <h2>商城页面</h2>
        <p>这里是商城页面内容。</p>
      </div>

      <!-- 个人中心页面 -->
      <div v-if="activeTab === 'profile'" class="tab-pane">
        <h2>个人中心页面</h2>
        <p>这里是个人中心页面内容。</p>
      </div>
    </div>

    <!-- Tab 按钮（固定在底部） -->
    <div class="tab-bar">
      <div
          class="tab-item"
          :class="{ active: activeTab === 'customerService' }"
          @click="changeTab('customerService')"
      >
        <span>客服</span>
      </div>
      <div
          class="tab-item"
          :class="{ active: activeTab === 'shop' }"
          @click="changeTab('shop')"
      >
        <span>商城</span>
      </div>
      <div
          class="tab-item"
          :class="{ active: activeTab === 'profile' }"
          @click="changeTab('profile')"
      >
        <span>个人中心</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('customerService'); // 默认激活的 Tab

// 切换 Tab
const changeTab = (tab) => {
  activeTab.value = tab;
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
  background: linear-gradient(145deg, rgba(30, 30, 47, 0.8), rgba(42, 42, 64, 0.8)), url('../assets/img.png');
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

/* ========== Tab 内容 ========== */
.tab-content {
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  margin-bottom: 80px; /* 为底部 Tab 栏留出空间 */
}

.tab-pane {
  text-align: center;
}

/* ========== 底部 Tab 栏 ========== */
.tab-bar {
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  z-index: 1000;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 0.8rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
}

.tab-item.active {
  background: #4a90e2; /* 激活状态的背景色 */
  border-radius: 0.5rem;
}

.tab-item:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>