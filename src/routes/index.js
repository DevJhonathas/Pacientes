import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/homePage.vue";
import NotFound from "@/views/notFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
