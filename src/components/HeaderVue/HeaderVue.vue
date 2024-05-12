<script setup>
import { RouterLink } from "vue-router";
import logo from "@/assets/crypto_assets/logo.png";
import { useUserStore } from "@/stores/user.store";
import { useNotificationsStore } from "@/stores/notifications.store";
import { onMounted, onUnmounted } from "vue";
import { useCardsStore } from "@/stores/cards.store";

defineProps(["title", "desc"]);

let interval;
const usr_id = localStorage.getItem("usr_id");

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();
const cardsStore = useCardsStore();

onMounted(() => {
	interval = setInterval(async () => {
		const response = await notificationsStore.notificationsCheck(usr_id);

		if (response) {
			const { data: { ntf_count } } = response;

			userStore.updateNtfCount(ntf_count);

			if (ntf_count > 0 && userStore.card) {
				const { data: { card: { crd_status, crd_balance } } } = await cardsStore.checkCard(userStore.card.crd_id);

				userStore.checkCard({ crd_status, crd_balance })
			}
		}
	}, 5000);
});

onUnmounted(() => {
	clearInterval(interval);
});
</script>

<template>
	<header>
		<div class="logo">
			<RouterLink :to="{ name: 'home' }"
				><img width="150" :src="logo" alt="logo"
			/></RouterLink>
		</div>
		<RouterLink class="notifications" :to="{ name: 'notifications' }">
			<i class="pi pi-bell"></i>
			<div v-if="userStore.ntfCount" class="count">
				{{ userStore.ntfCount }}
			</div>
		</RouterLink>
	</header>
	<div class="page-desc">
		<h2>{{ title }}</h2>
		<p>
			{{ desc }}
		</p>
	</div>
</template>

<style scoped>
@import "./HeaderVue.css";
</style>
