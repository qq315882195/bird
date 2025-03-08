<template>
  <div class="product-detail-container">
    <!-- 商品图片轮播 -->
    <div class="image-carousel">
      <button class="carousel-button prev" @click="scrollImages(-1)">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="image-wrapper">
        <img
            v-for="(image, index) in product.images"
            :key="index"
            :src="image"
            alt="商品图片"
            class="product-image"
            :class="{ active: currentImageIndex === index }"
        />
      </div>
      <button class="carousel-button next" @click="scrollImages(1)">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- 商品信息 -->
    <div class="product-info">
      <h1 class="product-name">{{ product.name }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">￥{{ product.price }}</div>

    </div>
    <button class="add-to-cart-button" @click="addToCart(product)">
      <i class="fas fa-cart-plus"></i> 加入购物车
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 商品信息
const product = ref({
  id: 1,
  name: '商品 1',
  price: 99.99,
  description: '这是一个非常棒的商品，适合各种场景使用。',
  images: [
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
  ],
});

// 当前显示的图片索引
const currentImageIndex = ref(0);

// 滚动图片
const scrollImages = (direction) => {
  const totalImages = product.value.images.length;
  currentImageIndex.value = (currentImageIndex.value + direction + totalImages) % totalImages;
};

// 添加到购物车
const addToCart = (product) => {
  console.log('添加到购物车:', product);
  alert('商品已添加到购物车！');
};
</script>

<style scoped>
.product-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #ffffff;
}

/* 图片轮播 */
.image-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.image-wrapper {
  display: flex;
  overflow: hidden;
  width: 100%;
  border-radius: 0.5rem;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  transition: transform 0.5s ease;
  display: none;
}

.product-image.active {
  display: block;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.carousel-button.prev {
  left: 1rem;
}

.carousel-button.next {
  right: 1rem;
}

/* 商品信息 */
.product-info {
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.product-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.product-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

/* 加入购物车按钮 */
.add-to-cart-button {
  padding: 0.8rem 1.5rem;
  background: #4a90e2;
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-to-cart-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.add-to-cart-button i {
  font-size: 1.2rem;
}
</style>