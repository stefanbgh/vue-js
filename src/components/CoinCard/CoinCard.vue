<script setup>
import { percentagePerDay } from "@/utils/helpers/percentagePerDay";
import { ref } from "vue";

import BuyModal from "@/components/BuyModal/BuyModal.vue";
import CardStatusModal from "@/components/CardStatusModal/CardStatusModal.vue";
import { useUserStore } from "@/stores/user.store";

defineProps(["cryptos"]);

const userStore = useUserStore();

const modalIsOpen = ref(false);
const coinCode = ref(null);

const openCardStatus = () => {
	modalIsOpen.value = true;
};

const openBuyModal = (code) => {
	coinCode.value = code;

	modalIsOpen.value = true;
};

const closeModal = () => {
	modalIsOpen.value = false;
};
</script>

<template>
	<div class="cards">
		<div v-for="crypto in cryptos" :key="crypto.code" class="card">
			<div class="head">
				<img :src="crypto.webp32" alt="logo" />
				<p>{{ crypto.name }}</p>
			</div>
			<div class="body">
				<p class="price">Rate:</p>
				<p>${{ crypto.rate.toPrecision(7) }}</p>
			</div>
			<div class="body">
				<p class="price">Market Cap:</p>
				<p>${{ crypto.cap.toLocaleString() }}</p>
			</div>
			<p
				:class="{
					negative: percentagePerDay(crypto.delta.day) < 0,
					positive: percentagePerDay(crypto.delta.day) > 0,
				}"
			>
				{{ percentagePerDay(crypto.delta.day) }}%
			</p>
			<div class="button" v-if="userStore.card">
				<button
					v-if="userStore.card.crd_status === 'active'"
					@click="openBuyModal(crypto.code)"
				>
					Buy
				</button>
				<button v-else @click="openCardStatus">View</button>
			</div>
		</div>
	</div>
	<div v-if="userStore.card">
		<CardStatusModal
			v-if="userStore.card.crd_status !== 'active' && modalIsOpen"
			:status="userStore.card.crd_status"
			@close-modal="closeModal"
		/>
		<BuyModal
			v-if="userStore.card.crd_status === 'active' && modalIsOpen"
			:code="coinCode"
			@close-modal="closeModal"
		/>
	</div>
</template>

<style scoped>
@import "./CoinCard.css";
</style>
