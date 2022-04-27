import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import Router from "./router";
import { store } from "./store";
import { i18n } from "./i18n";
import "material-icons/iconfont/outlined.css";

createApp(App).use(Router).use(ElementPlus).use(store).use(i18n).mount("#app");
