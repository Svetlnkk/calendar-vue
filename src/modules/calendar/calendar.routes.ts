export default [
  {
    path: "/calendar",
    name: "calendar",
    meta: { title: "Calendar" },
    component: () => import("./CalendarView.vue"),
  },
];
