export const ntfSortBy = (notifications, type) => {
	if (type === "latest") {
		return [...notifications].sort(
			(prev, next) =>
				new Date(next.ntf_timestamp) - new Date(prev.ntf_timestamp)
		);
	}

	if (type === "oldest") {
		return [...notifications].sort(
			(prev, next) =>
				new Date(prev.ntf_timestamp) - new Date(next.ntf_timestamp)
		);
	}

	if (type === "z-a") {
		return [...notifications].sort((prev, next) =>
			next.ntf_type.localeCompare(prev.ntf_type)
		);
	}

	if (type === "a-z") {
		return [...notifications].sort((prev, next) =>
			prev.ntf_type.localeCompare(next.ntf_type)
		);
	}

	throw new Error("Something went wrong");
};
