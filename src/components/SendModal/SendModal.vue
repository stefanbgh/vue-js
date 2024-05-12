<script setup>
import { ref } from "vue";
import { usernameRegex } from "@/utils/helpers/regex";
import { useTransactionsStore } from "@/stores/transactions.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";
import { useWalletStore } from "@/stores/wallet.store";

const props = defineProps(["wallet"]);
const emits = defineEmits(["close-send-modal"]);

const usr_id = localStorage.getItem("usr_id");
const transactionsStore = useTransactionsStore();
const walletStore = useWalletStore();

const err = ref(null);
const btnText = ref("Send");
const quantity = ref(props.wallet.wal_quantity);
const username = ref("");

const closeSendModal = () => {
	emits("close-send-modal");
};

const sendCoin = () => {
	if (!usernameRegex.test(username.value)) {
		err.value =
			"The username must contain letters and numbers, without spaces";

		return;
	}

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

	setTimeout(async () => {
		const response = await transactionsStore.sendCoin({
			wal_id: props.wallet.wal_id,
			coi_id: props.wallet.coi_id,
			usr_id,
			rcp_username: username.value,
			txn_quantity: quantity.value,
		});

		emits("close-send-modal");

		if (response.status === 201) {
			if (quantity.value === props.wallet.wal_quantity) {
				walletStore.deleteWallet(props.wallet.wal_id);
			} else {
				walletStore.updateWallet(props.wallet.wal_id, quantity.value);
			}

			toast("You have successfully completed the sending", toastOptions);
		}
	}, 1000);
};
</script>

<template>
	<div class="modal">
		<div class="form">
			<div class="send">
				<h2>Send a Coin</h2>
				<div class="recipient">
					<div>@</div>
					<input
						type="text"
						placeholder="Enter a recipient username"
						v-model="username"
					/>
				</div>
				<div class="quantity">
					<input
						type="number"
						min="0"
						v-model="quantity"
						class="no-spinners"
					/>
					<div>
						<img
							width="32"
							height="32"
							:src="`data:image/*;base64,${wallet.coi_image}`"
							alt="logo"
						/>
					</div>
				</div>
				<div class="err-msg">
					<p v-if="err">{{ err }}</p>
				</div>
				<div class="buttons">
					<button @click="closeSendModal">Close</button>
					<button @click="sendCoin" class="button">
						{{ btnText }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "./SendModal.css";
</style>
