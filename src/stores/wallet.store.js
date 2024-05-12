import { httpUserWallet } from "@/services/user.service";
import { defineStore } from "pinia";

import { ref, computed } from "vue";

export const useWalletStore = defineStore("wallet", () => {
	const walletRef = ref(null);

	const wallet = computed(() => walletRef.value);

	async function getWallet(usr_id) {
		try {
			const response = await httpUserWallet(usr_id);

			if (response) {
				walletRef.value = response.data.wallet;

				return response;
			}

			walletRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	function updateWallet(wal_id, quantity) {
		walletRef.value = walletRef.value.map((wallet) => {
			if (wallet.wal_id === wal_id) {
				wallet.wal_quantity -= quantity;
			}

			return wallet;
		});
	}

	function deleteWallet(wal_id) {
		walletRef.value = walletRef.value.filter(
			(wallet) => wallet.wal_id !== wal_id
		);
	}

	function resetWallet() {
		walletRef.value = null;
	}

	return { wallet, getWallet, updateWallet, deleteWallet, resetWallet };
});
