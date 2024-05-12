import { fileTypes } from "@/constants/fileTypes.constant";

export const fileType = (ft) => {
	if (!fileTypes.includes(ft)) {
		return false;
	}

	return true;
};
