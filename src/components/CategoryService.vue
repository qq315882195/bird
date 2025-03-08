<template>
  <!-- 顶部标题 -->
  <div>
    <h1>春至有机田，菜蔬焕新颜~</h1>
  </div>
  <div class="organic-container">
    <!-- 商品分类 -->
    <div class="category-list">
      <div
          class="category-item"
          v-for="category in categories"
          :key="category"
          :class="{ active: activeCategory === category }"
          @click="setActiveCategory(category)"
      >
        {{ category }}
      </div>
    </div>

    <!-- 推荐商品 -->
    <div class="recommendation-section">
      <div class="recommendation-grid">
        <div class="recommendation-item" v-for="item in recommendations" :key="item.name" @click="goToProductDetail">
          <img :src="item.image" alt="商品图片" class="item-image" />
          <div class="item-details">
            <span class="item-name" :title="item.name">{{ item.name }}</span>
            <span class="item-price">{{ item.price }}</span>
            <button class="item-button" @click="addToCart(item)">
              <i class="fas fa-cart-plus"></i> 立即抢购
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, ref} from 'vue';

// 获取父组件提供的 changeTab 方法
const changeTab = inject('changeTab');

// 跳转到商品详情页面
const goToProductDetail = () => {
  if (changeTab) {
    changeTab('productDetail'); // 切换到订单列表 Tab
  }
};

// 商品分类
const categories = ref([
  '蔬菜豆制品', '肉禽蛋', '海鲜水产', '水果鲜花', '乳品烘焙', '冻品'
]);

// 推荐商品
const recommendations = ref([
  {
    name: '【春菜】去皮雷笋150g',
    price: '￥9.95',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【有机】生菜250g',
    price: '￥5.95',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【有机】生菜250g',
    price: '￥5.95',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【春菜】鲜蚕豆米约150g',
    price: '￥7.19',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【有机】白蘑菇230g',
    price: '￥11.9',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【有机】白蘑菇230g',
    price: '￥11.9',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【有机】白蘑菇230g',
    price: '￥11.9',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【有机】白蘑菇230g',
    price: '￥11.9',
    image: 'https://via.placeholder.com/150'
  },
  {
    name: '【有机】白蘑菇230g',
    price: '￥11.9',
    image: 'https://via.placeholder.com/150'
  }
]);

// 当前选中的分类
const activeCategory = ref("蔬菜豆制品");

// 设置选中的分类
const setActiveCategory = (category) => {
  activeCategory.value = category;
};

// 添加到购物车
const addToCart = (item) => {
  console.log('添加到购物车:', item);
};
</script>

<style scoped>
.organic-container::-webkit-scrollbar {
  width: 0px; /* 设置滚动条宽度 */
}
.organic-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  overflow-y: auto;
  height: calc(80vh - 120px);
  padding: 1rem;
}

.top-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.category-list {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 2rem;
}

.category-item {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: color 0.3s ease;
}

.category-item:hover {
  color: #4a90e2;
}

/* 高亮选中的分类 */
.category-item.active {
  color: #ffffff;
  font-weight: bold;
}

.recommendation-section {
  width: 100%;
  margin-bottom: 2rem;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.recommendation-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s ease;
}

.recommendation-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.item-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 商品名称样式 */
.item-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  max-width: 100%; /* 最大宽度为容器宽度 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

.item-price {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.item-button {
  padding: 0.5rem 1rem;
  background: #4a90e2;
  border: none;
  border-radius: 0.3rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>