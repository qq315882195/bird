<template>
  <div class="chat-container">
    <!-- Tab 内容 -->
    <div class="tab-content">
      <!-- 客服页面 -->
      <div v-if="activeTab === 'chatRoom'" class="tab-pane">
        <ChatRoom></ChatRoom>
      </div>

      <!-- 商城页面 -->
      <div v-if="activeTab === 'shop'" class="tab-pane">
        <shopping-service></shopping-service>
      </div>

      <!-- 个人中心页面 -->
      <div v-if="activeTab === 'profile'" class="tab-pane">
        <profile-service></profile-service>
      </div>

      <!-- 订单列表页面 -->
      <div v-if="activeTab === 'orderList'" class="tab-pane">
        <order-list></order-list>
      </div>
      <!-- 我的购物车页面 -->
      <div v-if="activeTab === 'cart'" class="tab-pane">
        <my-cart></my-cart>
      </div>

      <!-- 我的购物车页面 -->
      <div v-if="activeTab === 'categoryService'" class="tab-pane">
        <category-service></category-service>
      </div>
    </div>

    <!-- Tab 栏（固定在底部） -->
    <div class="tab-bar">

      <div
          class="tab-item"
          :class="{ active: activeTab === 'shop' }"
          @click="changeTab('shop')"
      >

        <i class="fas fa-home"></i>
        <span>首页</span>
      </div>
      <div
          class="tab-item"
          :class="{ active: activeTab === 'categoryService' }"
          @click="changeTab('categoryService')"
      >

        <i class="fas fa-th"></i>
        <span>分类</span>
      </div>
      <div
          class="tab-item"
          :class="{ active: activeTab === 'cart' }"
          @click="changeTab('cart')"
      >
        <i class="fas fa-shopping-cart"></i>
        <span>购物车</span>
      </div>
      <div
          class="tab-item"
          :class="{ active: activeTab === 'profile' }"
          @click="changeTab('profile')"
      >
        <i class="fas fa-user"></i>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import ShoppingService from "@/components/ShoppingService.vue";
import ProfileService from "@/components/ProfileService.vue";
import ChatRoom from "@/components/ChatRoom.vue";
import OrderList from "@/components/OrderList.vue";
import MyCart from "@/components/MyCart.vue"; // 引入订单列表组件
import CategoryService from "@/components/CategoryService.vue";

const activeTab = ref('shop'); // 默认激活的 Tab

// 切换 Tab
const changeTab = (tab) => {
  activeTab.value = tab;
};

// 将 changeTab 方法提供给子组件使用
provide('changeTab', changeTab);
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
  background: linear-gradient(145deg, rgba(30, 30, 47, 0.8), rgba(42, 42, 64, 0.8));
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
  z-index: 1000;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 0.8rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-item.active {
  color: #4a90e2; /* 激活状态的颜色 */
}


.tab-item i {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
</style>