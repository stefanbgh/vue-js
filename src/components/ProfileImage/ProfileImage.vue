<script setup>
import { useImageStore } from "@/stores/image.store";
import { useUserStore } from "@/stores/user.store";
import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";
import { fileType } from "@/utils/helpers/fileType";

const emits = defineEmits(["open-modal"]);

const usr_id = localStorage.getItem("usr_id");
const userStore = useUserStore();
const imageStore = useImageStore();

const openModal = () => {
	emits("open-modal", "remove-image");
};

const uploadImage = async (e) => {
	const file = e.target.files[0];

	const checkFileType = fileType(file.type);

	if (!checkFileType) {
		toast("The allowed file types are: .jpg .jpeg .png", toastOptions);

		return;
	}

	const formData = new FormData();
	formData.append("usr_id", usr_id);
	formData.append("file", file);

	const response = await imageStore.uploadImage(formData);

	if (response) {
		userStore.uploadImage(response.data.image);

		toast("Upload profile image successfully", toastOptions);
	}
};
</script>

<template>
	<i
		v-if="userStore.image"
		class="pi pi-trash remove-image"
		@click="openModal"
	></i>
	<div class="image" v-if="userStore.image">
		<label for="change-image">
			<img
				width="50"
				height="50"
				:src="`data:image/*;base64,${userStore.image}`"
				alt="profile.jpg"
			/>
			<input
				id="change-image"
				class="image-file"
				type="file"
				placeholder="Upload image"
				@change="uploadImage"
			/>
		</label>
	</div>
	<div class="image" v-else>
		<label for="upload-image">
			<i class="pi pi-camera camera"></i>
			<input
				id="upload-image"
				class="image-file"
				type="file"
				placeholder="Upload image"
				@change="uploadImage"
			/>
		</label>
	</div>
</template>

<style scoped>
@import "./ProfileImage.css";
</style>
