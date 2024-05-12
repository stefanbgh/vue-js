import httpClient from "@/shared/httpClient";

const httpGetStatistics = () => httpClient.get("/admin/statistics");
const httpGetCustomers = () => httpClient.get("/admin/customers");
const httpGetEmployees = () => httpClient.get("/admin/employees");
const httpGetTransactions = () => httpClient.get("/admin/transactions");
const httpGetNotifications = () => httpClient.get("/admin/notifications");

// dto { usr_id }
const httpChangeRole = (dto) => httpClient.put("/admin/change-role", dto);

// dto { ntf_id, usr_id }
const httpRecoveryCard = (dto) => httpClient.put("/admin/recovery-card", dto);

// dto { ntf_id, usr_id }
const httpRenewalCard = (dto) => httpClient.put("/admin/renewal-card", dto);

// dto { ntf_id, answer }
// type answer = "accept" | "reject"
const httpWithdraw = (dto) => httpClient.put("/admin/withdraw", dto);

export {
	httpGetStatistics,
	httpGetCustomers,
	httpGetEmployees,
	httpGetNotifications,
	httpGetTransactions,
	httpChangeRole,
	httpRecoveryCard,
	httpRenewalCard,
	httpWithdraw,
};
