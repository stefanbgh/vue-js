import { AdminLayout } from "@/layouts";
import {
	AdminNotifications,
	AdminProfile,
	AdminTransactions,
	Customers,
	Dashboard,
	Employees,
} from "@/views";

export const adminRoutes = {
	path: "/",
	component: AdminLayout,
	children: [
		{
			path: "/dashboard",
			name: "dashboard",
			component: Dashboard,
			children: [
				{
					path: "employees",
					name: "employees",
					component: Employees,
				},
				{
					path: "customers",
					name: "customers",
					component: Customers,
				},
				{
					path: "transactions",
					name: "admin-transactions",
					component: AdminTransactions,
				},
				{
					path: "notifications",
					name: "admin-notifications",
					component: AdminNotifications,
				},
				{
					path: "profile",
					name: "admin-profile",
					component: AdminProfile,
				},
			],
		},
	],
};
