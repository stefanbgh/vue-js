<script setup>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import { url, params, headers } from "@/options/singleCoin.options";
import { sellAmount } from "@/utils/helpers/sellAmount";
import { useTransactionsStore } from "@/stores/transactions.store";
import { useWalletStore } from "@/stores/wallet.store";
import { useUserStore } from "@/stores/user.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const props = defineProps(["wallet"]);
const emits = defineEmits(["close-modal"]);

const usr_id = localStorage.getItem("usr_id");
const userStore = useUserStore();
const transactionsStore = useTransactionsStore();
const walletStore = useWalletStore();

let interval;
const coin = ref(null);
const quantity = ref(props.wallet.wal_quantity);
const err = ref(null);
const btnText = ref("Sell");

const closeSellModal = () => {
	emits("close-modal");
};

const sellCoin = (coin) => {
	if (quantity.value <= 0) {
		err.value = `The quantity cannot be zero or less`;

		return;
	}

	if (quantity.value > props.wallet.wal_quantity) {
		err.value = `Your quantity cannot be greater than ${props.wallet.wal_quantity}`;

		return;
	}

	err.value = null;
	btnText.value = "Wait...";

	const amount = Number(sellAmount(quantity.value, coin.rate));

	setTimeout(async () => {
		const response = await transactionsStore.sellCoin({
			wal_id: props.wallet.wal_id,
			usr_id,
			coi_id: props.wallet.coi_id,
			txn_amount: amount,
			txn_quantity: quantity.value,
		});

		emits("close-modal");

		if (response.status === 201) {
			toast("You have successfully completed the sale", toastOptions);

			if (quantity.value === props.wallet.wal_quantity) {
				walletStore.deleteWallet(props.wallet.wal_id);
			} else {
				walletStore.updateWallet(props.wallet.wal_id, quantity.value);
			}

			userStore.increaseCardBalance(amount);
		}
	}, 1000);
};

const getSingleCoin = async () => {
	try {
		const response = await axios.post(url, params(props.wallet.coi_id), {
			headers,
		});

		coin.value = response.data;
	} catch (error) {
		// toastify
		throw new Error(error);
	}
};

onMounted(() => {
	getSingleCoin();

	interval = setInterval(() => {
		getSingleCoin();
	}, 5000);
});

onUnmounted(() => {
	clearInterval(interval);
});
</script>

<template>
	<div class="modal">
		<div class="form">
			<div v-if="coin" class="sell">
				<h2>Sell a Coin</h2>
				<div class="quantity">
					<div>
						<img :src="coin.webp32" />
					</div>
					<input
						v-model="quantity"
						type="number"
						class="no-spinners"
						min="0"
						:max="quantity"
					/>
				</div>
				<div class="err-msg">
					<p v-if="err">{{ err }}</p>
				</div>
				<div class="amount">
					<p>{{ sellAmount(quantity, coin.rate) }}</p>
					<div>USD</div>
				</div>
				<p class="live-rate">
					<span>Live Rate: </span> ${{ coin.rate.toPrecision(7) }}
				</p>
				<div class="buttons">
					<button @click="closeSellModal">Close</button>
					<button @click="sellCoin(coin)" class="button">
						{{ btnText }}
					</button>
				</div>
			</div>
			<h3 v-else>Please wait ...</h3>
		</div>
	</div>
</template>

<style scoped>
@import "./SellModal.css";
</style>
