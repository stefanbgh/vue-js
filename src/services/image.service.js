import httpClient from "@/shared/httpClient";

// formData { usr_id, File }
const httpUploadImage = (formData) => {
	return httpClient.put("/image/upload", formData);
};

// usr_id
const httpDeleteImage = (usr_id) => {
	return httpClient.delete("/image/delete", { params: { usr_id } });
};

export { httpUploadImage, httpDeleteImage };
