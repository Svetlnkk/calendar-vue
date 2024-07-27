import PerfectScrollbar from "vue3-perfect-scrollbar";
import PrimeVue from "primevue/config";
import { ru } from "@/lib";

import "virtual:svg-icons-register";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

import PrimeButton from "primevue/button";
import PrimeInputRadio from "primevue/radiobutton";
import PrimeInputCheckbox from "primevue/checkbox";

export default function (app: any) {
  app.use(PerfectScrollbar);
  app.use(PrimeVue, { ripple: false, locale: ru });

  app.component("PrimeButton", PrimeButton);
  app.component("PrimeInputCheckbox", PrimeInputCheckbox);
  app.component("PrimeInputRadio", PrimeInputRadio);
}
