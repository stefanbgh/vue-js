import pinia from "../utils/pinia";
import router from "../router";

import Vue3Toasity from "vue3-toastify";
import { toastifyOptions } from "@/options/toastify.options";

export function registerPlugins(app) {
	app.use(pinia).use(router).use(Vue3Toasity, toastifyOptions);
}
