<template>
  <div class="cart-container">
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
        <div class="quantity-control">
          <button class="quantity-button" @click="decreaseQuantity(product)">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity">{{ getCartItemQuantity(product.id) }}</span>
          <button class="quantity-button-add" @click="increaseQuantity(product)">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>

  </div>

  <!-- 提交订单栏（固定在 cart-container 底部） -->
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
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: '商品 2',
    price: 199.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: '商品 3',
    price: 299.99,
    image: 'https://via.placeholder.com/150',
  },
  // 更多商品...
]);

// 购物车商品
const cartItems = ref([]);

// 获取购物车中某个商品的数量
const getCartItemQuantity = (productId) => {
  const item = cartItems.value.find(item => item.product.id === productId);
  return item ? item.quantity : 0;
};

// 增加商品数量
const increaseQuantity = (product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
};

// 减少商品数量
const decreaseQuantity = (product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      // 如果数量为 1，直接移除商品
      removeFromCart(product.id);
    }
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
/* 设置滚动条透明 */
.cart-container::-webkit-scrollbar {
  width: 0px; /* 设置滚动条宽度 */
}

.cart-container::-webkit-scrollbar-track {
  background: transparent; /* 设置滚动条轨道背景为透明 */
}

.cart-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3); /* 设置滚动条滑块颜色为半透明 */
  border-radius: 4px; /* 设置滚动条滑块的圆角 */
}

.cart-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5); /* 设置鼠标悬停时滚动条滑块的颜色 */
}
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #ffffff;
  height: calc(80vh - 120px); /* 设置固定高度，确保内容可以滚动 */
  overflow-y: auto; /* 允许垂直滚动 */
  position: relative;
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

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-button {
  padding: 0.5rem;
  background: #ff6b6b;
  border: none;
  border-radius: 0.3rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.quantity-button-add {
  padding: 0.5rem;
  background: #4a90e2;
  border: none;
  border-radius: 0.3rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-button-add:hover {
  background: rgba(255, 255, 255, 0.2);
}

.quantity {
  font-size: 1rem;
  font-weight: bold;
}

/* 提交订单栏样式 */
.checkout-section {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
  z-index: 1000;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
}

.checkout-button {
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

.checkout-button:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>