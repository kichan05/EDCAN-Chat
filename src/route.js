import { createWebHistory, createRouter } from "vue-router";
import WelcomePage from "@/page/WelcomePage"
import ChatPage from "@/page/ChatPage"

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;