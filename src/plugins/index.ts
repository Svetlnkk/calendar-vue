import PerfectScrollbar from "vue3-perfect-scrollbar";
import PrimeVue from "primevue/config";
import { ru } from "@/lib";

import "virtual:svg-icons-register";
// import "@vueform/multiselect/themes/default.css";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

import PrimeButton from "primevue/button";

export default function (app: any) {
  app.use(PerfectScrollbar);
  app.use(PrimeVue, { ripple: false, locale: ru });

  app.component("PrimeButton", PrimeButton);
}
