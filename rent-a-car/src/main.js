import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueAxios from "vue-axios";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

axios.defaults.withCredentials = true;
createApp(App).use(router).use(VueAxios, axios).mount("#app");
