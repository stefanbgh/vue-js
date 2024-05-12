import { defineStore } from "pinia";

import {
	httpDeleteNotification,
	httpNotificationClearHistory,
	httpNotificationRecoveryCard,
	httpNotificationRenewalCard,
	httpNotificationWithdraw,
	httpNotificationSeen,
	httpNotificationsCheck,
} from "@/services/notifications.service";

import { httpUserNotifications } from "@/services/user.service";
import { ref, computed } from "vue";
import { ntfSortBy } from "@/utils/helpers/ntfSortBy";

export const useNotificationsStore = defineStore("notifications", () => {
	const notificationsRef = ref(null);

	const notifications = computed(() => notificationsRef.value);

	async function getNotifications(usr_id) {
		try {
			const response = await httpUserNotifications(usr_id);

			if (response) {
				notificationsRef.value = response.data.notifications;

				return response;
			}

			notificationsRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function notificationsCheck(usr_id) {
		try {
			const response = await httpNotificationsCheck(usr_id);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function notificationRecoveryCard(dto) {
		try {
			const response = await httpNotificationRecoveryCard(dto);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function notificationRenewalCard(dto) {
		try {
			const response = await httpNotificationRenewalCard(dto);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function notificationWithdraw(dto) {
		try {
			const response = await httpNotificationWithdraw(dto);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function notificationSeen(dto) {
		try {
			const response = await httpNotificationSeen(dto);

			const { ntf_id } = dto;

			notificationsRef.value = notificationsRef.value.map(
				(notification) => {
					if (notification.ntf_id === ntf_id) {
						notification.ntf_seen = 1;
					}

					return notification;
				}
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function notificationClearHistory(ntf_id) {
		try {
			const response = await httpNotificationClearHistory(ntf_id);

			notificationsRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	// id -> ntf_id
	async function deleteNotification(id) {
		try {
			const response = await httpDeleteNotification(id);

			notificationsRef.value = notificationsRef.value.filter(
				(notification) => notification.ntf_id !== id
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	// sort by
	function sortBy(type) {
		notificationsRef.value = ntfSortBy(notificationsRef.value, type);
	}

	function resetNotifications() {
		notificationsRef.value = null;
	}

	return {
		notifications,
		getNotifications,
		notificationsCheck,
		notificationRecoveryCard,
		notificationRenewalCard,
		notificationWithdraw,
		notificationSeen,
		notificationClearHistory,
		deleteNotification,
		sortBy,
		resetNotifications,
	};
});
