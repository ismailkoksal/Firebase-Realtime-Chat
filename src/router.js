import Vue from "vue";
import Router from "vue-router";
import Chat from "./views/Chat";
import Login from "./components/Login";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.username) {
          next();
        } else {
          next({ name: "login" });
        }
      }
    }
  ]
});
