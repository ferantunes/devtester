import Vue from 'vue'
import App from './App.vue'
import router from './router'

//É uma versão do BULMA para vue js
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
