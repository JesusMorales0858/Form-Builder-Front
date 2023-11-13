// auth.js

import axios from 'axios';
import store from '@/storage/index';

async function refreshAccessToken() {
  try {
    // Obtén las credenciales del usuario (si las necesitas)
    const usuario = store.state.usuario;
    //const clave = store.state.token;
    const clave = '123456';

    var payload = {
        username: usuario,
        password: clave
      };

    // Envía una solicitud al servidor para obtener un nuevo token de acceso
    const response = await axios.post('/api/Autenticacion/validar', payload);
    // Actualiza el nuevo token en el almacenamiento local
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    console.log("token refrescado");
    return newToken;
  } catch (error) {
    console.log(payload)
    console.error('Error al intentar refrescar el token:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}

export { refreshAccessToken };
