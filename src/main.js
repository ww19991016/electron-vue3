import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";
import "element-plus/theme-chalk/base.css";
import "element-plus/dist/index.css"; // 或者引入完整 CSS
// createApp(App).mount('#app')

const app = createApp(App);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.use(router);
app.mount("#app");
