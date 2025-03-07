// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from './components/UserRegister.vue';
import ChatRoom from './components/ChatRoom.vue';
import ChatLogin from "@/components/ChatLogin.vue";
import MainPage from "@/components/MainPage.vue";
import CustomerService from "@/components/CustomerService.vue";
import ShoppingService from "@/components/ShoppingService.vue";
import ProfileService from "@/components/ProfileService.vue";

const routes = [
    { path: '/userRegister', component: UserRegister }, // 注册页面
    { path: '/mainPage', component: MainPage }, // 注册页面
    { path: '/chatRoom', component: ChatRoom }, // 聊天页面
    { path: '/', component: ChatLogin }, // 登录页面

    {
        path: '/customerService',
        name: 'customerService',
        component: CustomerService,
    },
    {
        path: '/shoppingService',
        name: 'shoppingService',
        component: ShoppingService,
    },
    {
        path: '/profileService',
        name: 'profileService',
        component: ProfileService,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;