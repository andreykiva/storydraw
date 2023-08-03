export const formatNumber = (num) => {
	if (num < 10000) {
		return num;
	} else if (num < 1000000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return (num / 1000000).toFixed(1) + 'M';
};
