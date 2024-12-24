import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = document.querySelector('meta[name="base_url"]').content||'https://boti.education/p/demo/cantineapi/';

const app = createApp(App)

app.provide('$alias',document.querySelector('meta[name="alias"]').content||'p/demo');

app.use(createPinia())
app.use(router)

app.mount('#app')
