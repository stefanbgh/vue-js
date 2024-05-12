import { emailRegex, usernameRegex } from "../helpers/regex";

export const profileValidation = (
	newUsername,
	newEmail,
	oldPassword,
	newPassword
) => {
	let username = null;
	let email = null;
	let oldPass = null;
	let newPass = null;

	if (typeof newUsername === "string") {
		if (!usernameRegex.test(newUsername)) {
			username =
				"The username must contain letters and numbers, without spaces";
		}
	}

	if (typeof newEmail === "string") {
		if (!emailRegex.test(newEmail)) {
			email = "Invalid email address";
		}
	}

	if (typeof oldPassword === "string") {
		if (oldPassword.length === 0 && newPassword.length > 0) {
			oldPass = "Password cannot be empty";
		}

		if (oldPassword.length > 0 && newPassword.length === 0) {
			newPass = "New password cannot be empty";
		}

		if (oldPassword.length !== 0 && newPassword.length !== 0) {
			if (oldPassword === newPassword) {
				newPass = "New password cannot be the same as the password";
			}

			if (oldPassword.length < 4) {
				oldPass = "Password must be at least 4 characters";
			}

			if (oldPassword.length > 255) {
				oldPass = "Password must be less than 255 characters";
			}

			if (newPassword.length < 4) {
				newPass = "Password must be at least 4 characters";
			}

			if (newPassword.length > 255) {
				newPass = "Password must be less than 255 characters";
			}
		}
	}

	return { username, email, oldPass, newPass };
};
