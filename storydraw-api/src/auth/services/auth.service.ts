import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from '../dto/signup-user.input';
import { VerificationsService } from 'src/verifications/services/verifications.service';
import { SmsService } from './sms.service';
import { EmailService } from 'src/auth/services/email.service';
import { IAuthService } from '../auth.interface';
import { AuthResponse, RefreshTokenResponse } from '../dto/auth-response';
import { GenerateCodeResponse } from '../dto/generate-code-response';
import { TokenService } from './token.service';
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

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		private usersService: UsersService,
		private smsService: SmsService,
		private emailService: EmailService,
		private verificationsService: VerificationsService,
		private tokenService: TokenService,
	) {}

	async validatePassword(user: User, enteredPassword: string): Promise<User> {
		const passwordHasMatch = await this.usersService.comparePasswords(enteredPassword, user.password);

		if (!passwordHasMatch) {
			throw new UnauthorizedException({ password: INVALID_PASSWORD_ERROR });
		}

		const { password, ...result } = user;
		return result;
	}

	async generatePhoneCode(phone: string): Promise<GenerateCodeResponse> {
		const newVerification = await this.verificationsService.create(phone, 'phone');
		// await this.smsService.sendSms(phone, `Your verification code: ${newVerification.code}`);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_PHONE_MESSAGE,
		};
	}

	async generateEmailCode(email: string): Promise<GenerateCodeResponse> {
		const newVerification = await this.verificationsService.create(email, 'email');
		// await this.emailService.sendVerificationCode(email, newVerification.code);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_EMAIL_MESSAGE,
		};
	}

	async generatePhoneCodeForSignup(phone: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (user) {
			throw new BadRequestException({ phone: PHONE_EXISTS_ERROR });
		}

		return this.generatePhoneCode(phone);
	}

	async generateEmailCodeForSignup(email: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByEmail(email);

		if (user) {
			throw new BadRequestException({ email: EMAIL_EXISTS_ERROR });
		}

		return this.generateEmailCode(email);
	}

	async signupWithPhoneAndCode(signupInput: SignupWithPhoneAndCodeInput): Promise<User> {
		const user = await this.usersService.findOneByPhone(signupInput.phone);

		if (user) {
			throw new BadRequestException({ phone: PHONE_EXISTS_ERROR });
		}

		await this.verificationsService.confirmCode(signupInput.phone, signupInput.code);

		const { code, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	async signupWithEmailAndPassAndCode(signupInput: SignupWithEmailAndPassAndCodeInput): Promise<User> {
		const user = await this.usersService.findOneByEmail(signupInput.email);

		if (user) {
			throw new BadRequestException({ email: EMAIL_EXISTS_ERROR });
		}

		await this.verificationsService.confirmCode(signupInput.email, signupInput.code);

		const { code, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	async login(user: User): Promise<AuthResponse> {
		const payload = { sub: user.id };

		const response = {
			access_token: this.tokenService.generateAccessToken(payload),
			refresh_token: this.tokenService.generateRefreshToken(payload),
			user,
		};

		return response;
	}

	async generatePhoneCodeForLogin(phone: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (!user) {
			throw new BadRequestException({ phone: PHONE_NOT_FOUND_ERROR });
		}

		return this.generatePhoneCode(phone);
	}

	async loginWithPhoneAndCode(phone: string, code: string): Promise<AuthResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (!user) {
			throw new UnauthorizedException({ phone: PHONE_NOT_FOUND_ERROR });
		}

		await this.verificationsService.confirmCode(phone, code);

		return this.login(user);
	}

	async loginWithPhoneAndPass(phone: string, password: string): Promise<AuthResponse> {
		const existingUser = await this.usersService.findOneByPhone(phone);

		if (!existingUser) {
			throw new UnauthorizedException({ phone: PHONE_NOT_FOUND_ERROR });
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}

	async loginWithEmailAndPass(email: string, password: string): Promise<AuthResponse> {
		const existingUser = await this.usersService.findOneByEmail(email);

		if (!existingUser) {
			throw new UnauthorizedException({ email: EMAIL_NOT_FOUND_ERROR });
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}

	async loginWithUsernameAndPass(username: string, password: string): Promise<AuthResponse> {
		const existingUser = await this.usersService.findOneByUsername(username);

		if (!existingUser) {
			throw new UnauthorizedException({ username: USERNAME_NOT_FOUND_ERROR });
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}

	async refreshToken(token: string): Promise<RefreshTokenResponse> {
		const payload = await this.tokenService.verifyRefreshToken(token);

		return {
			access_token: this.tokenService.generateAccessToken(payload),
		};
	}

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

	async generateEmailCodeForReset(email: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByEmail(email);

		if (!user) {
			throw new BadRequestException({ email: EMAIL_NOT_FOUND_ERROR });
		}

		return this.generateEmailCode(email);
	}

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

	async resetPasswordWithEmail(resetPasswordInput: ResetWithEmailInput): Promise<User> {
		const user = await this.usersService.findOneByEmail(resetPasswordInput.email);

		if (!user) {
			throw new BadRequestException({ email: EMAIL_NOT_FOUND_ERROR });
		}

		await this.verificationsService.confirmCode(resetPasswordInput.email, resetPasswordInput.code);

		return this.usersService.updatePassword(user, resetPasswordInput.password);
	}
}
