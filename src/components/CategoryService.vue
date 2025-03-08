<template>
  <div class="organic-container">
    <!-- 顶部标题 -->
    <div class="top-title">
      春至有机田，菜蔬焕新颜~
    </div>

    <!-- 商品分类 -->
    <div class="category-list">
      <div class="category-item" v-for="category in categories" :key="category">
        {{ category }}
      </div>
    </div>

    <!-- 推荐商品 -->
    <div class="recommendation-section">
      <div class="recommendation-grid">
        <div class="recommendation-item" v-for="item in recommendations" :key="item.name">
          <img :src="item.image" alt="商品图片" class="item-image" />
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
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
import { ref } from 'vue';

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
  padding: 2rem;
  color: #ffffff;

  overflow-y: auto;
  height: calc(80vh - 120px);
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

.recommendation-section {
  width: 100%;
  margin-bottom: 2rem;
}

.recommendation-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
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
}

.item-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
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

.discount-section {
  width: 100%;
  margin-bottom: 2rem;
}

.discount-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.discount-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.discount-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s ease;
}

.discount-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.discount-image {
  width: 100px;
  height: 100px;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.discount-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.discount-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.discount-price {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.discount-button {
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

.discount-button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>