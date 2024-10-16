import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GenerateCodeResponse } from './dto/generate-code-response';
import { GenerateEmailCodeInput, GeneratePhoneCodeInput } from './dto/generate-code.input';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from './dto/signup-user.input';
import { AuthResponse, RefreshTokenResponse } from './dto/auth-response';
import {
	LoginWithEmailAndPassInput,
	LoginWithPhoneAndCodeInput,
	LoginWithPhoneAndPassInput,
	LoginWithUsernameAndPassInput,
} from './dto/login-user.input';
import { ResetWithEmailInput, ResetWithPhoneInput } from './dto/reset-password.input';
import { AuthService } from './services/auth.service';

/**
 * Resolver for handling authentication-related GraphQL queries and mutations.
 */
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Generates a phone verification code for signup.
	 *
	 * @param generateCodeInput - Input containing the phone number to generate a code for.
	 * @returns A response containing the generated code.
	 */
	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForSignup(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		return this.authService.generatePhoneCodeForSignup(generateCodeInput.phone);
	}

	/**
	 * Generates an email verification code for signup.
	 *
	 * @param generateCodeInput - Input containing the email address to generate a code for.
	 * @returns A response containing the generated code.
	 */
	@Mutation(() => GenerateCodeResponse)
	async generateEmailCodeForSignup(@Args('generateCodeInput') generateCodeInput: GenerateEmailCodeInput) {
		return this.authService.generateEmailCodeForSignup(generateCodeInput.email);
	}

	/**
	 * Signs up a user with phone number and verification code.
	 *
	 * @param signupInput - Input containing the user's phone number and verification code.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async signupWithPhoneAndCode(@Args('signupInput') signupInput: SignupWithPhoneAndCodeInput) {
		const user = await this.authService.signupWithPhoneAndCode(signupInput);
		return this.authService.login(user);
	}

	/**
	 * Signs up a user with email, password, and verification code.
	 *
	 * @param signupInput - Input containing the user's email, password, and verification code.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async signupWithEmailAndPassAndCode(@Args('signupInput') signupInput: SignupWithEmailAndPassAndCodeInput) {
		const user = await this.authService.signupWithEmailAndPassAndCode(signupInput);
		return this.authService.login(user);
	}

	/**
	 * Generates a phone verification code for login.
	 *
	 * @param generateCodeInput - Input containing the phone number to generate a code for.
	 * @returns A response containing the generated code.
	 */
	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForLogin(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		return this.authService.generatePhoneCodeForLogin(generateCodeInput.phone);
	}

	/**
	 * Logs in a user with phone number and verification code.
	 *
	 * @param loginInput - Input containing the user's phone number and verification code.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async loginWithPhoneAndCode(@Args('loginInput') loginInput: LoginWithPhoneAndCodeInput) {
		return this.authService.loginWithPhoneAndCode(loginInput.phone, loginInput.code);
	}

	/**
	 * Logs in a user with phone number and password.
	 *
	 * @param loginInput - Input containing the user's phone number and password.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async loginWithPhoneAndPass(@Args('loginInput') loginInput: LoginWithPhoneAndPassInput) {
		return this.authService.loginWithPhoneAndPass(loginInput.phone, loginInput.password);
	}

	/**
	 * Logs in a user with email and password.
	 *
	 * @param loginInput - Input containing the user's email and password.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async loginWithEmailAndPass(@Args('loginInput') loginInput: LoginWithEmailAndPassInput) {
		return this.authService.loginWithEmailAndPass(loginInput.email, loginInput.password);
	}

	/**
	 * Logs in a user with username and password.
	 *
	 * @param loginInput - Input containing the user's username and password.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async loginWithUsernameAndPass(@Args('loginInput') loginInput: LoginWithUsernameAndPassInput) {
		return this.authService.loginWithUsernameAndPass(loginInput.username, loginInput.password);
	}

	/**
	 * Refreshes the authentication token.
	 *
	 * @param token - The current refresh token.
	 * @returns A RefreshTokenResponse object containing the new token data.
	 */
	@Mutation(() => RefreshTokenResponse)
	async refreshToken(@Args('token') token: string) {
		return this.authService.refreshToken(token);
	}

	/**
	 * Generates a phone verification code for password reset.
	 *
	 * @param generateCodeInput - Input containing the phone number to generate a code for.
	 * @returns A response containing the generated code.
	 */
	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForReset(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		return this.authService.generatePhoneCodeForReset(generateCodeInput.phone);
	}

	/**
	 * Generates an email verification code for password reset.
	 *
	 * @param generateCodeInput - Input containing the email address to generate a code for.
	 * @returns A response containing the generated code.
	 */
	@Mutation(() => GenerateCodeResponse)
	async generateEmailCodeForReset(@Args('generateCodeInput') generateCodeInput: GenerateEmailCodeInput) {
		return this.authService.generateEmailCodeForReset(generateCodeInput.email);
	}

	/**
	 * Resets the password for a user using their phone number.
	 *
	 * @param resetPasswordInput - Input containing the user's phone number and new password.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async resetPasswordWithPhone(@Args('resetPasswordInput') resetPasswordInput: ResetWithPhoneInput) {
		const user = await this.authService.resetPasswordWithPhone(resetPasswordInput);
		return this.authService.login(user);
	}

	/**
	 * Resets the password for a user using their email address.
	 *
	 * @param resetPasswordInput - Input containing the user's email address and new password.
	 * @returns An AuthResponse object containing user authentication data.
	 */
	@Mutation(() => AuthResponse)
	async resetPasswordWithEmail(@Args('resetPasswordInput') resetPasswordInput: ResetWithEmailInput) {
		const user = await this.authService.resetPasswordWithEmail(resetPasswordInput);
		return this.authService.login(user);
	}
}
