import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@kor-ui/kor';
import '@kor-ui/kor/kor-styles.css';
import '@/assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
