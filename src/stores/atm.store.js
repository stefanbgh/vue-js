import { httpAtmLogin } from "@/services/atm.service";

import { defineStore } from "pinia";

export const useAtmStore = defineStore("atm", () => {
	async function atmLogin(dto) {
		try {
			const response = await httpAtmLogin(dto);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	return { atmLogin };
});
