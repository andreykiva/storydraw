export const formatNumber = (num: number): string => {
	if (num < 10000) {
		return num.toString();
	} else if (num < 1000000) {
		return (num / 1000).toFixed(1) + 'K';
	} else if (num < 1000000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}

	return (num / 1000000000).toFixed(1) + 'B';
};
