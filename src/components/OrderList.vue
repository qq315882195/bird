<template>
  <div class="page-title">
    <h2>我的订单</h2>
  </div>
  <div class="order-container">
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <div class="order-header">
          <span class="order-id">订单号: {{ order.id }}</span>
          <span class="order-status" :class="getStatusClass(order.status)">
            {{ order.status }}
          </span>
        </div>
        <div class="order-details">
          <div class="order-product">
            <img :src="order.product.image" alt="商品图片" class="product-image" />
            <div class="product-info">
              <span class="product-name">{{ order.product.name }}</span>
              <span class="product-price">￥{{ order.product.price }}</span>
            </div>
          </div>
          <div class="order-actions">
            <button class="action-button" @click="viewOrderDetails(order.id)">
              <i class="fas fa-eye"></i> 查看详情
            </button>
            <button class="action-button" @click="cancelOrder(order.id)" v-if="order.status === '待发货'">
              <i class="fas fa-times"></i> 取消订单
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟订单数据
const orders = ref([
  {
    id: '123456',
    status: '待发货',
    product: {
      name: '商品名称 1',
      price: 99.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '789012',
    status: '已发货',
    product: {
      name: '商品名称 2',
      price: 199.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  },
  {
    id: '345678',
    status: '已完成',
    product: {
      name: '商品名称 3',
      price: 299.99,
      image: '../assets/img.png'
    }
  }
]);

// 根据订单状态获取样式类
const getStatusClass = (status) => {
  switch (status) {
    case '待发货':
      return 'status-pending';
    case '已发货':
      return 'status-shipped';
    case '已完成':
      return 'status-completed';
    default:
      return '';
  }
};

// 查看订单详情
const viewOrderDetails = (orderId) => {
  console.log('查看订单详情:', orderId);
  // 这里可以添加跳转到订单详情页面的逻辑
};

// 取消订单
const cancelOrder = (orderId) => {
  console.log('取消订单:', orderId);
  // 这里可以添加取消订单的逻辑
};
</script>

<style scoped>
.order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #ffffff;
  overflow-y: auto;
  height: calc(80vh - 120px);
}
.order-container::-webkit-scrollbar {
  width: 0px; /* 设置滚动条宽度 */
}
.page-title h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.order-list {
  width: 100%;
  max-width: 800px;
}

.order-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: background 0.3s ease;
}

.order-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.order-id {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.order-status {
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
}

.status-pending {
  background: #ffcc00;
  color: #000000;
}

.status-shipped {
  background: #4a90e2;
  color: #ffffff;
}

.status-completed {
  background: #00cc66;
  color: #ffffff;
}

.order-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-product {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
}

.product-info {
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

.order-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.3rem;
  color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-button i {
  font-size: 1rem;
}
</style>