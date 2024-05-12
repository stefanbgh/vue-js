<script setup>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import { url, params, headers } from "@/options/singleCoin.options";
import { useUserStore } from "@/stores/user.store";
import { buyQuantity } from "@/utils/helpers/buyQuantity";
import { useTransactionsStore } from "@/stores/transactions.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const props = defineProps(["code"]);
const emits = defineEmits(["close-modal"]);

const usr_id = localStorage.getItem("usr_id");
const userStore = useUserStore();
const transactionsStore = useTransactionsStore();

let interval;
const coin = ref(null);
const amount = ref(0);
const err = ref(null);
const btnText = ref("Buy");

const closeBuyModal = () => {
	emits("close-modal");
};

const buyCoin = (coin) => {
	if (amount.value < 10) {
		err.value = "The amount cannot be less than $10";

		return;
	}

	if (amount.value > userStore.card.crd_balance) {
		err.value = "You do not have enough funds in your account";

		return;
	}

	err.value = null;
	btnText.value = "Wait...";

	const quantity = Number(buyQuantity(amount.value, coin.rate));

	setTimeout(async () => {
		const response = await transactionsStore.buyCoin({
			usr_id,
			coi_id: props.code,
			txn_amount: amount.value,
			txn_quantity: quantity,
		});

		emits("close-modal");

		if (response.status === 201) {
			toast("You have successfully completed the purchase", toastOptions);

			userStore.decreaseCardBalance(amount.value);
		}
	}, 1000);
};

const getSingleCoin = async () => {
	try {
		const response = await axios.post(url, params(props.code), { headers });

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
			<div v-if="coin" class="buy">
				<h2>Buy a Coin</h2>
				<div class="amount">
					<input v-model="amount" type="number" min="10" />
					<div>USD</div>
				</div>
				<div class="err-msg">
					<p v-if="err">{{ err }}</p>
				</div>
				<div class="quantity">
					<div>
						<img :src="coin.webp32" />
					</div>
					<p>{{ buyQuantity(amount, coin.rate) }}</p>
				</div>
				<p class="live-rate">
					<span>Live Rate: </span> ${{ coin.rate.toPrecision(7) }}
				</p>
				<div class="buttons">
					<button @click="closeBuyModal">Close</button>
					<button @click="buyCoin(coin)" class="button">
						{{ btnText }}
					</button>
				</div>
			</div>
			<h3 v-else>Please wait ...</h3>
		</div>
	</div>
</template>

<style scoped>
@import "./BuyModal.css";
</style>
