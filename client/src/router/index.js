import { createRouter, createWebHistory } from "vue-router";
import MainVue from "../pages/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainVue,
    },
  ],
});

export default router;
