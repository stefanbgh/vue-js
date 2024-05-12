import httpClient from "@/shared/httpClient";

// usr_id
const httpGetProfileInfo = (usr_id) => {
	return httpClient.get("/profile/info", { params: { usr_id } });
};

// FormData { usr_id, usr_username, file, usr_email, usr_password, new_password }
// file -> profile image
const httpUpdateProfileInfo = (formData) => {
	return httpClient.put("/profile/update", formData);
};

// usr_id
const httpDeleteProfile = (usr_id) => {
	return httpClient.delete("/profile/delete", { params: { usr_id } });
};

export { httpGetProfileInfo, httpUpdateProfileInfo, httpDeleteProfile };
