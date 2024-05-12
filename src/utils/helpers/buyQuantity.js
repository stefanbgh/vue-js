export const buyQuantity = (amount, coinRate) =>
	(amount / coinRate).toPrecision(7);
