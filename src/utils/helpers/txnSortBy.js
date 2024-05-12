export const txnSortBy = (transactions, type) => {
	if (type === "latest") {
		return [...transactions].sort(
			(prev, next) =>
				new Date(next.txn_timestamp) - new Date(prev.txn_timestamp)
		);
	}

	if (type === "oldest") {
		return [...transactions].sort(
			(prev, next) =>
				new Date(prev.txn_timestamp) - new Date(next.txn_timestamp)
		);
	}

	if (type === "z-a") {
		return [...transactions].sort((prev, next) =>
			next.txn_type.localeCompare(prev.txn_type)
		);
	}

	if (type === "a-z") {
		return [...transactions].sort((prev, next) =>
			prev.txn_type.localeCompare(next.txn_type)
		);
	}

	throw new Error("Something went wrong");
};
