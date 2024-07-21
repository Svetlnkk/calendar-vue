import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import usePlugins from "./plugins/index";
import useComponents from "./components/index";

import "./styles/style.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

usePlugins(app);
useComponents(app);

router.isReady().then(() => {
  app.mount("#app");
});
