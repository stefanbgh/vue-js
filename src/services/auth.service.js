import httpClient from "@/shared/httpClient";

// dto { email, password }
const httpLogin = (dto) => {
	return httpClient.post("/auth/login", dto);
};

// dto { username, email, password, card?: { crd_fullname, crd_pin, crd_number, crd_cvv } }
const httpRegister = (dto) => {
	return httpClient.post("/auth/register", dto);
};

const httpCheckSession = (sid) => {
	return httpClient.get("/auth/check-session", {
		headers: {
			"X-MARS-SID": sid,
		},
	});
};

// dto { username, email }
const httpCheckStepOne = (dto) => {
	return httpClient.post("/auth/check-step-one", dto);
};

export { httpLogin, httpRegister, httpCheckSession, httpCheckStepOne };
