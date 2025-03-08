<template>
    <!-- 页面标题 -->

    <!-- 商品列表 -->
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-info">
          <img :src="product.image" alt="商品图片" class="product-image" />
          <div class="product-details">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">￥{{ product.price }}</span>
          </div>
        </div>
        <button class="add-to-cart-button" @click="addToCart(product)">
          <i class="fas fa-cart-plus"></i> 添加
        </button>
      </div>
    </div>

    <!-- 购物车列表 -->
    <div class="cart-list">
      <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
        <div class="cart-product-info">
          <img :src="item.product.image" alt="商品图片" class="cart-product-image" />
          <div class="cart-product-details">
            <span class="cart-product-name">{{ item.product.name }}</span>
            <span class="cart-product-price">￥{{ item.product.price }}</span>
            <span class="cart-product-quantity">x{{ item.quantity }}</span>
          </div>
        </div>
        <button class="remove-from-cart-button" @click="removeFromCart(item.product.id)">
          <i class="fas fa-trash"></i> 移除
        </button>
      </div>
    </div>

    <!-- 提交订单 -->
    <div class="checkout-section">
      <div class="total-price">
        总价: ￥{{ totalPrice }}
      </div>
      <button class="checkout-button" @click="submitOrder">
        <i class="fas fa-check"></i> 提交订单
      </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 商品列表
const products = ref([
  {
    id: 1,
    name: '商品 1',
    price: 99.99,
    image: '../assets/img.png',
  },
  {
    id: 2,
    name: '商品 2',
    price: 199.99,
    image: '../assets/img.png',
  },
  {
    id: 3,
    name: '商品 3',
    price: 299.99,
    image: '../assets/img.png',
  },
]);

// 购物车商品
const cartItems = ref([]);

// 添加商品到购物车
const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
};

// 从购物车移除商品
const removeFromCart = (productId) => {
  const index = cartItems.value.findIndex(item => item.product.id === productId);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
};

// 计算总价
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
});

// 提交订单
const submitOrder = () => {
  if (cartItems.value.length === 0) {
    alert('购物车为空，请先添加商品！');
    return;
  }
  console.log('提交订单:', cartItems.value);
  // 这里可以添加提交订单的逻辑
  cartItems.value = []; // 清空购物车
  alert('订单提交成功！');
};
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #ffffff;
}

.page-title h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.product-list {
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: background 0.3s ease;
}

.product-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
}

.product-details {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.product-price {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.add-to-cart-button {
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

.add-to-cart-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cart-list {
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: background 0.3s ease;
}

.cart-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cart-product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-product-image {
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
}

.cart-product-details {
  display: flex;
  flex-direction: column;
}

.cart-product-name {
  font-size: 1.1rem;
  font-weight: bold;
}

.cart-product-price {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.cart-product-quantity {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.remove-from-cart-button {
  padding: 0.5rem 1rem;
  background: #ff6b6b;
  border: none;
  border-radius: 0.3rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-from-cart-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.checkout-section {
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
}

.checkout-button {
  padding: 0.5rem 1rem;
  background: #00cc66;
  border: none;
  border-radius: 0.3rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkout-button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>