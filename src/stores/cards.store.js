import {
	httpCardChangePin,
	httpCardDeposit,
	httpCheckCard,
	httpMakeACard,
} from "@/services/cards.service";

import { defineStore } from "pinia";

export const useCardsStore = defineStore("cards", () => {
	async function deposit(dto) {
		try {
			const response = await httpCardDeposit(dto);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function changePin(dto) {
		try {
			const response = await httpCardChangePin(dto);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function makeACard(dto) {
		try {
			const response = await httpMakeACard(dto);
			return response;
		} catch (error) {
			return error.response;
		}
	}

	async function checkCard(crd_id) {
		try {
			const response = await httpCheckCard(crd_id);

			return response;
		} catch (error) {
			return error.response;
		}
	}

	return { deposit, changePin, makeACard, checkCard };
});
