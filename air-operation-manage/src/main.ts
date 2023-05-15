import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
import "./style/index.scss";
import { isPermission } from "@/utils/permission";
//全局权限方法
app.config.globalProperties.$isPermission = isPermission;
app.mount("#app");
import { getAuthInfor } from "@/request/auth";
getAuthInfor();
