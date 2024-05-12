import { PublicLayout } from "@/layouts";
import { Login, Register, SessionExpired } from "@/views";

export const publicRoutes = {
	path: "/",
	component: PublicLayout,
	children: [
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
		{
			path: "/session-expired",
			name: "session-expired",
			component: SessionExpired,
		},
	],
};
