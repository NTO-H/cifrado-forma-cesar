import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import PrimeVue from "primevue/config";
// Agregar el ícono de copiar a la librería
library.add(faCopy);

// Crear la app de Vue
const app = createApp(App);

// Registrar el componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

// Montar la app
app.mount('#app');

app.use(PrimeVue, {
    unstyled: true
});