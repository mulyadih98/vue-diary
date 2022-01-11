import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './index.css';
import store from './store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
createApp(App)
  .use(VueToast,{
    position: 'bottom-left'
  })
  .use(router)
  .use(store)
  .mount('#app')
