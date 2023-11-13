import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import axios from "axios";
import VueAxios from "vue-axios";
import BootstrapIconsPlugin from 'bootstrap-icons-vue';
import storage from './storage';
import { refreshAccessToken } from './storage/auth';

//axios.defaults.baseURL = 'http://apiexcelencia.somee.com';
axios.defaults.baseURL = 'http://localhost:5045';

var token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
/*axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Intenta refrescar el token y vuelve a intentar la solicitud
      await refreshAccessToken();
      // Actualiza el token en el encabezado de autorización
      const newToken = localStorage.getItem('token');
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      }
      // Vuelve a intentar la solicitud después de refrescar el token
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);*/
import BootstrapVue from 'bootstrap-vue'

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.use(BootstrapIconsPlugin);
app.use(storage);

app.mount('#app');
