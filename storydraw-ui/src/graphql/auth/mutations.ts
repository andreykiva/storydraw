import { gql } from '@/__generated__/gql';

export const GENERATE_PHONE_CODE_FOR_SIGNUP = gql(`
	mutation GeneratePhoneCodeForSignup($generateCodeInput: GeneratePhoneCodeInput!) {
		generatePhoneCodeForSignup(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFragment
		}
	}
`);

export const GENERATE_EMAIL_CODE_FOR_SIGNUP = gql(`
	mutation GenerateEmailCodeForSignup($generateCodeInput: GenerateEmailCodeInput!) {
		generateEmailCodeForSignup(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFragment
		}
	}
`);

export const SIGNUP_WITH_PHONE_AND_CODE = gql(`
	mutation SignupWithPhoneAndCode($signupInput: SignupWithPhoneAndCodeInput!) {
		signupWithPhoneAndCode(signupInput: $signupInput) {
			...AuthResponseFragment
		}
	}
`);

export const SIGNUP_WITH_EMAIL_AND_PASS_AND_CODE = gql(`
	mutation SignupWithEmailAndPassAndCode($signupInput: SignupWithEmailAndPassAndCodeInput!) {
		signupWithEmailAndPassAndCode(signupInput: $signupInput) {
			...AuthResponseFragment
		}
	}
`);

export const GENERATE_PHONE_CODE_FOR_LOGIN = gql(`
	mutation GeneratePhoneCodeForLogin($generateCodeInput: GeneratePhoneCodeInput!) {
		generatePhoneCodeForLogin(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFragment
		}
	}
`);

export const LOGIN_WITH_PHONE_AND_CODE = gql(`
	mutation LoginWithPhoneAndCode($loginInput: LoginWithPhoneAndCodeInput!) {
		loginWithPhoneAndCode(loginInput: $loginInput) {
			...AuthResponseFragment
		}
	}
`);

export const LOGIN_WITH_PHONE_AND_PASSWORD = gql(`
	mutation LoginWithPhoneAndPass($loginInput: LoginWithPhoneAndPassInput!) {
		loginWithPhoneAndPass(loginInput: $loginInput) {
			...AuthResponseFragment
		}
	}
`);

export const LOGIN_WITH_EMAIL_AND_PASSWORD = gql(`
	mutation LoginWithEmailAndPass($loginInput: LoginWithEmailAndPassInput!) {
		loginWithEmailAndPass(loginInput: $loginInput) {
			...AuthResponseFragment
		}
	}
`);

export const LOGIN_WITH_USERNAME_AND_PASSWORD = gql(`
	mutation LoginWithUsernameAndPass($loginInput: LoginWithUsernameAndPassInput!) {
		loginWithUsernameAndPass(loginInput: $loginInput) {
			...AuthResponseFragment
		}
	}
`);

export const REFRESH_TOKEN = gql(`
	mutation RefreshToken($token: String!) {
		refreshToken(token: $token) {
			access_token
		}
	}
`);

export const GENERATE_PHONE_CODE_FOR_RESET = gql(`
	mutation GeneratePhoneCodeForReset($generateCodeInput: GeneratePhoneCodeInput!) {
		generatePhoneCodeForReset(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFragment
		}
	}
`);

export const GENERATE_EMAIL_CODE_FOR_RESET = gql(`
	mutation GenerateEmailCodeForReset($generateCodeInput: GenerateEmailCodeInput!) {
		generateEmailCodeForReset(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFragment
		}
	}
`);

export const RESET_PASSWORD_WITH_PHONE = gql(`
	mutation ResetPasswordWithPhone($resetPasswordInput: ResetWithPhoneInput!) {
		resetPasswordWithPhone(resetPasswordInput: $resetPasswordInput) {
			...AuthResponseFragment
		}
	}
`);

export const RESET_PASSWORD_WITH_EMAIL = gql(`
	mutation ResetPasswordWithEmail($resetPasswordInput: ResetWithEmailInput!) {
		resetPasswordWithEmail(resetPasswordInput: $resetPasswordInput) {
			...AuthResponseFragment
		}
	}
`);
