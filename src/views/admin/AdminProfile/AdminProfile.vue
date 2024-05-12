<script setup>
import { onUnmounted, ref } from "vue";
import AdminHeader from "@/components/AdminHeader/AdminHeader.vue";
import QuestionModal from "@/components/QuestionModal/QuestionModal.vue";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal.vue";
import Spinner from "@/components/Spinner/Spinner.vue";
import ProfileImage from "@/components/ProfileImage/ProfileImage.vue";
import { toastOptions } from "@/options/toast.options";
import { useImageStore } from "@/stores/image.store";
import { useUserStore } from "@/stores/user.store";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const usr_id = localStorage.getItem("usr_id");

const router = useRouter();
const userStore = useUserStore();
const imageStore = useImageStore();

const modalIsOpen = ref(false);
const action = ref(null);
const isProfileDeleted = ref(false);

const openModal = (a) => {
	action.value = a;

	modalIsOpen.value = true;
};
const closeModal = () => (modalIsOpen.value = false);

const deleteImage = async () => {
	const response = await imageStore.deleteImage(usr_id);

	if (response) {
		userStore.deleteImage();
		imageStore.deleteImage(usr_id);

		toast("Delete profile image successfully", toastOptions);
	}

	modalIsOpen.value = false;
};

const deleteProfile = async () => {
	const response = await userStore.deleteProfile(usr_id);

	if (response) {
		isProfileDeleted.value = true;

		localStorage.removeItem("usr_id");
		localStorage.removeItem("sid");

		router.push({ name: "register" });
	}
};

onUnmounted(() => {
	if (isProfileDeleted.value) {
		toast("You have successfully deleted your account", toastOptions);
	}
});
</script>

<template>
	<AdminHeader
		title="Profile"
		desc="There you can edit your profile."
	/>
	<div v-if="userStore.user">
		<div class="info">
			<ProfileImage @open-modal="openModal" />
			<h2>Admin Information</h2>
			<h3 class="username">
				<span>Username:</span> @{{ userStore.user.usr_username }}
			</h3>
			<h3 class="email">
				<span>Email:</span> {{ userStore.user.usr_email }}
			</h3>
		</div>
		<div class="buttons">
			<button @click="openModal('edit-profile')">Edit profile</button>
			<button @click="openModal('delete-profile')">Delete profile</button>
		</div>
	</div>
	<Spinner v-else />
	<QuestionModal
		v-if="modalIsOpen && action === 'remove-image'"
		question="Are you sure you want to delete profile image?"
		@close-modal="closeModal"
		@delete-data="deleteImage"
	/>
	<EditProfileModal
		v-if="modalIsOpen && action === 'edit-profile'"
		@close-modal="closeModal"
	/>
	<QuestionModal
		v-if="modalIsOpen && action === 'delete-profile'"
		question="Do you agree to delete your profile?"
		@close-modal="closeModal"
		@delete-data="deleteProfile"
	/>
</template>

<style scoped>
@import "./AdminProfile.css";
</style>
