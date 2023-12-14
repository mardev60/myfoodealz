import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';

const authState = reactive({
  isLoggedIn: false,
});

const app = createApp(App);

app.provide('authState', authState);
app.use(router).mount('#app');