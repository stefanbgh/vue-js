import httpClient from "@/shared/httpClient";

// dto { usr_id, coi_id, txn_amount, txn_quantity }
const httpTransactionBuy = (dto) => {
	return httpClient.post("/transactions/buy", dto);
};

// dto { wal_id, usr_id, coi_id, txn_amount, txn_quantity }
const httpTransactionSell = (dto) => {
	return httpClient.post("/transactions/sell", dto);
};

// dto { wal_id, usr_id, coi_id, rcp_username, txn_quantity }
const httpTransactionSend = (dto) => {
	return httpClient.post("/transactions/send", dto);
};

// usr_id
const httpTransactionClearHistory = (usr_id) => {
	return httpClient.delete("/transactions/clear-history", {
		params: { usr_id },
	});
};

// id -> txn_id
const httpDeleteTransaction = (id) => {
	return httpClient.delete(`/transactions/clear-history/${id}`);
};

export {
	httpTransactionBuy,
	httpTransactionSell,
	httpTransactionSend,
	httpTransactionClearHistory,
	httpDeleteTransaction,
};
