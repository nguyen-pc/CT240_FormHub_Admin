import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import router
import { createPinia } from "pinia";
import { authentication } from "./plugins/authetication";

const app = createApp(App);
app.use(createPinia());
authentication.install().then(() => {
  app.use(router);
  app.mount("#app");
});
