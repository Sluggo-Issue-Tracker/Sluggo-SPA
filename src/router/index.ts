import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Tickets from "@/views/Tickets.vue";
import Help from "@/views/Help.vue";
import Auth from "@/views/Auth.vue";
import NewTeam from "@/views/NewTeam.vue";
import Error from "@/views/Error";
import UserProvidedNavbar from "@/views/SluggoNavbar";
import UserProvidedRouter from "@/components/UserProvidedRouter.vue";
import TeamsTickets from "@/views/TeamsTickets";
import TeamsMembers from "@/views/TeamsMembers";
import TeamsAdmin from "@/views/TeamsAdmin";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Navbar",
    component: UserProvidedNavbar,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "teams/:id/tickets",
        name: "TeamsTickets",
        component: TeamsTickets
      },
      {
        path: "teams/:id/members",
        name: "TeamsMembers",
        component: TeamsMembers
      },
      {
        path: "teams/:id/admin",
        name: "TeamsAdmin",
        component: TeamsAdmin
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    component: UserProvidedRouter,
    children: []
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
  },
  {
    path: "/error",
    name: "Error",
    component: Error
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
