import Country from './Country';

export type FormData = {
	phone: string;
	login: string;
	username: string;
	email: string;
	code: string;
	password: string;
	country: Country;
	birthMonth: string;
	birthDay: string;
	birthYear: string;
	sendTrends: boolean;
};

export type FormErrors = {
	login: string;
	username: string;
	email: string;
	phone: string;
	code: string;
	password: string;
};
