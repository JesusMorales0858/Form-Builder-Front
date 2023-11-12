import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import axios from "axios";
import VueAxios from "vue-axios";
import BootstrapIconsPlugin from 'bootstrap-icons-vue';
import storage from './storage'

axios.defaults.baseURL = 'http://apiexcelencia.somee.com';

var token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

import BootstrapVue from 'bootstrap-vue'

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.use(BootstrapIconsPlugin);
app.use(storage);

app.mount('#app');
