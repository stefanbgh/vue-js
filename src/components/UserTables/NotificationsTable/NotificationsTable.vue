<script setup>
import { ref } from "vue";
import QuestionModal from "@/components/QuestionModal/QuestionModal.vue";
import { toastOptions } from "@/options/toast.options";
import { useNotificationsStore } from "@/stores/notifications.store";
import { useUserStore } from "@/stores/user.store";
import { timeAgo } from "@/utils/helpers/timeAgo";
import { toast } from "vue3-toastify";

defineProps(["data"]);

const notificationsStore = useNotificationsStore();
const userStore = useUserStore();

const modalIsOpen = ref(false);
const ntf_id = ref(null);

const openModal = (id) => {
	ntf_id.value = id;

	modalIsOpen.value = true;
};
const closeModal = () => (modalIsOpen.value = false);

const deleteNotification = async () => {
	const response = await notificationsStore.deleteNotification(ntf_id.value);

	if (response) {
		userStore.decreaseNtfCount();
		toast("You have successfully deleted the notification", toastOptions);
	}

	modalIsOpen.value = false;
};

const seen = async (ntf_id, ntf_seen) => {
	if (ntf_seen) return;

	const response = await notificationsStore.notificationSeen({ ntf_id });

	if (response) {
		userStore.decreaseNtfCount();

		toast(
			"You have marked that you have seen this notification",
			toastOptions
		);
	}
};
</script>

<template>
	<table>
		<thead>
			<tr>
				<th>Type</th>
				<th>Content</th>
				<th>Time Ago</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="{
					ntf_id,
					ntf_type,
					ntf_content,
					ntf_seen,
					ntf_timestamp,
				} in data"
				:key="ntf_id"
			>
				<td :class="ntf_seen ? 'seen type' : 'type'">{{ ntf_type }}</td>
				<td :class="ntf_seen && 'seen'">{{ ntf_content }}</td>
				<td :class="ntf_seen && 'seen'">
					{{ timeAgo(ntf_timestamp) }}
				</td>
				<td :class="ntf_seen ? 'seen actions' : 'actions'">
					<i @click="openModal(ntf_id)" class="pi pi-trash"></i>
					<i
						@click="seen(ntf_id, ntf_seen)"
						:class="
							ntf_seen
								? 'pi pi-check-circle seen'
								: 'pi pi-check-circle'
						"
					></i>
				</td>
			</tr>
		</tbody>
	</table>
	<QuestionModal
		v-if="modalIsOpen"
		question="Do you agree to delete this notification?"
		@close-modal="closeModal"
		@delete-data="deleteNotification"
	/>
</template>

<style scoped>
@import "./NotificationsTable.css";
</style>
