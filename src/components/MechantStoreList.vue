<template>
  <div class="store-list-container">
    <h2 class="store-list-title">门店管理</h2>
    <!-- 筛选条件区域 -->
    <div class="filter-section">
      <div class="filter-group">
        <label for="code">门店编号</label>
        <input
            type="text"
            id="code"
            placeholder="输入门店编号"
        />
      </div>
      <div class="filter-group">
        <label for="name">门店名称</label>
        <input
            type="text"
            id="name"
            placeholder="输入门店名称"
        />
      </div>
      <button class="filter-button" @click="search">
        <i class="fas fa-search"></i> 查询
      </button>
    </div>

    <!-- 门店表格 -->
    <div class="store-table">
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>门店编号</th>
          <th>门店名称</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(store, index) in paginatedStores" :key="store.id">
          <td>{{ index + 1 }}</td>
          <td>{{ store.code }}</td>
          <td>{{ store.name }}</td>
          <td>{{ store.address }}</td>
          <td>
            <button class="action-button view" @click="viewStore(store.id)">
              <i class="fas fa-eye"></i> 查看
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页控件 -->
    <div class="pagination">
      <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1 ||currentPage === 0">
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
import {ref, inject} from 'vue';
import axios from "axios";


// 分页相关状态
const currentPage = ref(0);
const pageSize = ref(10); // 每页显示的门店数量
const totalPages =ref(0);
const paginatedStores=ref([]);
// 应用筛选条件
const search = async () => {
  //获取code的值
  const code = document.getElementById('code').value;
  //获取name的值
  const name = document.getElementById('name').value;
  try {
    const axiosResponse = await axios.post('http://localhost:8084/store/getStoreListByPage', {
      code: code,
      name: name,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(axiosResponse)
    if (axiosResponse.data.code ==="0000"){
      currentPage.value = axiosResponse.data.data.current;
      pageSize.value = axiosResponse.data.data.size;
      paginatedStores.value= axiosResponse.data.data.records;
      // 总页数
      totalPages.value=axiosResponse.data.data.pages;
      if (axiosResponse.data.data.total===0){
        currentPage.value=0;
      }
    }
  }catch (e) {
    console.log(e);
  }
};

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  search();
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  search();
};

// 查看门店详情
const viewStore = async (selectedStoreId) => {
  switchMenu('storeDetail', {  selectedStoreId }); // 传递门店ID
};

// 获取父组件提供的 changeTab 方法
const switchMenu = inject('switchMenu');
</script>

<style scoped>
.store-list-container {
  padding: 2rem;
  color: #ffffff;
  height: 100vh;
  overflow-y: auto;
}
.store-list-container::-webkit-scrollbar {
  width: 0px; /* 设置滚动条宽度 */
}
.store-list-title {
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

/* 门店表格 */
.store-table {
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