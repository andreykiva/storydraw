import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersServiceInterface } from 'src/users/users.service.interface';
import { User } from 'src/users/entities/user.entity';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from '../dto/signup-user.input';
import { AuthServiceInterface } from '../interfaces/auth.service.interface';
import { AuthResponse, RefreshTokenResponse } from '../dto/auth-response';
import { GenerateCodeResponse } from '../dto/generate-code-response';
import { ResetWithEmailInput, ResetWithPhoneInput } from '../dto/reset-password.input';
import {
	EMAIL_EXISTS_ERROR,
	EMAIL_NOT_FOUND_ERROR,
	INVALID_PASSWORD_ERROR,
	NO_PASSWORD_FOR_PHONE_ERROR,
	PHONE_EXISTS_ERROR,
	PHONE_NOT_FOUND_ERROR,
	USERNAME_NOT_FOUND_ERROR,
} from 'src/common/constants/errors.constants';
import { GENERATE_CODE_EMAIL_MESSAGE, GENERATE_CODE_PHONE_MESSAGE } from 'src/common/constants/messages.constants';
import { SmsServiceInterface } from '../interfaces/sms.service.interface';
import { EmailServiceInterface } from '../interfaces/email.service.interface';
import { TokenServiceInterface } from '../interfaces/token.service.interface';
import { IdentifierType } from 'src/verifications/enums/Identifier-type.enum';
import { VerificationsServiceInterface } from 'src/verifications/verifications.service.interface';
import {
	EMAIL_SERVICE,
	SMS_SERVICE,
	TOKEN_SERVICE,
	USERS_SERVICE,
	VERIFICATIONS_SERVICE,
} from 'src/common/constants/providers.constants';

/**
 * AuthService defines the authentication-related operations.
 */
@Injectable()
export class AuthService implements AuthServiceInterface {
	constructor(
		@Inject(USERS_SERVICE) private readonly usersService: UsersServiceInterface,
		@Inject(SMS_SERVICE) private readonly smsService: SmsServiceInterface,
		@Inject(EMAIL_SERVICE) private readonly emailService: EmailServiceInterface,
		@Inject(VERIFICATIONS_SERVICE) private readonly verificationsService: VerificationsServiceInterface,
		@Inject(TOKEN_SERVICE) private readonly tokenService: TokenServiceInterface,
	) {}

	/**
	 * Validates the user's password.
	 * @param user - The user object.
	 * @param enteredPassword - The password entered by the user.
	 * @returns A user object without the password if valid.
	 * @throws UnauthorizedException if the password does not match.
	 */
	async validatePassword(user: User, enteredPassword: string): Promise<Omit<User, 'password'>> {
		const passwordHasMatch = await this.usersService.comparePasswords(enteredPassword, user.password);

		if (!passwordHasMatch) {
			throw new UnauthorizedException({ password: INVALID_PASSWORD_ERROR });
		}

		const { password: _, ...result } = user;
		return result;
	}

	/**
	 * Retrieves a user by phone or throws an exception if not found.
	 * @param phone - The phone number of the user.
	 * @returns The user object.
	 * @throws UnauthorizedException if the user is not found.
	 */
	async getUserByPhoneOrThrow(phone: string): Promise<User> {
		const user = await this.usersService.findOneByPhone(phone);
		if (!user) {
			throw new UnauthorizedException({ phone: PHONE_NOT_FOUND_ERROR });
		}
		return user;
	}

	/**
	 * Generates a verification code for phone authentication.
	 * @param phone - The phone number.
	 * @returns A success message with the success field.
	 */
	async generatePhoneCode(phone: string): Promise<GenerateCodeResponse> {
		const newVerification = await this.verificationsService.create(phone, IdentifierType.PHONE);
		// await this.smsService.sendSms(phone, `StoryDraw | Your verification code: ${newVerification.code}`);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_PHONE_MESSAGE,
		};
	}

	/**
	 * Generates a verification code for email authentication.
	 * @param email - The email address.
	 * @returns A success message with the success field.
	 */
	async generateEmailCode(email: string): Promise<GenerateCodeResponse> {
		const newVerification = await this.verificationsService.create(email, IdentifierType.EMAIL);
		// await this.emailService.sendVerificationCode(email, newVerification.code);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_EMAIL_MESSAGE,
		};
	}

	/**
	 * Generates a phone code for signup.
	 * @param phone - The phone number.
	 * @returns A success message with the code.
	 * @throws BadRequestException if the phone number already exists.
	 */
	async generatePhoneCodeForSignup(phone: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (user) {
			throw new BadRequestException({ phone: PHONE_EXISTS_ERROR });
		}

		return this.generatePhoneCode(phone);
	}

	/**
	 * Generates an email code for signup.
	 * @param email - The email address.
	 * @returns A success message with the code.
	 * @throws BadRequestException if the email address already exists.
	 */
	async generateEmailCodeForSignup(email: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByEmail(email);

		if (user) {
			throw new BadRequestException({ email: EMAIL_EXISTS_ERROR });
		}

		return this.generateEmailCode(email);
	}

	/**
	 * Registers a new user using phone and verification code.
	 * @param signupInput - The signup details, including phone and code.
	 * @returns The created user object.
	 * @throws BadRequestException if the phone already exists or the verification fails.
	 */
	async signupWithPhoneAndCode(signupInput: SignupWithPhoneAndCodeInput): Promise<User> {
		const user = await this.usersService.findOneByPhone(signupInput.phone);

		if (user) {
			throw new BadRequestException({ phone: PHONE_EXISTS_ERROR });
		}

		await this.verificationsService.confirmCode(signupInput.phone, signupInput.code);

		const { code: _, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	/**
	 * Registers a new user using email, password, and verification code.
	 * @param signupInput - The signup details, including email, password, and code.
	 * @returns The created user object.
	 * @throws BadRequestException if the email already exists or the verification fails.
	 */
	async signupWithEmailAndPassAndCode(signupInput: SignupWithEmailAndPassAndCodeInput): Promise<User> {
		const user = await this.usersService.findOneByEmail(signupInput.email);

		if (user) {
			throw new BadRequestException({ email: EMAIL_EXISTS_ERROR });
		}

		await this.verificationsService.confirmCode(signupInput.email, signupInput.code);

		const { code: _, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	/**
	 * Logs in the user and generates access and refresh tokens.
	 * @param user - The user object.
	 * @returns An AuthResponse containing tokens and user details.
	 */
	async login(user: User): Promise<AuthResponse> {
		const payload = { sub: user.id };

		const response = {
			access_token: this.tokenService.generateAccessToken(payload),
			refresh_token: this.tokenService.generateRefreshToken(payload),
			user,
		};

		return response;
	}

	/**
	 * Generates a phone verification code for login.
	 * @param phone - The phone number.
	 * @returns A success message with the success field.
	 * @throws BadRequestException if the phone is not found.
	 */
	async generatePhoneCodeForLogin(phone: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (!user) {
			throw new BadRequestException({ phone: PHONE_NOT_FOUND_ERROR });
		}

		return this.generatePhoneCode(phone);
	}

	/**
	 * Logs in a user with phone and verification code.
	 * @param phone - The phone number.
	 * @param code - The verification code.
	 * @returns An AuthResponse containing tokens and user details.
	 * @throws UnauthorizedException if the phone or code is invalid.
	 */
	async loginWithPhoneAndCode(phone: string, code: string): Promise<AuthResponse> {
		const user = await this.getUserByPhoneOrThrow(phone);

		await this.verificationsService.confirmCode(phone, code);

		return this.login(user);
	}

	/**
	 * Logs in a user with phone and password.
	 * @param phone - The phone number.
	 * @param password - The password.
	 * @returns An AuthResponse containing tokens and user details.
	 * @throws UnauthorizedException if the phone or password is invalid.
	 */
	async loginWithPhoneAndPass(phone: string, password: string): Promise<AuthResponse> {
		const user = await this.getUserByPhoneOrThrow(phone);

		const validatedUser = await this.validatePassword(user, password);

		return this.login(validatedUser);
	}

	/**
	 * Logs in a user with email and password.
	 * @param email - The email address.
	 * @param password - The password.
	 * @returns An AuthResponse containing tokens and user details.
	 * @throws UnauthorizedException if the email or password is invalid.
	 */
	async loginWithEmailAndPass(email: string, password: string): Promise<AuthResponse> {
		const existingUser = await this.usersService.findOneByEmail(email);

		if (!existingUser) {
			throw new UnauthorizedException({ email: EMAIL_NOT_FOUND_ERROR });
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}

	/**
	 * Logs in a user with username and password.
	 * @param username - The username.
	 * @param password - The password.
	 * @returns An AuthResponse containing tokens and user details.
	 * @throws UnauthorizedException if the username or password is invalid.
	 */
	async loginWithUsernameAndPass(username: string, password: string): Promise<AuthResponse> {
		const existingUser = await this.usersService.findOneByUsername(username);

		if (!existingUser) {
			throw new UnauthorizedException({ username: USERNAME_NOT_FOUND_ERROR });
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}

	/**
	 * Refreshes the access token using a refresh token.
	 * @param token - The refresh token.
	 * @returns A new access token.
	 */
	async refreshToken(token: string): Promise<RefreshTokenResponse> {
		const payload = await this.tokenService.verifyRefreshToken(token);

		return {
			access_token: this.tokenService.generateAccessToken(payload),
		};
	}

	/**
	 * Generates a phone verification code for password reset.
	 * @param phone - The phone number.
	 * @returns A success message with the code.
	 * @throws BadRequestException if the phone is not found or there is no password associated.
	 */
	async generatePhoneCodeForReset(phone: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (!user) {
			throw new BadRequestException({ phone: PHONE_NOT_FOUND_ERROR });
		}

		if (!user.password) {
			throw new BadRequestException({ phone: NO_PASSWORD_FOR_PHONE_ERROR });
		}

		return this.generatePhoneCode(phone);
	}

	/**
	 * Generates an email verification code for password reset.
	 * @param email - The email address.
	 * @returns A success message with the code.
	 * @throws BadRequestException if the email is not found.
	 */
	async generateEmailCodeForReset(email: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByEmail(email);

		if (!user) {
			throw new BadRequestException({ email: EMAIL_NOT_FOUND_ERROR });
		}

		return this.generateEmailCode(email);
	}

	/**
	 * Resets a user's password using phone and verification code.
	 * @param resetPasswordInput - The reset details including phone, code, and new password.
	 * @returns The updated user object.
	 * @throws BadRequestException if the phone or verification code is invalid.
	 */
	async resetPasswordWithPhone(resetPasswordInput: ResetWithPhoneInput): Promise<User> {
		const user = await this.usersService.findOneByPhone(resetPasswordInput.phone);

		if (!user) {
			throw new BadRequestException({ phone: PHONE_NOT_FOUND_ERROR });
		}

		if (!user.password) {
			throw new BadRequestException({ phone: NO_PASSWORD_FOR_PHONE_ERROR });
		}

		await this.verificationsService.confirmCode(resetPasswordInput.phone, resetPasswordInput.code);

		return this.usersService.updatePassword(user, resetPasswordInput.password);
	}

	/**
	 * Resets a user's password using email and verification code.
	 * @param resetPasswordInput - The reset details including email, code, and new password.
	 * @returns The updated user object.
	 * @throws BadRequestException if the email or verification code is invalid.
	 */
	async resetPasswordWithEmail(resetPasswordInput: ResetWithEmailInput): Promise<User> {
		const user = await this.usersService.findOneByEmail(resetPasswordInput.email);

		if (!user) {
			throw new BadRequestException({ email: EMAIL_NOT_FOUND_ERROR });
		}

		await this.verificationsService.confirmCode(resetPasswordInput.email, resetPasswordInput.code);

		return this.usersService.updatePassword(user, resetPasswordInput.password);
	}
}
