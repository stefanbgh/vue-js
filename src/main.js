import "primeicons/primeicons.css";
import "@/styles/main.css";
import "vue3-toastify/dist/index.css";

import { createApp } from "vue";
import { registerPlugins } from "./plugins";

import App from "./App.vue";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
