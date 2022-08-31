import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld"

const routes = [
    {
        path: "/",
        component: HelloWorld,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;