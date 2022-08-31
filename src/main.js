import { createApp } from 'vue'
import App from './App.vue'
import Store from "@/store";
import Router from "@/route"

createApp(App)
    .use(Store)
    .use(Router)
    .mount('#app')
