<script setup>
import { ref } from "vue";
import { toastOptions } from "@/options/toast.options";
import { useAdminStore } from "@/stores/admin.store";
import { toast } from "vue3-toastify";
import QuestionModal from "../QuestionModal/QuestionModal.vue";

defineProps(["data"]);

const modalIsOpen = ref(false);
const adminStore = useAdminStore();

const usr_id = ref(null);
const usr_username = ref(null);

const openModal = (id, username) => {
	usr_id.value = id;
	usr_username.value = username;

	modalIsOpen.value = true;
};

const closeModal = () => (modalIsOpen.value = false);

const deleteEmployee = async () => {
	const response = await adminStore.deleteEmployee(usr_id.value);

	if (response) {
		toast(
			`You have successfully deleted the employee: @${usr_username.value}`,
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
				<i class="pi pi-star-fill"></i>
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
			<i
				@click="openModal(usr_id, usr_username)"
				class="pi pi-trash delete"
			></i>
		</div>
	</div>
	<QuestionModal
		v-if="modalIsOpen"
		question="Are you sure you want to delete this employee?"
		@close-modal="closeModal"
		@delete-data="deleteEmployee"
	/>
</template>

<style scoped>
@import "./EmployeesCards.css";
</style>
