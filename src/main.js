import "@/assets/style.css";
import '@/assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import mixins from "@/services/mixins.js";


const app = createApp(App)

app.use(createPinia())
app.use(router)
.mixin(mixins)


app.mount('#app')
