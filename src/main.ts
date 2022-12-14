import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import './index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = '/api'

createApp(App).use(VueAxios, axios).use(BootstrapIconsPlugin).use(store).use(router).mount('#app')
