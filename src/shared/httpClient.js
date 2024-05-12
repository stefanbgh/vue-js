import { toast } from "vue3-toastify";
import { toastOptions } from "@/options/toast.options";

import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const httpClient = axios.create({ baseURL });

httpClient.interceptors.request.use(async (config) => {
	const sid = localStorage.getItem("sid");

	if (sid) {
		const { data } = await axios.get(`${baseURL}/auth/check-session`, {
			headers: {
				"X-MARS-SID": sid,
			},
		});

		if (data.msg !== "session-ok") {
			throw new Error("session-not-valid");
		}

		const response = await axios.get(
			`${baseURL}/auth/ex-session?usr_id=${data.sessionUser.usr_id}`
		);

		localStorage.setItem("sid", response.data.sid);
	}

	if (config.data instanceof FormData) {
		config.headers["Content-Type"] = "application/x-www-form-urlencoded";
	} else {
		config.headers["Content-Type"] = "application/json";
	}

	return config;
});

httpClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.data.err === "session-not-valid") {
			localStorage.removeItem("sid");
			localStorage.removeItem("usr_id");

			window.location.replace("/session-expired");

			return;
		}

		if (error.response.data.err === "Your account has been deleted") {
			localStorage.removeItem("sid");
			localStorage.removeItem("usr_id");

			window.location.replace("/");

			return;
		}

		toast(error.response.data.err, toastOptions);
	}
);

export default httpClient;
