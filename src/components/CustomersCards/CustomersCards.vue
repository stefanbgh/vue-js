<script setup>
import { ref } from "vue";
import { toastOptions } from "@/options/toast.options";
import { useAdminStore } from "@/stores/admin.store";
import { toast } from "vue3-toastify";
import QuestionModal from "../QuestionModal/QuestionModal.vue";

defineProps(["data"]);

const modalIsOpen = ref(false);
const adminStore = useAdminStore();
const action = ref(null);

const usr_id = ref(null);
const usr_username = ref(null);

const openModal = (id, username, a) => {
	usr_id.value = id;
	usr_username.value = username;
	action.value = a;

	modalIsOpen.value = true;
};
const closeModal = () => {
	modalIsOpen.value = false;
};

const changeRole = async () => {
	const response = await adminStore.changeRole({ usr_id: usr_id.value });

	if (response) {
		toast("Role successfully changed", toastOptions);
	}

	modalIsOpen.value = false;
};

const deleteCustomer = async () => {
	const response = await adminStore.deleteCustomer(usr_id.value);

	if (response) {
		toast(
			`You have successfully deleted the customer: @${usr_username.value}`,
			toastOptions
		);
	}

	modalIsOpen.value = false;
};
</script>

<template>
	<div class="cards">
		<div
			class="card"
			v-for="{ usr_id, usr_username, usr_email } in data"
			:key="usr_id"
		>
			<div class="employee">
				<i class="pi pi-user"></i>
			</div>
			<div class="info">
				<div class="username">
					<p>Username:</p>
					<p>@{{ usr_username }}</p>
				</div>
				<div class="email">
					<p>Email:</p>
					<p>{{ usr_email }}</p>
				</div>
			</div>
			<button @click="openModal(usr_id, usr_username, 'change-role')">
				Set as admin
			</button>
			<i
				@click="openModal(usr_id, usr_username, 'delete-customer')"
				class="pi pi-trash delete"
			></i>
		</div>
	</div>
	<QuestionModal
		v-if="modalIsOpen && action === 'change-role'"
		question="Are you sure you want to change this user's role to admin?"
		@close-modal="closeModal"
		@delete-data="changeRole"
	/>
	<QuestionModal
		v-if="modalIsOpen && action === 'delete-customer'"
		question="Are you sure you want to delete this customer?"
		@close-modal="closeModal"
		@delete-data="deleteCustomer"
	/>
</template>

<style scoped>
@import "./CustomersCards.css";
</style>
