<script setup>
import { ref } from "vue";
import QuestionModal from "@/components/QuestionModal/QuestionModal.vue";
import { toastOptions } from "@/options/toast.options";
import { useTransactionsStore } from "@/stores/transactions.store";
import { toast } from "vue3-toastify";

defineProps(["data"]);

const transactionsStore = useTransactionsStore();

const modalIsOpen = ref(false);
const txn_id = ref(null);

const openModal = (id) => {
	txn_id.value = id;

	modalIsOpen.value = true;
};
const closeModal = () => (modalIsOpen.value = false);

const deleteTransaction = async () => {
	const response = await transactionsStore.transactionDelete(txn_id.value);

	if (response) {
		toast("You have successfully deleted the transaction", toastOptions);
	}

	modalIsOpen.value = false;
};
</script>

<template>
	<table>
		<thead>
			<tr>
				<th>Type</th>
				<th>Content</th>
				<th>Date</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="{ txn_id, txn_type, txn_content, txn_timestamp } in data"
				:key="txn_id"
			>
				<td class="type">{{ txn_type }}</td>
				<td>{{ txn_content }}</td>
				<td>{{ txn_timestamp }}</td>
				<td><i @click="openModal(txn_id)" class="pi pi-trash"></i></td>
			</tr>
		</tbody>
	</table>
	<QuestionModal
		v-if="modalIsOpen"
		question="Do you agree to delete this transaction?"
		@close-modal="closeModal"
		@delete-data="deleteTransaction"
	/>
</template>

<style scoped>
@import "./TransactionsTable.css";
</style>
