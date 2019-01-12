import Vue from "vue";
import router from "@routes/index";
import App from "@views/home/index.vue";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
