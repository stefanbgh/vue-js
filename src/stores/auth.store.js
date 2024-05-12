import {
	httpCheckSession,
	httpCheckStepOne,
	httpLogin,
	httpRegister,
} from "@/services/auth.service";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
	const step = ref(1);
	const username = ref("");
	const email = ref("");
	const password = ref("");
	const newPassword = ref("");
	const fullname = ref("");
	const pin = ref("");

	const errorMsg = ref({
		username: null,
		email: null,
		password: null,
		newPassword: null,
		fullname: null,
		pin: null,
	});

	function updateErrorMsg({
		username = null,
		email = null,
		password = null,
		newPassword = null,
		fullname = null,
		pin = null,
	}) {
		errorMsg.value.username = username;
		errorMsg.value.email = email;
		errorMsg.value.password = password;
		errorMsg.value.newPassword = newPassword;
		errorMsg.value.fullname = fullname;
		errorMsg.value.pin = pin;
	}

	function resetAuthData() {
		step.value = 1;
		username.value = "";
		email.value = "";
		password.value = "";
		newPassword.value = "";
		fullname.value = "";
		pin.value = "";
	}

	async function login(dto) {
		try {
			const response = await httpLogin(dto);

			localStorage.setItem("sid", response.data.sid);
			localStorage.setItem("usr_id", response.data.usr_session.usr_id);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function register(dto) {
		try {
			const response = await httpRegister(dto);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function checkSession(sid) {
		try {
			const response = await httpCheckSession(sid);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function checkStepOne() {
		try {
			const response = await httpCheckStepOne({
				username: username.value,
				email: email.value,
			});

			return response;
		} catch (error) {
			return error.response;
		}
	}

	return {
		step,
		username,
		email,
		password,
		fullname,
		pin,
		errorMsg,
		updateErrorMsg,
		resetAuthData,
		login,
		register,
		checkSession,
		checkStepOne,
	};
});
