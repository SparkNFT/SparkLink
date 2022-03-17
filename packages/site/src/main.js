import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
import ElementPlus from "element-plus";
import Router from "./router";

createApp(App).use(Router).use(ElementPlus).mount("#app");
