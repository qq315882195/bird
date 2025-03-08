// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from './components/UserRegister.vue';
import ChatRoom from './components/ChatRoom.vue';
import ChatLogin from "@/components/ChatLogin.vue";
import MainPage from "@/components/MainPage.vue";
import ShoppingService from "@/components/ShoppingService.vue";
import ProfileService from "@/components/ProfileService.vue";
import OrderList from "@/components/OrderList.vue";
import MyCart from "@/components/MyCart.vue";
import CategoryService from "@/components/CategoryService.vue";

const routes = [
    { path: '/userRegister', component: UserRegister }, // 注册页面
    { path: '/mainPage', component: MainPage }, // 注册页面
    { path: '/chatRoom', component: ChatRoom }, // 聊天页面
    { path: '/', component: ChatLogin }, // 登录页面
    { path: '/orderList', component: OrderList }, // 订单页面
    { path: '/cart', component: MyCart }, // 购物车页面
    { path: '/categoryService', component: CategoryService }, // 分类页面
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