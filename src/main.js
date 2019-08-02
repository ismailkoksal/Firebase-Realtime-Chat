import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "./plugins/vuetify";
import "./plugins/firebase";
import "./plugins/vuefire";
import "./plugins/vue-chat-scroll";

Vue.config.productionTip = false;
moment.locale(navigator.language);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
