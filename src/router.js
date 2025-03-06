// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from './components/UserRegister.vue';
import ChatRoom from './components/ChatRoom.vue';

const routes = [
    { path: '/userRegister', component: UserRegister }, // 注册页面
    { path: '/', component: ChatRoom }, // 注册页面
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;