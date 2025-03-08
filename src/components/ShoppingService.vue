<template>
  <div class="shopping-container">
    <!-- 门店地址 -->
    <div class="store-address">
      <i class="fas fa-map-marker-alt"></i> 门店地址：北京市朝阳区某某路123号
    </div>

    <!-- 置顶搜索框 -->
    <div class="search-bar">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="请输入商品名称"
          class="search-input"
      />
      <button @click="search" class="search-button">搜索</button>
    </div>

    <!-- 商品展示区域 -->
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-column">
          <img :src="product.image" alt="商品图片" class="product-image" />
          <div class="product-info">
            <div class="product-price">￥{{ product.price }}</div>
            <div class="product-description">{{ product.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多提示 -->
    <div v-if="loading" class="loading">加载中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 搜索框内容
const searchQuery = ref('');

// 商品数据
const products = ref([]);

// 模拟的商品数据
const mockProducts = [
  { id: 1, image: 'https://via.placeholder.com/150', price: 99.99, description: '商品描述 1' },
  { id: 2, image: 'https://via.placeholder.com/150', price: 199.99, description: '商品描述 2' },
  { id: 3, image: 'https://via.placeholder.com/150', price: 299.99, description: '商品描述 3' },
  { id: 4, image: 'https://via.placeholder.com/150', price: 399.99, description: '商品描述 4' },
  { id: 5, image: 'https://via.placeholder.com/150', price: 499.99, description: '商品描述 5' },
  { id: 6, image: 'https://via.placeholder.com/150', price: 599.99, description: '商品描述 6' },
  { id: 1, image: 'https://via.placeholder.com/150', price: 99.99, description: '商品描述 1' },
  { id: 2, image: 'https://via.placeholder.com/150', price: 199.99, description: '商品描述 2' },
  { id: 3, image: 'https://via.placeholder.com/150', price: 299.99, description: '商品描述 3' },
  { id: 4, image: 'https://via.placeholder.com/150', price: 399.99, description: '商品描述 4' },
  { id: 5, image: 'https://via.placeholder.com/150', price: 499.99, description: '商品描述 5' },
  { id: 6, image: 'https://via.placeholder.com/150', price: 599.99, description: '商品描述 6' },
  { id: 1, image: 'https://via.placeholder.com/150', price: 99.99, description: '商品描述 1' },
  { id: 2, image: 'https://via.placeholder.com/150', price: 199.99, description: '商品描述 2' },
  { id: 3, image: 'https://via.placeholder.com/150', price: 299.99, description: '商品描述 3' },
  { id: 4, image: 'https://via.placeholder.com/150', price: 399.99, description: '商品描述 4' },
  { id: 5, image: 'https://via.placeholder.com/150', price: 499.99, description: '商品描述 5' },
  { id: 6, image: 'https://via.placeholder.com/150', price: 599.99, description: '商品描述 6' },
  { id: 1, image: 'https://via.placeholder.com/150', price: 99.99, description: '商品描述 1' },
  { id: 2, image: 'https://via.placeholder.com/150', price: 199.99, description: '商品描述 2' },
  { id: 3, image: 'https://via.placeholder.com/150', price: 299.99, description: '商品描述 3' },
  { id: 4, image: 'https://via.placeholder.com/150', price: 399.99, description: '商品描述 4' },
  { id: 5, image: 'https://via.placeholder.com/150', price: 499.99, description: '商品描述 5' },
  { id: 6, image: 'https://via.placeholder.com/150', price: 599.99, description: '商品描述 6' },
];

// 加载状态
const loading = ref(false);

// 搜索功能
const search = () => {
  // 模拟搜索逻辑
  products.value = mockProducts; // 这里可以替换为真实的 API 调用
};

// 滚动加载更多
const loadMore = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading.value) {
    loading.value = true;
    setTimeout(() => {
      // 模拟加载更多数据
      const newProducts = [
        { id: 7, image: 'https://via.placeholder.com/150', price: 699.99, description: '商品描述 7' },
        { id: 8, image: 'https://via.placeholder.com/150', price: 799.99, description: '商品描述 8' },
      ];
      products.value = [...products.value, ...newProducts];
      loading.value = false;
    }, 1000); // 模拟延迟
  }
};

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', loadMore);
});

// 移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', loadMore);
});
</script>

<style scoped>
.shopping-container {
  padding: 1rem;
}

/* 门店地址样式 */
.store-address {
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}

.store-address i {
  margin-right: 0.5rem;
  color: #4a90e2;
}

/* 搜索框样式 */
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem;
  width: 80%; /* 增加搜索框宽度 */
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #357abd;
}

/* 设置滚动条透明 */
.product-list::-webkit-scrollbar {
  width: 0px; /* 设置滚动条宽度 */
}
/* 商品列表样式 */
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  height: calc(80vh - 120px); /* 设置固定高度，确保内容可以滚动 */
  overflow-y: auto; /* 允许垂直滚动 */
}

.product-item {
  width: calc(50% - 0.5rem); /* 两列布局 */
  box-sizing: border-box;
}

.product-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.product-info {
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 1rem;
  color: #666;
}

/* 加载更多样式 */
.loading {
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  color: #666;
}
</style>