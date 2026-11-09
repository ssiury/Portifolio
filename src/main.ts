import { createApp } from 'vue'
import App from './App.vue'
import { vTune } from './directives/tune'
import './assets/styles/main.css'

createApp(App).directive('tune', vTune).mount('#app')
