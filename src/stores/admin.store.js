import {
	httpChangeRole,
	httpGetCustomers,
	httpGetEmployees,
	httpGetNotifications,
	httpGetStatistics,
	httpGetTransactions,
	httpRecoveryCard,
	httpRenewalCard,
	httpWithdraw,
} from "@/services/admin.service";
import { httpDeleteProfile } from "@/services/profile.service";
import { ntfSortBy } from "@/utils/helpers/ntfSortBy";
import { txnSortBy } from "@/utils/helpers/txnSortBy";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAdminStore = defineStore("admin", () => {
	const statisticsRef = ref(null);
	const customersRef = ref(null);
	const employeesRef = ref(null);
	const notificationsRef = ref(null);
	const transactionsRef = ref(null);

	const statistics = computed(() => statisticsRef.value);
	const customers = computed(() => customersRef.value);
	const employees = computed(() => employeesRef.value);
	const notifications = computed(() => notificationsRef.value);
	const transactions = computed(() => transactionsRef.value);

	async function getStatistics() {
		try {
			const response = await httpGetStatistics();

			statisticsRef.value = response.data.stats;

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function getCustomers() {
		try {
			const response = await httpGetCustomers();

			if (response) {
				customersRef.value = response.data.data;

				return response;
			}

			customersRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function changeRole(dto) {
		try {
			const response = await httpChangeRole(dto);

			const { usr_id } = dto;

			customersRef.value = customersRef.value.filter(
				(customer) => customer.usr_id !== usr_id
			);

			getEmployees();

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function deleteCustomer(usr_id) {
		try {
			const response = await httpDeleteProfile(usr_id);

			customersRef.value = customersRef.value.filter(
				(customer) => customer.usr_id !== usr_id
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function getEmployees() {
		try {
			const response = await httpGetEmployees();

			if (response) {
				employeesRef.value = response.data.data;

				return response;
			}

			employeesRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function deleteEmployee(usr_id) {
		try {
			const response = await httpDeleteProfile(usr_id);

			employeesRef.value = employeesRef.value.filter(
				(employee) => employee.usr_id !== usr_id
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function getNotifications() {
		try {
			const response = await httpGetNotifications();

			if (response) {
				notificationsRef.value = response.data.data;

				return response;
			}

			notificationsRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function getTransactions() {
		try {
			const response = await httpGetTransactions();

			if (response) {
				transactionsRef.value = response.data.data;

				return response;
			}

			transactionsRef.value = [];

			return response;
		} catch (error) {
			return error.response;
		}
	}

	// sort by
	function transactionsSortBy(type) {
		transactionsRef.value = txnSortBy(transactionsRef.value, type);
	}

	function notificationsSortBy(type) {
		notificationsRef.value = ntfSortBy(notificationsRef.value, type);
	}

	// withdraw, renewal, recovery
	// dto { ntf_id, answer }
	async function adminWithdraw(dto) {
		try {
			const response = await httpWithdraw(dto);

			notificationsRef.value = notificationsRef.value.map(
				(notification) => {
					if (notification.ntf_id === dto.ntf_id) {
						notification.ntf_status = `${dto.answer}ed`;
					}

					return notification;
				}
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function adminRenewalCard(dto) {
		try {
			const response = await httpRenewalCard(dto);

			notificationsRef.value = notificationsRef.value.map(
				(notification) => {
					if (notification.ntf_id === dto.ntf_id) {
						notification.ntf_status = "accepted";
					}

					return notification;
				}
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function adminRecoveryCard(dto) {
		try {
			const response = await httpRecoveryCard(dto);

			console.log(response);

			notificationsRef.value = notificationsRef.value.map(
				(notification) => {
					if (notification.ntf_id === dto.ntf_id) {
						notification.ntf_status = "accepted";
					}

					return notification;
				}
			);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	return {
		statistics,
		customers,
		employees,
		notifications,
		transactions,
		getStatistics,
		getCustomers,
		changeRole,
		deleteCustomer,
		getEmployees,
		deleteEmployee,
		getNotifications,
		notificationsSortBy,
		getTransactions,
		transactionsSortBy,
		adminWithdraw,
		adminRenewalCard,
		adminRecoveryCard,
	};
});
