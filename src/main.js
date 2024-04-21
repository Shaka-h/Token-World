import "@/assets/style.css";
import '@/assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import mixins from "@/services/mixins.js";
import vuetify from './plugins/vuetify'



const app = createApp(App)

app.use(createPinia())
app.use(router)
.use(vuetify)
.mixin(mixins)


app.mount('#app')
