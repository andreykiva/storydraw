export const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const stringPattern = /^[A-Za-z0-9]+$/;
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
export const phonePattern = /^[0-9]+$/;
export const codePattern = /^[0-9]+$/;
export const cardNumberPattern =
	/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;

export const escapeRegExp = (str: string) => {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const formatCardNumber = (value: string) => {
	return value
		.replace(/\s?/g, '')
		.replace(/(\d{4})/g, '$1 ')
		.trim();
};