<script setup>
import { ref, watch, onMounted } from "vue";
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Empty from "@/components/Empty/Empty.vue";
import QuestionModal from "@/components/QuestionModal/QuestionModal.vue";
import { sortByData } from "@/constants/sortByData.constant";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";
import { useTransactionsStore } from "@/stores/transactions.store";
import Spinner from "@/components/Spinner/Spinner.vue";

const transactionsStore = useTransactionsStore();

const selected = ref("latest");
const modalIsOpen = ref(false);

const openModal = () => (modalIsOpen.value = true);
const closeModal = () => (modalIsOpen.value = false);

const clearHistory = async () => {
	const usr_id = localStorage.getItem("usr_id");
	const response = await transactionsStore.transactionClearHistory(usr_id);

	if (response) {
		toast(
			"You have successfully cleared the transaction history",
			toastOptions
		);

		modalIsOpen.value = false;
	}
};

watch(selected, (newVal) => {
	transactionsStore.sortBy(newVal);
});

onMounted(async () => {
	const usr_id = localStorage.getItem("usr_id");

	await transactionsStore.getTransactions(usr_id);
});
</script>

<template>
	<HeaderVue
		title="Transactions"
		desc="Here you can sell your coins and have an overview of all transactions."
	/>
	<div v-if="transactionsStore.transactions">
		<div v-if="transactionsStore.transactions.length > 0">
			<section>
				<div class="sort">
					<p>Sort by:</p>
					<select v-model="selected">
						<option
							v-for="{ id, value, text } in sortByData"
							:value="value"
							:key="id"
						>
							{{ text }}
						</option>
					</select>
				</div>
				<div class="clear-history">
					<button @click="openModal">Clear history</button>
				</div>
			</section>
			<Pagination
				:data="transactionsStore.transactions"
				table="transactions"
			/>
		</div>
		<Empty v-else name="Transactions" />
	</div>
	<Spinner v-else />
	<QuestionModal
		v-if="modalIsOpen"
		question="Do you agree to delete all transactions?"
		@delete-data="clearHistory"
		@close-modal="closeModal"
	/>
</template>

<style scoped>
@import "./Transactions.css";
</style>
