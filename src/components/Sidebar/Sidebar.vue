<script setup>
import { useTransactionsStore } from "@/stores/transactions.store";
import { useNotificationsStore } from "@/stores/notifications.store";
import { useUserStore } from "@/stores/user.store";
import { useWalletStore } from "@/stores/wallet.store";
import { onMounted, onUnmounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useCardsStore } from "@/stores/cards.store";

defineProps(["data"]);

let interval;
const router = useRouter();
const usr_id = localStorage.getItem("usr_id");

const userStore = useUserStore();
const walletStore = useWalletStore();
const notificationsStore = useNotificationsStore();
const transactionsStore = useTransactionsStore();
const cardsStore = useCardsStore();

const checkTime = async () => {
	const currDate = new Date();
	const h = currDate.getHours();
	const m = currDate.getMinutes();

	if (userStore.card && h === 0 && m === 0) {
		const response = await cardsStore.checkCard(userStore.card.crd_id);

		if (response) {
			const {
				data: {
					card: { crd_balance, crd_status },
				},
			} = response;

			userStore.checkCard({ crd_balance, crd_status });
		}
	}
};

const logout = () => {
	localStorage.removeItem("sid");
	localStorage.removeItem("usr_id");

	userStore.resetProfileInfo();
	walletStore.resetWallet();
	notificationsStore.resetNotifications();
	transactionsStore.resetTransactions();

	router.push({ name: "login" });
};

onMounted(() => {
	if (usr_id) {
		userStore.getProfileInfo(usr_id);
	}

	interval = setInterval(() => {
		checkTime();
	}, 1000);
});

onUnmounted(() => {
	clearInterval(interval);
});
</script>

<template>
	<aside class="sidebar">
		<div class="profile">
			<div class="image" v-if="userStore.image">
				<img
					:src="`data:image/*;base64,${userStore.image}`"
					alt="profile.jpg"
				/>
			</div>
			<div class="image" v-else>
				<i class="pi pi-camera"></i>
			</div>
			<div v-if="userStore.user">
				<div v-if="userStore.card">
					<div
						class="card"
						v-if="userStore.card.crd_status === 'active'"
					>
						<p>
							Balance: ${{
								userStore.card.crd_balance.toLocaleString()
							}}
						</p>
					</div>
					<div class="card" v-else>
						<i class="pi pi-credit-card"></i>
						<p>{{ userStore.card.crd_status }}</p>
					</div>
				</div>
				<RouterLink v-else :to="{ name: 'profile' }"
					>Make a Card</RouterLink
				>
				<div class="username" v-if="userStore.user">
					<p>Username:</p>
					<p>@{{ userStore.user.usr_username }}</p>
				</div>
			</div>
			<div v-else>Loading...</div>
		</div>
		<div class="navigation">
			<RouterLink
				v-for="{ id, name, icon, text } in data"
				:to="{ name }"
				:key="id"
			>
				<i :class="icon"></i>
				<p>{{ text }}</p>
			</RouterLink>
		</div>
		<div class="logout">
			<button @click="logout">
				<i class="pi pi-sign-out"></i>
				<p>Logout</p>
			</button>
		</div>
	</aside>
</template>

<style scoped>
@import "./Sidebar.css";
</style>
