import {
	httpDeleteProfile,
	httpGetProfileInfo,
	httpUpdateProfileInfo,
} from "@/services/profile.service";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
	const cardRef = ref(null);
	const imageRef = ref(null);
	const userRef = ref(null);
	const nftCountRef = ref(null);

	const card = computed(() => cardRef.value);
	const image = computed(() => imageRef.value);
	const user = computed(() => userRef.value);
	const ntfCount = computed(() => nftCountRef.value);

	async function getProfileInfo(usr_id) {
		try {
			const response = await httpGetProfileInfo(usr_id);

			cardRef.value = response.data.card;
			imageRef.value = response.data.image;
			userRef.value = response.data.user;
			nftCountRef.value = response.data.ntf_count;
		} catch (error) {
			throw new Error(error);
		}
	}

	async function updateProfile(formData) {
		try {
			const response = await httpUpdateProfileInfo(formData);

			const {
				data: { new_username, new_email },
			} = response;

			userRef.value.usr_username = new_username;
			userRef.value.usr_email = new_email;

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function deleteProfile(usr_id) {
		try {
			const response = await httpDeleteProfile(usr_id);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	function resetProfileInfo() {
		cardRef.value = null;
		imageRef.value = null;
		userRef.value = null;
		nftCountRef.value = null;
	}

	function resetNtfCount() {
		nftCountRef.value = 0;
	}

	function updateNtfCount(ntf_count) {
		nftCountRef.value = ntf_count;
	}

	function decreaseNtfCount() {
		if (nftCountRef.value === 0) {
			return;
		}

		nftCountRef.value -= 1;
	}

	function decreaseCardBalance(amount) {
		cardRef.value.crd_balance -= amount;
	}

	function increaseCardBalance(amount) {
		cardRef.value.crd_balance += amount;
	}

	function uploadImage(file) {
		imageRef.value = file;
	}

	function deleteImage() {
		imageRef.value = null;
	}

	function updateCard(card_info) {
		cardRef.value = card_info;
	}

	function checkCard({ crd_status, crd_balance }) {
		cardRef.value.crd_status = crd_status;
		cardRef.value.crd_balance = crd_balance;
	}

	function blockCard() {
		cardRef.value.crd_status = "blocked";
	}

	return {
		card,
		image,
		user,
		ntfCount,
		updateNtfCount,
		getProfileInfo,
		updateProfile,
		deleteProfile,
		resetProfileInfo,
		resetNtfCount,
		decreaseNtfCount,
		decreaseCardBalance,
		increaseCardBalance,
		uploadImage,
		deleteImage,
		updateCard,
		checkCard,
		blockCard,
	};
});
