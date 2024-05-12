export const sellAmount = (quantity, coinRate) =>
	(quantity * coinRate).toPrecision(7);
