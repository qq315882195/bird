<template>
  <div class="main-container">
    <!-- 左侧菜单栏 -->
    <div class="sidebar">
      <div class="sidebar-brand" @click="switchMenu('index')">管理平台</div>
      <div class="sidebar-menu">
        <div
            v-for="menu in menus"
            :key="menu.name"
            :class="['menu-item', { active: activeMenu === menu.name }]"
            @click="switchMenu(menu.name)"
        >
          <i :class="menu.icon"></i>
          <span>{{ menu.label }}</span>
        </div>
      </div>
    </div>

    <!-- 右侧内容展示区域 -->
    <div class="content-container">
      <div v-if="activeMenu === 'index'" class="content-card">

        <p>这里是主页的内容。</p>
      </div>
      <div v-if="activeMenu === 'products'" class="content-card">
        <h2>商品管理</h2>
        <p>这里是商品管理的内容。</p>
      </div>
      <div v-if="activeMenu === 'orders'" class="content-card">
        <MechantOrderList />
      </div>
      <div v-if="activeMenu === 'mechantOrderDetail'" class="content-card">
        <MechantOrderDetail />
      </div>
      <div v-if="activeMenu === 'stores'" class="content-card">
        <h2>门店管理</h2>
        <p>这里是用户管理的内容。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,provide } from 'vue';
import MechantOrderList from "@/components/MechantOrderList.vue";
import MechantOrderDetail from "@/components/MechantOrderDetail.vue";

// 菜单项
const menus = ref([
  { name: 'products', label: '商品管理', icon: 'fas fa-box' },
  { name: 'orders', label: '订单管理', icon: 'fas fa-shopping-cart' },
  { name: 'stores', label: '门店管理', icon: 'fas fa-store' },
]);

// 当前选中的菜单
const activeMenu = ref('index');

// 切换菜单
const switchMenu = (menuName) => {
  activeMenu.value = menuName;
};
// 将 switchMenu 方法提供给子组件使用
provide('switchMenu', switchMenu);

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

.main-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(-45deg, #1e1e1e, #2c3e50, #34495e, #1e1e1e);
  background-size: 400% 400%;
  animation: gradientBackground 10s ease infinite;
  color: #ffffff;
}

/* 左侧菜单栏 */
.sidebar {
  width: 250px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
}

.sidebar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 2rem;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #4a90e2;
  transform: translateX(5px);
}
.sidebar-brand{
  cursor: pointer; /* 添加这一行 */
}
.menu-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: #4a90e2;
  font-weight: bold;
}

.menu-item i {
  font-size: 1.2rem;
}

/* 右侧内容展示区域 */
.content-container {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.content-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
}

p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}
</style>