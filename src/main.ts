import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/main.css';

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount('#app');