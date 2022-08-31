import { createWebHistory, createRouter } from "vue-router";
import WelcomePage from "@/page/WelcomePage"

const routes = [
    {
        path: "/",
        component: WelcomePage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;