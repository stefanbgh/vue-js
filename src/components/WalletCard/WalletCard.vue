<script setup>
import { onMounted, ref } from "vue";

import SellModal from "@/components/SellModal/SellModal.vue";
import SendModal from "@/components/SendModal/SendModal.vue";
import Empty from "../Empty/Empty.vue";
import { useWalletStore } from "@/stores/wallet.store";
import { useUserStore } from "@/stores/user.store";
import CardStatusModal from "../CardStatusModal/CardStatusModal.vue";
import Spinner from "../Spinner/Spinner.vue";

const userStore = useUserStore();
const walletStore = useWalletStore();

const currModal = ref(null);
const modalIsOpen = ref(false);
const wallet = ref(null);

const openModal = (w, modal) => {
	wallet.value = w;

	currModal.value = modal;
	modalIsOpen.value = true;
};

const openCardStatus = () => {
	currModal.value = null;
	modalIsOpen.value = true;
};

const closeModal = () => {
	modalIsOpen.value = false;
};

onMounted(() => {
	const usr_id = localStorage.getItem("usr_id");

	walletStore.getWallet(usr_id);
});
</script>

<template>
	<div v-if="walletStore.wallet">
		<div class="cards" v-if="walletStore.wallet.length > 0">
			<div class="card" v-for="w in walletStore.wallet" :key="w.wal_id">
				<div class="head">
					<img
						width="32"
						height="32"
						:src="`data:image/*;base64,${w.coi_image}`"
						alt="logo"
					/>
					<p>{{ w.coi_name }}</p>
				</div>
				<div class="body">
					<p class="quantity">Quantity:</p>
					<p>{{ w.wal_quantity }}</p>
				</div>
				<div v-if="userStore.card">
					<div
						class="buttons"
						v-if="userStore.card.crd_status === 'active'"
					>
						<button @click="openModal(w, 'send')">Send</button>
						<button @click="openModal(w, 'sell')">Sell</button>
					</div>
					<div class="button" v-else>
						<button @click="openCardStatus">View</button>
					</div>
				</div>
			</div>
			<div v-if="userStore.card">
				<CardStatusModal
					v-if="modalIsOpen && userStore.card.crd_status !== 'active'"
					:status="userStore.card.crd_status"
					@close-modal="closeModal"
				/>
				<SendModal
					v-if="
						modalIsOpen &&
						userStore.card.crd_status === 'active' &&
						currModal === 'send'
					"
					:wallet="wallet"
					@close-send-modal="closeModal"
				/>
				<SellModal
					v-if="
						modalIsOpen &&
						userStore.card.crd_status === 'active' &&
						currModal === 'sell'
					"
					:wallet="wallet"
					@close-modal="closeModal"
				/>
			</div>
		</div>
		<Empty v-else name="Wallet" />
	</div>
	<Spinner v-else />
</template>

<style scoped>
@import "./WalletCard.css";
</style>
