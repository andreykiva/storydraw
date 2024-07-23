export const enum LOGIN_FIELD {
	LOGIN = 'login',
	PASSWORD = 'password',
	PHONE = 'phone',
	CODE = 'code',
}

export const enum REGISTER_FIELD {
	EMAIL = 'email',
	USERNAME = 'username',
	PASSWORD = 'password',
	PHONE = 'phone',
	CODE = 'code',
}

export const enum RESET_PASSWORD_FIELD {
	EMAIL = 'email',
	PASSWORD = 'password',
	PHONE = 'phone',
	CODE = 'code',
}

export const enum BIRTH_FIELD {
	MONTH = 'month',
	DAY = 'day',
	YEAR = 'year',
}

export const enum LOGIN_METHOD {
	LOGIN_AND_PASSWORD = 'loginAndPassword',
	PHONE_AND_CODE = 'phoneAndCode',
	PHONE_AND_PASSWORD = 'phoneAndPassword',
}