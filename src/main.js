import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'


import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives
  })

axios.defaults.baseURL = document.querySelector('meta[name="base_url"]').content||'https://boti.education/p/demo/cantineapi/';

const app = createApp(App)

app.provide('$alias',document.querySelector('meta[name="alias"]').content||'p/demo');

app.component('VueDatePicker', VueDatePicker);


  
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
