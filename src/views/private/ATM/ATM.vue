<script setup>
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useAtmStore } from "@/stores/atm.store";
import { useCardsStore } from "@/stores/cards.store";
import { useNotificationsStore } from "@/stores/notifications.store";
import { atmKeyboard } from "@/constants/atmKeyboard.constant";
import { checkAmount } from "@/utils/helpers/checkAmount";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const userStore = useUserStore();
const atmStore = useAtmStore();
const cardsStore = useCardsStore();
const notificationsStore = useNotificationsStore();

const pin = ref("");
const currStep = ref(1);
const operation = ref(null); // type =  "deposit" | "withdraw";
const amount = ref("");
const isLoading = ref(false);
const type = ref("pin"); // type = "pin" | "amount";

const clearAtm = () => {
	currStep.value = 1;
	amount.value = "";
	type.value = "pin";
};

const nextStep = (str) => {
	isLoading.value = true;

	if (str) {
		operation.value = str;
		type.value = "amount";
	}

	setTimeout(() => {
		currStep.value++;
		isLoading.value = false;
	}, 1000);
};

const enterNumber = (num) => {
	if (num === "c") {
		pin.value = "";
		amount.value = "";

		return;
	}

	if (num === "<") {
		pin.value = pin.value.slice(0, -1);
		amount.value = amount.value.slice(0, -1);

		return;
	}

	if (type.value === "pin") {
		if (pin.value.length === 4) {
			return;
		}

		pin.value += num;
		return;
	}

	amount.value += num;
};

const atmLogin = async () => {
	isLoading.value = true;

	const response = await atmStore.atmLogin({
		crd_id: userStore.card.crd_id,
		crd_pin: pin.value,
	});

	if (response) {
		if (response.data.msg === "Your card is temporarily blocked") {
			userStore.blockCard();
			toast(response.data.msg, toastOptions);
			currStep.value = 1;
		} else {
			currStep.value++;
		}
	}

	pin.value = "";
	isLoading.value = false;
};

const deposit = async () => {
	const msg = checkAmount(amount.value);

	if (msg) {
		toast(msg, toastOptions);

		return;
	}

	isLoading.value = true;

	const response = await cardsStore.deposit({
		crd_id: userStore.card.crd_id,
		deposit: parseInt(amount.value),
	});

	if (response) {
		toast(response.data.msg, toastOptions);
		userStore.increaseCardBalance(parseInt(amount.value));
	}

	isLoading.value = false;
	clearAtm();
};

const withdraw = async () => {
	const msg = checkAmount(amount.value);

	if (msg) {
		toast(msg, toastOptions);

		return;
	}

	isLoading.value = true;

	const response = await notificationsStore.notificationWithdraw({
		usr_id: userStore.user.usr_id,
		withdraw: parseInt(amount.value),
	});

	if (response) {
		toast(response.data.msg, toastOptions);
		userStore.decreaseCardBalance(parseInt(amount.value));
	}

	isLoading.value = false;
	clearAtm();
};
</script>

<template>
	<HeaderVue
		title="ATM"
		desc="With our ATM system, you can deposit or withdraw money from eCoinWall card."
	/>

	<div class="atm-container">
		<div class="atm-section">
			<div class="atm-ui" v-if="currStep === 1 && !isLoading">
				<h1>ATM</h1>
				<h2>Welcome to eCoinWall</h2>
				<button @click="nextStep(null)">Start</button>
			</div>

			<div v-if="userStore.card">
				<div
					class="atm-ui"
					v-if="
						userStore.card.crd_status !== 'active' &&
						currStep === 2 &&
						!isLoading
					"
				>
					<h2>Please, activate your card</h2>
					<RouterLink :to="{ name: 'profile' }"
						>Go to Profile</RouterLink
					>
				</div>
				<div
					class="atm-ui"
					v-if="
						userStore.card.crd_status === 'active' &&
						currStep === 2 &&
						!isLoading
					"
				>
					<h2>Enter your PIN</h2>
					<input
						readonly
						v-model="pin"
						type="password"
						maxlength="4"
					/>
					<button @click="atmLogin">Send</button>
				</div>
			</div>

			<div
				class="atm-ui"
				v-if="!userStore.card && currStep === 2 && !isLoading"
			>
				<h2>Please, make a card</h2>
				<RouterLink :to="{ name: 'profile' }">Go to Profile</RouterLink>
			</div>

			<div class="atm-ui" v-if="currStep === 3 && !isLoading">
				<h2>Choose the operation</h2>
				<button @click="nextStep('withdraw')">Withdraw</button>
				<button @click="nextStep('deposit')">Deposit</button>
			</div>

			<div
				class="atm-ui"
				v-if="currStep === 4 && operation === 'withdraw' && !isLoading"
			>
				<div>
					<h2>Money Withdraw</h2>

					<div class="withdraw-buttons">
						<button
							v-for="num in [10, 50, 100, 500, 1000, 30000]"
							:key="num"
							@click="amount = num"
						>
							${{ num }}
						</button>
					</div>
					<input readonly v-model="amount" type="text" />
				</div>
				<button @click="withdraw">Finish</button>
			</div>

			<div
				class="atm-ui"
				v-if="currStep === 4 && operation === 'deposit' && !isLoading"
			>
				<div>
					<h2>Money Deposit</h2>
					<div class="deposit-buttons">
						<button
							v-for="num in [10, 50, 100, 500, 1000, 30000]"
							:key="num"
							@click="amount = num"
						>
							{{ num }}$
						</button>
					</div>
					<input readonly v-model="amount" type="text" />
				</div>
				<button @click="deposit">Finish</button>
			</div>

			<div class="atm-ui" v-if="isLoading">
				<h2>Please wait...</h2>
			</div>
		</div>

		<div class="atm-keyboard">
			<button
				v-for="num in atmKeyboard"
				:key="num"
				@click="enterNumber(num)"
				:disabled="currStep === 1"
			>
				{{ num }}
			</button>
		</div>
	</div>
</template>

<style scoped>
@import "./ATM.css";
</style>
