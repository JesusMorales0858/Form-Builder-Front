import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import axios from "axios";
import VueAxios from "vue-axios";
import BootstrapIconsPlugin from 'bootstrap-icons-vue';
import storage from './storage'

axios.defaults.baseURL = 'http://localhost:5045';

var token = localStorage.getItem('token');
if(token)
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

import BootstrapVue from 'bootstrap-vue'
createApp(App).use(VueAxios, axios).use(store).use(router).use(BootstrapIconsPlugin).use(storage).mount('#app');
//Vue.use(BToast);