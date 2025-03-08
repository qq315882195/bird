<template>
  <div class="order-detail-container">
    <h2 class="order-detail-title">订单详情</h2>

    <!-- 订单基本信息 -->
    <div class="order-info-card">
      <div class="info-group">
        <span class="info-label">订单号:</span>
        <span class="info-value">{{ order.id }}</span>
      </div>
      <div class="info-group">
        <span class="info-label">状态:</span>
        <span class="info-value">{{ order.status }}</span>
      </div>
      <div class="info-group">
        <span class="info-label">总价:</span>
        <span class="info-value">￥{{ order.total }}</span>
      </div>
      <div class="info-group">
        <span class="info-label">日期:</span>
        <span class="info-value">{{ order.date }}</span>
      </div>
    </div>


    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="action-button back" @click="goBack">
        <i class="fas fa-arrow-left"></i> 返回
      </button>
    </div>
  </div>
</template>

<script setup>
import {inject, ref} from 'vue';


// 模拟订单数据
const order = ref({
  id: 1,
  status: '已发货',
  total: 299.99,
  date: '2023-10-03',
  items: [
    {
      id: 1,
      name: '商品 1',
      price: 99.99,
      quantity: 2,
    },
    {
      id: 2,
      name: '商品 2',
      price: 199.99,
      quantity: 1,
    },
  ],
});

// 返回上一页
const switchMenu = inject('switchMenu');
const goBack = () => {
  if (switchMenu) {
    switchMenu('orders'); // 切换到订单列表 Tab
  }
};
</script>

<style scoped>
.order-detail-container {
  padding: 2rem;
  color: #ffffff;
  height: 100vh;
  overflow-y: auto;
}

.order-detail-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
}

/* 订单基本信息卡片 */
.order-info-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.info-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.info-value {
  font-size: 1rem;
  color: #ffffff;
  font-weight: bold;
}

/* 商品列表卡片 */
.product-list-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-list-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
}

td {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-button.back {
  background: #4a90e2;
}

.action-button.update {
  background: #00cc66;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.action-button:active {
  transform: translateY(0);
}
</style>