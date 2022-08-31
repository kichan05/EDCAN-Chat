import { createWebHistory, createRouter } from "vue-router";
import WelcomePage from "@/page/WelcomePage"
import ChatPage from "@/page/ChatPage"

const routes = [
    {
        path: "/",
        component: WelcomePage,
    },
    {
        path: "/chat",
        component: ChatPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;