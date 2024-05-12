import moment from "moment";

export const timeAgo = (timestamp) => {
	const getDate = new Date(timestamp);

	return moment(getDate).fromNow();
};
