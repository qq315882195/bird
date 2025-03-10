
<template>
  <div class="store-detail-container">
    <h2 class="store-detail-title">{{ mode === 'add' ? '添加门店' : '门店详情' }}</h2>

    <!-- 返回按钮 -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> 返回
    </button>
    <!-- 保存按钮 -->
    <button v-if="mode === 'add' || mode === 'edit'" class="save-button" @click="saveStore">
      <i class="fas fa-save"></i> 保存
    </button>
    <!-- 门店详情信息 -->
    <div class="store-info">
      <div class="info-group">
        <input  v-model="store.id" style="display: none"/>
        <label>门店编号</label>
        <input v-if="mode === 'add'" type="text" v-model="store.code" placeholder="请输入门店编号" />
        <span v-else>{{ store.code }}</span>
      </div>
      <div class="info-group">
        <label>门店名称</label>
        <span v-if="mode === 'view'">{{ store.name }}</span>
        <input v-else type="text" v-model="store.name" placeholder="请输入门店名称" />

      </div>
      <div class="info-group">
        <label>地址</label>
        <span v-if="mode === 'view'">{{ store.address }}</span>
        <input v-else type="text" v-model="store.address" placeholder="请输入地址" />

      </div>
      <div class="info-group">
        <label>经度</label>
        <span v-if="mode === 'view'">{{ store.longitude }}</span>
        <input v-else type="text"  v-model="store.longitude"/>

      </div>
      <div class="info-group">
        <label>纬度</label>
        <span v-if="mode === 'add'">{{ store.latitude }}</span>
        <input v-else type="text"  v-model="store.latitude"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import Swal from "sweetalert2";

const store = ref({
  code: '',
  name: '',
  address: '',
  longitude: '',
  latitude: ''
});
const mode = ref('view'); // 默认是查看模式
const switchMenu = inject('switchMenu');
const commonParams = inject('commonParams');
// 获取门店详情
const fetchStoreDetail = async () => {
  if (mode.value === 'view' || mode.value === 'edit') {
    try {
      const response = await axios.post('http://localhost:8084/store/getStore', {
        id: commonParams.value.selectedStoreId,
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
  }
};

// 保存门店信息
const saveStore = async () => {
  try {
    const url = mode.value === 'add' ? 'http://localhost:8084/store/addStore' : 'http://localhost:8084/store/updateStore';
    const response = await axios.post(url, store.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.code === '0000') {
      Swal.fire({
        icon: 'success',
        title: '保存成功',
        showConfirmButton: false,
        timer: 1500
      });
      goBack();
    } else {
      console.error('保存失败:', response.data.message);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
};

// 返回门店列表
const goBack = () => {
  switchMenu('stores'); // 返回到门店列表页面
};

// 组件挂载时根据模式初始化
onMounted(() => {
  mode.value = commonParams.value.mode || 'view';
  if (mode.value === 'edit' || mode.value === 'view') {
    fetchStoreDetail();
  }
});
</script>

<style scoped>
/* 保存按钮样式 */
.save-button {
  padding: 0.5rem 1rem;
  background: #28a745;
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.save-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.save-button:active {
  transform: translateY(0);
}
.store-detail-container {
  padding: 2rem;
  color: #ffffff;
  height: 100vh;
  overflow-y: auto;
}
.store-detail-container::-webkit-scrollbar {
  width: 0px; /* 设置滚动条宽度 */
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
  border-radius: 0.5rem;
}
input{
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease, background 0.3s ease;
}
</style>