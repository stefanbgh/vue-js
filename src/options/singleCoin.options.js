const url = `${import.meta.env.VITE_API_BASE_URL}/single`;

const params = (code) => {
	return {
		currency: "USD",
		code,
		meta: true,
	};
};

const headers = {
	"content-type": "application/json",
	"x-api-key": import.meta.env.VITE_API_KEY,
};

export { url, params, headers };
