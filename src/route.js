import { createWebHistory, createRouter } from "vue-router";
import WelcomePage from "@/page/WelcomePage"
import ChatPage from "@/page/ChatPage"
import AdminLoginPage from "@/page/AdminLoginPage";

const routes = [
    {
        name: "welcome",
        path: "/",
        component: WelcomePage,
        props: true
    },
    {
        name: "chat",
        path: "/chat",
        component: ChatPage,
        props: true
    },
    {
        name: "admin login",
        path: "/adminLogin",
        component: AdminLoginPage,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;