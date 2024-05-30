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

export const formatCardNumber = (value: string) => {
	const numericValue = value.replace(/[^\d]/g, '');

	return numericValue
		.replace(/\s?/g, '')
		.replace(/(\d{4})/g, '$1 ')
		.slice(0, 19);
};

export const formatExpirationDate = (value: string) => {
	const numericValue = value.replace(/[^\d]/g, '');

	return numericValue
		.replace(/^(\d{2})/, '$1/')
		.replace(/\/(\d{3})/, '/$1')
		.slice(0, 5);
};

export const formatCVCCode = (value: string) => {
	const numericValue = value.replace(/[^\d]/g, '');

	return numericValue.slice(0, 4);
};

