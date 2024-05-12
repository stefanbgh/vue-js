import httpClient from "@/shared/httpClient";

// dto { crd_id, crd_pin }
const httpAtmLogin = (dto) => {
	return httpClient.post("/atm/login", dto);
};

export { httpAtmLogin };
