export default [
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { title: "Dashboard" },
    component: () => import("./DashboardView.vue"),
  },
];
