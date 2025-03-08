<template>
  <div class="order-list-container">
    <h2 class="order-list-title">订单管理</h2>
    <!-- 筛选条件区域 -->
    <div class="filter-section">
      <div class="filter-group">
        <label for="orderId">订单号</label>
        <input
            type="text"
            id="orderId"
            v-model="filters.orderId"
            placeholder="输入订单号"
        />
      </div>
      <div class="filter-group">
        <label for="status">状态</label>
        <select id="status" v-model="filters.status">
          <option value="">全部</option>
          <option value="已发货">已发货</option>
          <option value="待发货">待发货</option>
          <option value="已完成">已完成</option>
          <option value="已取消">已取消</option>
        </select>
      </div>
      <div class="filter-group">
        <label for="date">日期</label>
        <input
            type="date"
            id="date"
            v-model="filters.date"
        />
      </div>
      <button class="filter-button" @click="applyFilters">
        <i class="fas fa-search"></i> 查询
      </button>
    </div>

    <!-- 订单表格 -->
    <div class="order-table">
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>订单号</th>
          <th>状态</th>
          <th>总价</th>
          <th>日期</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order,index) in paginatedOrders" :key="order.id">
          <td>{{ index+1 }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.status }}</td>
          <td>￥{{ order.total }}</td>
          <td>{{ order.date }}</td>
          <td>
            <button class="action-button view" @click="viewOrder(order)">
              <i class="fas fa-eye"></i> 查看
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页控件 -->
    <div class="pagination">
      <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">
        <i class="fas fa-chevron-left"></i> 上一页
      </button>
      <span class="pagination-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">
        下一页 <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,inject,provide } from 'vue';

// 订单列表数据
const orders = ref([
  {
    id: 1,
    status: '已发货',
    total: 99.99,
    date: '2023-10-01',
  },
  {
    id: 2,
    status: '待发货',
    total: 199.99,
    date: '2023-10-02',
  },
  {
    id: 3,
    status: '已完成',
    total: 299.99,
    date: '2023-10-03',
  },
  {
    id: 4,
    status: '已取消',
    total: 399.99,
    date: '2023-10-04',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  },
  {
    id: 5,
    status: '已发货',
    total: 499.99,
    date: '2023-10-05',
  }
  // 更多订单数据...
]);

// 筛选条件
const filters = ref({
  orderId: '',
  status: '',
  date: '',
});

// 分页相关状态
const currentPage = ref(1);
const pageSize = ref(20); // 每页显示的订单数量

// 应用筛选条件
const applyFilters = () => {
  currentPage.value = 1; // 重置到第一页
};

// 根据筛选条件过滤订单
const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesOrderId = filters.value.orderId
        ? order.id.toString().includes(filters.value.orderId)
        : true;
    const matchesStatus = filters.value.status
        ? order.status === filters.value.status
        : true;
    const matchesDate = filters.value.date
        ? order.date === filters.value.date
        : true;
    return matchesOrderId && matchesStatus && matchesDate;
  });
});

// 分页后的订单列表
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredOrders.value.slice(start, end);
});

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / pageSize.value);
});

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 查看订单详情
const switchMenu = inject('switchMenu');
const viewOrder = () => {
  if (switchMenu) {
    switchMenu('mechantOrderDetail'); // 切换到订单列表 Tab
  }
};
// 将 switchMenu 方法提供给子组件使用
provide('switchMenu', switchMenu);
</script>

<style scoped>
.order-list-container {
  padding: 2rem;
  color: #ffffff;
  height: 100vh;
  overflow-y: auto;
}
.order-list-container::-webkit-scrollbar {
  width: 0px; /* 设置滚动条宽度 */
}
.order-list-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
}

/* 筛选条件区域 */
.filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}
#date, #status {
  cursor: pointer;
}
input,
select {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.3s ease, background 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4a90e2;
  background: rgba(255, 255, 255, 0.2);
}

.filter-button {
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
}

.filter-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.filter-button:active {
  transform: translateY(0);
}

/* 订单表格 */
.order-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
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

.action-button.view {
  background: #4a90e2;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.action-button:active {
  transform: translateY(0);
}

/* 分页控件 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
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
}

.pagination-button:disabled {
  background: rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.pagination-info {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}
</style>