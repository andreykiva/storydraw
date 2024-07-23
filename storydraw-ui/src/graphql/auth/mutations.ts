import { gql } from '@apollo/client';
import { AUTH_RESPONSE_FIELDS, GENERATE_CODE_RESPONSE_FIELDS } from './fragments';

export const GENERATE_PHONE_CODE_FOR_SIGNUP = gql`
	${GENERATE_CODE_RESPONSE_FIELDS}
	mutation GeneratePhoneCodeForSignup($generateCodeInput: GeneratePhoneCodeInput!) {
		generatePhoneCodeForSignup(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFields
		}
	}
`;

export const GENERATE_EMAIL_CODE_FOR_SIGNUP = gql`
	${GENERATE_CODE_RESPONSE_FIELDS}
	mutation GenerateEmailCodeForSignup($generateCodeInput: GenerateEmailCodeInput!) {
		generateEmailCodeForSignup(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFields
		}
	}
`;

export const SIGNUP_WITH_PHONE_AND_CODE = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation SignupWithPhoneAndCode($signupInput: SignupWithPhoneAndCodeInput!) {
		signupWithPhoneAndCode(signupInput: $signupInput) {
			...AuthResponseFields
		}
	}
`;

export const SIGNUP_WITH_EMAIL_AND_PASS_AND_CODE = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation SignupWithEmailAndPassAndCode($signupInput: SignupWithEmailAndPassAndCodeInput!) {
		signupWithEmailAndPassAndCode(signupInput: $signupInput) {
			...AuthResponseFields
		}
	}
`;

export const GENERATE_PHONE_CODE_FOR_LOGIN = gql`
	${GENERATE_CODE_RESPONSE_FIELDS}
	mutation GeneratePhoneCodeForLogin($generateCodeInput: GeneratePhoneCodeInput!) {
		generatePhoneCodeForLogin(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFields
		}
	}
`;

export const LOGIN_WITH_PHONE_AND_CODE = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation LoginWithPhoneAndCode($loginInput: LoginWithPhoneAndCodeInput!) {
		loginWithPhoneAndCode(loginInput: $loginInput) {
			...AuthResponseFields
		}
	}
`;

export const LOGIN_WITH_PHONE_AND_PASSWORD = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation LoginWithPhoneAndPass($loginInput: LoginWithPhoneAndPassInput!) {
		loginWithPhoneAndPass(loginInput: $loginInput) {
			...AuthResponseFields
		}
	}
`;

export const LOGIN_WITH_EMAIL_AND_PASSWORD = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation LoginWithEmailAndPass($loginInput: LoginWithEmailAndPassInput!) {
		loginWithEmailAndPass(loginInput: $loginInput) {
			...AuthResponseFields
		}
	}
`;

export const LOGIN_WITH_USERNAME_AND_PASSWORD = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation LoginWithUsernameAndPass($loginInput: LoginWithUsernameAndPassInput!) {
		loginWithUsernameAndPass(loginInput: $loginInput) {
			...AuthResponseFields
		}
	}
`;

export const REFRESH_TOKEN = gql`
	mutation RefreshToken($token: String!) {
		refreshToken(token: $token) {
			access_token
		}
	}
`;

export const GENERATE_PHONE_CODE_FOR_RESET = gql`
	${GENERATE_CODE_RESPONSE_FIELDS}
	mutation GeneratePhoneCodeForReset($generateCodeInput: GeneratePhoneCodeInput!) {
		generatePhoneCodeForReset(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFields
		}
	}
`;

export const GENERATE_EMAIL_CODE_FOR_RESET = gql`
	${GENERATE_CODE_RESPONSE_FIELDS}
	mutation GenerateEmailCodeForReset($generateCodeInput: GenerateEmailCodeInput!) {
		generateEmailCodeForReset(generateCodeInput: $generateCodeInput) {
			...GenerateCodeResponseFields
		}
	}
`;

export const RESET_PASSWORD_WITH_PHONE = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation ResetPasswordWithPhone($resetPasswordInput: ResetWithPhoneInput!) {
		resetPasswordWithPhone(resetPasswordInput: $resetPasswordInput) {
			...AuthResponseFields
		}
	}
`;

export const RESET_PASSWORD_WITH_EMAIL = gql`
	${AUTH_RESPONSE_FIELDS}
	mutation ResetPasswordWithEmail($resetPasswordInput: ResetWithEmailInput!) {
		resetPasswordWithEmail(resetPasswordInput: $resetPasswordInput) {
			...AuthResponseFields
		}
	}
`;
