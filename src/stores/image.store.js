import { httpUploadImage, httpDeleteImage } from "@/services/image.service";

import { defineStore } from "pinia";

export const useImageStore = defineStore("image", () => {
	async function uploadImage(formData) {
		try {
			const response = await httpUploadImage(formData);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function deleteImage(usr_id) {
		try {
			const response = await httpDeleteImage(usr_id);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	return { uploadImage, deleteImage };
});
