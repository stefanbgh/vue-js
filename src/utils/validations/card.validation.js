import { fullnameRegex, onlyNumbers } from "../helpers/regex";

export const cardValidation = ({ crd_fullname, crd_pin }) => {
	let card = {
		crd_fullname: null,
		crd_pin: null,
	};

	if (!fullnameRegex.test(crd_fullname)) {
		card.crd_fullname =
			"Full name on card can only contain letters without spaces";
	}

	if (crd_fullname.length < 6) {
		card.crd_fullname = "Full name on card must be at least 6 characters";
	}

	if (crd_fullname.length > 100) {
		card.crd_fullname =
			"Full name on card must be less than 100 characters";
	}

	if (crd_pin.length !== 4 || !onlyNumbers.test(crd_pin)) {
		card.crd_pin = "The card PIN must be a 4-digit number";
	}

	return card;
};
