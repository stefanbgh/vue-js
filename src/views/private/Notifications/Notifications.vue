<script setup>
import { onMounted, ref, watch } from "vue";
import HeaderVue from "@/components/HeaderVue/HeaderVue.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import QuestionModal from "@/components/QuestionModal/QuestionModal.vue";
import Empty from "@/components/Empty/Empty.vue";
import { sortByData } from "@/constants/sortByData.constant";
import { useNotificationsStore } from "@/stores/notifications.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";
import { useUserStore } from "@/stores/user.store";
import Spinner from "@/components/Spinner/Spinner.vue";

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();

const selected = ref("latest");
const modalIsOpen = ref(false);

const openModal = () => (modalIsOpen.value = true);
const closeModal = () => (modalIsOpen.value = false);

const clearHistory = async () => {
	const usr_id = localStorage.getItem("usr_id");
	const response = await notificationsStore.notificationClearHistory(usr_id);

	if (response) {
		toast(
			"You have successfully cleared the notification history",
			toastOptions
		);

		userStore.resetNtfCount();
		modalIsOpen.value = false;
	}
};

watch(selected, (newVal) => {
	notificationsStore.sortBy(newVal);
});

onMounted(async () => {
	const usr_id = localStorage.getItem("usr_id");

	await notificationsStore.getNotifications(usr_id);
});
</script>

<template>
	<HeaderVue
		title="Notifications"
		desc="Here you can see all notifications in one place."
	/>
	<div v-if="notificationsStore.notifications">
		<div v-if="notificationsStore.notifications.length > 0">
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
				:data="notificationsStore.notifications"
				table="notifications"
			/>
		</div>
		<Empty name="Notifications" v-else />
	</div>
	<Spinner v-else />
	<QuestionModal
		v-if="modalIsOpen"
		question="Do you agree to delete all notifications?"
		@delete-data="clearHistory"
		@close-modal="closeModal"
	/>
</template>

<style scoped>
@import "./Notifications.css";
</style>
