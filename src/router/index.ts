import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Welcome from "../views/Welcome.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/calculate-insurance",
    name: "CalculateInsurance",
    component: () => import("../views/CalculateInsurance.vue"),
  },
  {
    path: "/summery",
    name: "Summery",
    component: () => import("../views/Summery.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
