import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'



loadFonts()
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
