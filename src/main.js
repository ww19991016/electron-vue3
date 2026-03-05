import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";

// createApp(App).mount('#app')

const app = createApp(App);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.use(router);
app.mount("#app");
