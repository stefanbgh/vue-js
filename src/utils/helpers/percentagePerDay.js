export const percentagePerDay = (cryptoPerDay) => {
	return ((cryptoPerDay - 1) * 100).toFixed(2);
};
