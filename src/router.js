// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from './components/UserRegister.vue';
import ChatRoom from './components/ChatRoom.vue';
import ChatLogin from "@/components/ChatLogin.vue";

const routes = [
    { path: '/userRegister', component: UserRegister }, // 注册页面
    { path: '/chatRoom', component: ChatRoom }, // 聊天页面
    { path: '/', component: ChatLogin }, // 登录页面
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;