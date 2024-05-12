import { PrivateLayout } from "@/layouts";
import {
	ATM,
	Blogs,
	Help,
	Main,
	Notifications,
	Profile,
	Support,
	Transactions,
	Wallet,
} from "@/views";

export const privateRoutes = {
	path: "/",
	component: PrivateLayout,
	children: [
		{
			path: "/main",
			name: "main",
			component: Main,
			children: [
				{
					path: "profile",
					name: "profile",
					component: Profile,
				},
				{
					path: "wallet",
					name: "wallet",
					component: Wallet,
				},
				{
					path: "transactions",
					name: "transactions",
					component: Transactions,
				},
				{
					path: "atm",
					name: "atm",
					component: ATM,
				},
				{
					path: "blogs",
					name: "blogs",
					component: Blogs,
				},
				{
					path: "notifications",
					name: "notifications",
					component: Notifications,
				},
				{
					path: "support",
					name: "support",
					component: Support,
				},
				{
					path: "help",
					name: "help",
					component: Help,
				},
			],
		},
	],
};
