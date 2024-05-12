import { defineStore } from "pinia";

import {
	httpDeleteTransaction,
	httpTransactionBuy,
	httpTransactionClearHistory,
	httpTransactionSell,
	httpTransactionSend,
} from "@/services/transactions.service";

import { httpUserTransactions } from "@/services/user.service";
import { ref, computed } from "vue";
import { txnSortBy } from "@/utils/helpers/txnSortBy";

export const useTransactionsStore = defineStore("transactions", () => {
	const transactionsRef = ref(null);

	const transactions = computed(() => transactionsRef.value);

	async function getTransactions(usr_id) {
		try {
			const response = await httpUserTransactions(usr_id);

			if (response) {
				transactionsRef.value = response.data.transactions;

				return response;
			}

			transactionsRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function buyCoin(dto) {
		try {
			const response = await httpTransactionBuy(dto);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function sellCoin(dto) {
		try {
			const response = await httpTransactionSell(dto);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function sendCoin(dto) {
		try {
			const response = await httpTransactionSend(dto);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function transactionClearHistory(dto) {
		try {
			const response = await httpTransactionClearHistory(dto);

			transactionsRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function transactionDelete(id) {
		try {
			const response = await httpDeleteTransaction(id);

			transactionsRef.value = transactionsRef.value.filter(
				(transaction) => transaction.txn_id !== id
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	// sort by
	function sortBy(type) {
		transactionsRef.value = txnSortBy(transactionsRef.value, type);
	}

	function resetTransactions() {
		transactionsRef.value = null;
	}

	return {
		transactions,
		getTransactions,
		buyCoin,
		sellCoin,
		sendCoin,
		transactionClearHistory,
		transactionDelete,
		sortBy,
		resetTransactions,
	};
});
