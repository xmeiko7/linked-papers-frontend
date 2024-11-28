// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import SearchResult from '../views/SearchResult.vue';
import PaperDetail from '../views/PaperDetail.vue';
import HomePage from "@/views/HomePage.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,  // 首页，展示所有论文
    },
    {
        path: '/search',
        name: 'SearchResult',
        component: SearchResult,  // 搜索结果页，展示搜索后的论文
        props: route => ({ query: route.query.query }),  // 从路由中传递查询参数
    },
    {
        path: '/paper/:id',
        name: 'PaperDetail',
        component: PaperDetail,  // 论文详情页，展示具体论文信息
        props: true,  // 将路径参数传递给组件
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
