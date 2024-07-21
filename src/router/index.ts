import { createRouter, createWebHistory } from "vue-router";
import dashboardRoutes from "@/modules/dashboard/dashboard.routes";
import calendarRoutes from "@/modules/calendar/calendar.routes";

const routes = [
  ...dashboardRoutes,
  ...calendarRoutes,
  {
    path: "/",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
