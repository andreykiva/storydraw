import { User } from 'src/users/entities/user.entity';
import { GenerateCodeResponse } from '../dto/generate-code-response';
import { AuthResponse, RefreshTokenResponse } from '../dto/auth-response';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from '../dto/signup-user.input';
import { ResetWithEmailInput, ResetWithPhoneInput } from '../dto/reset-password.input';

/**
 * AuthServiceInterface - Interface for the authentication service.
 *
 * Describes methods for user authentication, password management, and code generation for signup and reset.
 */
export interface AuthServiceInterface {
	/**
	 * Validates the password entered by the user.
	 *
	 * @param user - The user whose password needs to be validated.
	 * @param enteredPassword - The password entered by the user.
	 * @returns A Promise that resolves to the User object without the password.
	 */
	validatePassword(user: User, enteredPassword: string): Promise<Omit<User, 'password'>>;

	/**
	 * Retrieves a user by phone number or throws an error if not found.
	 *
	 * @param phone - The phone number of the user.
	 * @returns A Promise that resolves to the User object.
	 */
	getUserByPhoneOrThrow(phone: string): Promise<User>;

	/**
	 * Generates a phone code for actions such as login or signup.
	 *
	 * @param phone - The phone number for which the code is generated.
	 * @returns A Promise that resolves to a GenerateCodeResponse object.
	 */
	generatePhoneCode(phone: string): Promise<GenerateCodeResponse>;

	/**
	 * Generates an email code for actions such as login or signup.
	 *
	 * @param email - The email address for which the code is generated.
	 * @returns A Promise that resolves to a GenerateCodeResponse object.
	 */
	generateEmailCode(email: string): Promise<GenerateCodeResponse>;

	/**
	 * Generates a phone code specifically for signup actions.
	 *
	 * @param phone - The phone number for which the code is generated.
	 * @returns A Promise that resolves to a GenerateCodeResponse object.
	 */
	generatePhoneCodeForSignup(phone: string): Promise<GenerateCodeResponse>;

	/**
	 * Generates an email code specifically for signup actions.
	 *
	 * @param email - The email address for which the code is generated.
	 * @returns A Promise that resolves to a GenerateCodeResponse object.
	 */
	generateEmailCodeForSignup(email: string): Promise<GenerateCodeResponse>;

	/**
	 * Signs up a user using their phone and a verification code.
	 *
	 * @param signupInput - Input data for the signup process.
	 * @returns A Promise that resolves to the created User object.
	 */
	signupWithPhoneAndCode(signupInput: SignupWithPhoneAndCodeInput): Promise<User>;

	/**
	 * Signs up a user using their email, password, and a verification code.
	 *
	 * @param signupInput - Input data for the signup process.
	 * @returns A Promise that resolves to the created User object.
	 */
	signupWithEmailAndPassAndCode(signupInput: SignupWithEmailAndPassAndCodeInput): Promise<User>;

	/**
	 * Logs in a user and returns authentication response.
	 *
	 * @param user - The user who is logging in.
	 * @returns A Promise that resolves to an AuthResponse object.
	 */
	login(user: User): Promise<AuthResponse>;

	/**
	 * Generates a phone code specifically for login actions.
	 *
	 * @param phone - The phone number for which the code is generated.
	 * @returns A Promise that resolves to a GenerateCodeResponse object.
	 */
	generatePhoneCodeForLogin(phone: string): Promise<GenerateCodeResponse>;

	/**
	 * Logs in a user using their phone number and verification code.
	 *
	 * @param phone - The phone number of the user.
	 * @param code - The verification code sent to the user's phone.
	 * @returns A Promise that resolves to an AuthResponse object.
	 */
	loginWithPhoneAndCode(phone: string, code: string): Promise<AuthResponse>;

	/**
	 * Logs in a user using their phone number and password.
	 *
	 * @param phone - The phone number of the user.
	 * @param password - The password of the user.
	 * @returns A Promise that resolves to an AuthResponse object.
	 */
	loginWithPhoneAndPass(phone: string, password: string): Promise<AuthResponse>;

	/**
	 * Logs in a user using their email address and password.
	 *
	 * @param email - The email address of the user.
	 * @param password - The password of the user.
	 * @returns A Promise that resolves to an AuthResponse object.
	 */
	loginWithEmailAndPass(email: string, password: string): Promise<AuthResponse>;

	/**
	 * Logs in a user using their username and password.
	 *
	 * @param username - The username of the user.
	 * @param password - The password of the user.
	 * @returns A Promise that resolves to an AuthResponse object.
	 */
	loginWithUsernameAndPass(username: string, password: string): Promise<AuthResponse>;

	/**
	 * Refreshes the user's authentication token.
	 *
	 * @param token - The token to be refreshed.
	 * @returns A Promise that resolves to a RefreshTokenResponse object.
	 */
	refreshToken(token: string): Promise<RefreshTokenResponse>;

	/**
	 * Generates a phone code specifically for resetting passwords.
	 *
	 * @param phone - The phone number for which the code is generated.
	 * @returns A Promise that resolves to a GenerateCodeResponse object.
	 */
	generatePhoneCodeForReset(phone: string): Promise<GenerateCodeResponse>;

	/**
	 * Generates an email code specifically for resetting passwords.
	 *
	 * @param email - The email address for which the code is generated.
	 * @returns A Promise that resolves to a GenerateCodeResponse object.
	 */
	generateEmailCodeForReset(email: string): Promise<GenerateCodeResponse>;

	/**
	 * Resets the password for a user using their phone number.
	 *
	 * @param resetPasswordInput - Input data for resetting the password.
	 * @returns A Promise that resolves to the User object.
	 */
	resetPasswordWithPhone(resetPasswordInput: ResetWithPhoneInput): Promise<User>;

	/**
	 * Resets the password for a user using their email address.
	 *
	 * @param resetPasswordInput - Input data for resetting the password.
	 * @returns A Promise that resolves to the User object.
	 */
	resetPasswordWithEmail(resetPasswordInput: ResetWithEmailInput): Promise<User>;
}
