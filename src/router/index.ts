import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home";
import Error from "@/views/Error";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  { path: "/error/", name: "Error", component: Error }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
