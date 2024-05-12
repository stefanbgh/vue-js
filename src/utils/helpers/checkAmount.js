export const checkAmount = (amount) => {
	if (amount.length === 0) {
		return "The amount cannot be empty";
	}

	if (amount < 10) {
		return "You cannot withdraw less than $10";
	}

	if (amount & (10 !== 0)) {
		return "Please enter a whole number for the amount";
	}

	return false;
};
