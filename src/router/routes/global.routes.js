import { FAQ, Home, Instructions, NotAuthorized, NotFound } from "@/views";

export const globalRoutes = [
	{
		path: "",
		name: "home",
		component: Home,
	},
	{
		path: "/faq",
		name: "faq",
		component: FAQ,
	},
	{
		path: "/instructions",
		name: "instructions",
		component: Instructions,
	},
	{
		path: "/not-authorized",
		name: "not-authorized",
		component: NotAuthorized,
	},
	{
		path: "/:pathName(.*)",
		name: "not-found",
		component: NotFound,
	},
];
