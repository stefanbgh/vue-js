import { privateRoutes } from "./private.routes";
import { publicRoutes } from "./public.routes";
import { adminRoutes } from "./admin.routes";
import { globalRoutes } from "./global.routes";

export const routes = [
	publicRoutes,
	privateRoutes,
	adminRoutes,
	...globalRoutes,
];
