import { usernameRegex } from "../helpers/regex";
import { authValidation } from "./auth.validation";

// return { username, email, password, card }
export const registerValidation = (
	usernameParam,
	emailParam,
	passwordParam
) => {
	let username = null;

	if (!usernameRegex.test(usernameParam)) {
		username =
			"The username must contain letters and numbers, without spaces";
	}

	if (usernameParam.length < 5 || usernameParam.length > 15) {
		username = "Username must be between 5 and 15 characters";
	}

	const { email, password } = authValidation(emailParam, passwordParam);

	return { username, email, password };
};
