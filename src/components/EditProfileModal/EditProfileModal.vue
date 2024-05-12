<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useAuthStore } from "@/stores/auth.store";
import { profileValidation } from "@/utils/validations/profile.validation";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

const emits = defineEmits(["close-modal"]);

const userStore = useUserStore();
const authStore = useAuthStore();

const usernameVal = ref(userStore.user.usr_username);
const emailVal = ref(userStore.user.usr_email);
const passwordVal = ref("");
const newPasswordVal = ref("");

const closeModal = () => {
	authStore.updateErrorMsg({}); // clear
	emits("close-modal");
};

const editProfile = async () => {
	const { username, email, oldPass, newPass } = profileValidation(
		usernameVal.value,
		emailVal.value,
		passwordVal.value,
		newPasswordVal.value
	);

	if (
		username !== null ||
		email !== null ||
		oldPass !== null ||
		newPass !== null
	) {
		authStore.updateErrorMsg({
			username,
			email,
			password: oldPass,
			newPassword: newPass,
		});

		return;
	}

	authStore.updateErrorMsg({}); // clear
	emits("close-modal");

	const formData = new FormData();
	formData.append("usr_id", userStore.user.usr_id);
	formData.append("usr_username", usernameVal.value);
	formData.append("usr_email", emailVal.value);
	formData.append("usr_password", passwordVal.value);
	formData.append("new_password", newPasswordVal.value);

	const response = await userStore.updateProfile(formData);

	if (response) {
		toast(response.data.msg, toastOptions);
	}
};
</script>

<template>
	<div class="modal">
		<div class="edit-profile">
			<h2>Edit a Profile</h2>
			<form @submit.prevent="editProfile" class="form">
				<div class="field">
					<label for="edit-username">Username</label>
					<input
						v-model.trim="usernameVal"
						id="edit-username"
						type="text"
					/>
					<p class="error">{{ authStore.errorMsg.username }}</p>
				</div>
				<div class="field">
					<label for="edit-email">Email</label>
					<input
						v-model.trim="emailVal"
						id="edit-email"
						type="text"
					/>
					<p class="error">{{ authStore.errorMsg.email }}</p>
				</div>
				<div class="field password">
					<label for="edit-password">Password</label>
					<div>
						<input
							v-model.trim="passwordVal"
							id="edit-password"
							type="password"
						/>
					</div>
					<p class="error">{{ authStore.errorMsg.password }}</p>
				</div>
				<div class="field new-password">
					<label for="edit-new-password">New Password</label>
					<div>
						<input
							v-model.trim="newPasswordVal"
							id="edit-new-password"
							type="password"
						/>
					</div>
					<p class="error">{{ authStore.errorMsg.newPassword }}</p>
				</div>
				<div class="buttons">
					<button type="button" @click="closeModal">Cancel</button>
					<button type="submit" class="button">Save changes</button>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>
@import "./EditProfileModal.css";
</style>
