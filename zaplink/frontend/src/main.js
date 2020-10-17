import Vue from 'vue'
import App from './App.vue'
import router from './router'

//É uma versão do BULMA para vue js
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

//Importação do axios
window.axios = require('axios');
//configuração da url padrão da API que vai ser consumido pelo VUE.js
window.axios.defaults.baseURL = 'http://localhost:3000';

//Intercepta todas as requisições e passamos a chave do token automaticamente o token
window.axios.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('user_token');

  if(userToken)
    config.headers.authorization = userToken;

  return config;
}, (erro) => Promise.reject(erro));

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
