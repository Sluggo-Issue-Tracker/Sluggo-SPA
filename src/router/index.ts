import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Tickets from "@/views/Tickets.vue";
import Users from "@/views/Users.vue";
import Admin from "@/views/Admin.vue";
import Help from "@/views/Help.vue";
import Auth from "@/views/Auth.vue";
import Profile from "@/views/Profile.vue";
import NewTeam from "@/views/NewTeam.vue";
import SluggoNavbar from "@/views/SluggoNavbar";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/teams/:teamId",
    name: "Team",
    component: SluggoNavbar,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "tickets/:selected?",
        name: "Tickets",
        component: Tickets,
        props: true
      },
      {
        path: "users",
        name: "Users",
        component: Users,
        props: true
      },
      {
        path: "users/:userId",
        name: "Profile",
        component: Profile
      },
      {
        path: "admin",
        name: "Admin",
        component: Admin,
        props: true
      },
      {
        path: "",
        name: "Home",
        component: Home
      },
    ]
  },
  {
    path: "/help",
    name: "Help",
    component: Help
  },
  {
    path: "/login",
    name: "Auth",
    component: Auth
  },
  {
    path: "/new_team/",
    name: "NewTeam",
    component: NewTeam
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;