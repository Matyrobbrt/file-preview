import { createApp } from 'vue'
import App from './App.vue'
import Vue3Toastify from "vue3-toastify"

import './assets/main.css'
import 'vue3-toastify/dist/index.css'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

createApp(App)
    .use(Vue3Toastify)
    .mount('#app')
