import httpClient from "@/shared/httpClient";

// usr_id
const httpUserNotifications = (usr_id) => {
	return httpClient.get("/user/notifications", { params: { usr_id } });
};

// usr_id
const httpUserTransactions = (usr_id) => {
	return httpClient.get("/user/transactions", { params: { usr_id } });
};

// usr_id
const httpUserWallet = (usr_id) => {
	return httpClient.get("/user/wallet", { params: { usr_id } });
};

export { httpUserNotifications, httpUserTransactions, httpUserWallet };
