import httpClient from "@/shared/httpClient";

// dto { crd_id, deposit }
const httpCardDeposit = (dto) => {
	return httpClient.put("/cards/deposit", dto);
};

// dto { crd_id, curr_pin, new_pin }
const httpCardChangePin = (dto) => {
	return httpClient.put("/cards/change-pin", dto);
};

// dto { usr_id, crd_fullname, crd_pin, crd_number, crd_cvv }
const httpMakeACard = (dto) => {
	return httpClient.post("/cards/make-a-card", dto);
};

// crd_id
const httpCheckCard = (crd_id) => {
	return httpClient.get(`cards/check-card?crd_id=${crd_id}`);
};

export { httpCardDeposit, httpCardChangePin, httpMakeACard, httpCheckCard };
