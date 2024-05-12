import { emailRegex } from "../helpers/regex";

export const authValidation = (emailParam, passwordParam) => {
	let email = null;
	let password = null;

	if (!emailRegex.test(emailParam)) {
		email = "Invalid email address";
	}

	if (emailParam.length > 255) {
		email = "Email must be at less than 255 characters";
	}

	if (!passwordParam) {
		password = "Password cannot be empty";
	}

	if (passwordParam.length < 4) {
		password = "Password must be at least 4 characters";
	}

	if (passwordParam.length > 255) {
		password = "Password must be less than 255 characters";
	}

	return { email, password };
};
