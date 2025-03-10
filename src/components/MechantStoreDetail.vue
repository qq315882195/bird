<template>
  <div class="store-detail-container">
    <h2 class="store-detail-title">门店详情</h2>

    <!-- 返回按钮 -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> 返回
    </button>

    <!-- 门店详情信息 -->
    <div class="store-info">
      <div class="info-group">
        <label>门店编号</label>
        <span>{{ store.code }}</span>
      </div>
      <div class="info-group">
        <label>门店名称</label>
        <span>{{ store.name }}</span>
      </div>
      <div class="info-group">
        <label>地址</label>
        <span>{{ store.address }}</span>
      </div>
      <div class="info-group">
        <label>状态</label>
        <span>{{ store.status }}</span>
      </div>
      <div class="info-group">
        <label>创建日期</label>
        <span>{{ store.createDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, inject} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const store = ref({});
// 获取父组件提供的 changeTab 方法
const switchMenu = inject('switchMenu');

// 获取门店详情
const fetchStoreDetail = async () => {
  const storeId = router.currentRoute.value.query.id; // 从路由参数中获取门店ID
  if (!storeId) {
    console.error('门店ID不存在');
    return;
  }
  try {
    const response = await axios.post('http://localhost:8084/store/getStore', {
      id: storeId,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.code === '0000') {
      store.value = response.data.data; // 设置门店详情
    } else {
      console.error('获取门店详情失败:', response.data.message);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
};

// 返回门店列表
const goBack = () => {
  switchMenu('stores'); // 返回到门店列表页面
};

// 组件挂载时获取门店详情
onMounted(() => {
  fetchStoreDetail();
});
</script>

<style scoped>
.store-detail-container {
  padding: 2rem;
  color: #ffffff;
  height: 100vh;
  overflow-y: auto;
}

.store-detail-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
}

/* 返回按钮 */
.back-button {
  padding: 0.5rem 1rem;
  background: #4a90e2;
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.back-button:active {
  transform: translateY(0);
}

/* 门店详情信息 */
.store-info {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.info-group label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.info-group span {
  font-size: 1.1rem;
  color: #ffffff;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
}
</style>