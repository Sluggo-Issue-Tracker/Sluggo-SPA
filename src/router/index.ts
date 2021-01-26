import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Tickets from "@/views/Tickets.vue";
import Users from "@/views/Users.vue";
import Admin from "@/views/Admin.vue";
import Help from "@/views/Help.vue";
import Auth from "@/views/Auth.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/help",
    name: "Help",
    component: Help
  },
  {
    path: "/auth_control",
    name: "Auth",
    component: Auth
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
