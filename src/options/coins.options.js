const url = `${import.meta.env.VITE_API_BASE_URL}/list`;

const params = {
	currency: "USD",
	sort: "rank",
	order: "ascending",
	offset: 0,
	limit: 10,
	meta: true,
};

const headers = {
	"content-type": "application/json",
	"x-api-key": import.meta.env.VITE_API_KEY,
};

export { url, params, headers };
