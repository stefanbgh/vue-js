import httpClient from "@/shared/httpClient";

// usr_id
const httpNotificationsCheck = (usr_id) => {
	return httpClient.get(`notifications/check?usr_id=${usr_id}`);
};

// dto { usr_id }
const httpNotificationRecoveryCard = (dto) => {
	return httpClient.post("/notifications/recovery-card", dto);
};

// dto { usr_id }
const httpNotificationRenewalCard = (dto) => {
	return httpClient.post("/notifications/renewal-card", dto);
};

// dto { usr_id, withdraw }
const httpNotificationWithdraw = (dto) => {
	return httpClient.post("/notifications/withdraw", dto);
};

// dto { ntf_id }
const httpNotificationSeen = (dto) => {
	return httpClient.put("/notifications/seen", dto);
};

// usr_id
const httpNotificationClearHistory = (usr_id) => {
	return httpClient.delete("/notifications/clear-history", {
		params: { usr_id },
	});
};

// id -> ntf_id
const httpDeleteNotification = (id) => {
	return httpClient.delete(`/notifications/clear-history/${id}`);
};

export {
	httpNotificationsCheck,
	httpNotificationRecoveryCard,
	httpNotificationRenewalCard,
	httpNotificationWithdraw,
	httpNotificationSeen,
	httpNotificationClearHistory,
	httpDeleteNotification,
};
