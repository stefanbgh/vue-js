export const debounce = (fn, delay = 1000) => {
	let timeout;

	return (...args) => {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};
