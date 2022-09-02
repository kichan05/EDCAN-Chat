import { createWebHistory, createRouter } from "vue-router";
import WelcomePage from "@/page/WelcomePage"
import ChatPage from "@/page/ChatPage"

const routes = [
    {
        name: "Welcome",
        path: "/",
        component: WelcomePage,
    },
    {
        name: "Chat",
        path: "/chat",
        component: ChatPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;