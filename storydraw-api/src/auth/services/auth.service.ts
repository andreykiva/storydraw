import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from '../dto/signup-user.input';
import { VerificationsService } from 'src/verifications/services/verifications.service';
import { SmsService } from './sms.service';
import { EmailService } from 'src/auth/services/email.service';
import {
	PHONE_EXISTS_ERROR,
	EMAIL_EXISTS_ERROR,
	EMAIL_NOT_FOUND_ERROR,
	PHONE_NOT_FOUND_ERROR,
	USERNAME_NOT_FOUND_ERROR,
	GENERATE_CODE_EMAIL_MESSAGE,
	GENERATE_CODE_PHONE_MESSAGE,
	INVALID_PASSWORD_ERROR,
} from '../constants/auth.constants';
import { IAuthService } from '../auth.interface';
import { LoginResponse } from '../dto/login-response';
import { GenerateCodeResponse } from '../dto/generate-code-response';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private smsService: SmsService,
		private emailService: EmailService,
		private verificationsService: VerificationsService,
	) {}

	//?DONE LOGIN validate password
	async validatePassword(user: User, enteredPassword: string): Promise<User> {
		const passwordHasMatch = await this.usersService.comparePasswords(enteredPassword, user.password);

		if (!passwordHasMatch) {
			throw new UnauthorizedException(INVALID_PASSWORD_ERROR);
		}

		const { password, ...result } = user;
		return result;
	}

	//?DONE GENERATE code for phone
	async generatePhoneCode(phone: string): Promise<GenerateCodeResponse> {
		const newVerification = await this.verificationsService.create(phone);
		// await this.smsService.sendSms(phone, `Your verification code: ${newVerification.code}`);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_PHONE_MESSAGE,
		};
	}

	//?DONE GENERATE code for email
	async generateEmailCode(email: string): Promise<GenerateCodeResponse> {
		const newVerification = await this.verificationsService.create(email);
		// await this.emailService.sendVerificationCode(email, newVerification.code);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_EMAIL_MESSAGE,
		};
	}

	//?DONE SIGNUP generate code for phone
	async generatePhoneCodeForSignup(phone: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (user) {
			throw new BadRequestException(PHONE_EXISTS_ERROR);
		}

		return this.generatePhoneCode(phone);
	}

	//?DONE SIGNUP generate code for email
	async generateEmailCodeForSignup(email: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByEmail(email);

		if (user) {
			throw new BadRequestException(EMAIL_EXISTS_ERROR);
		}

		return this.generateEmailCode(email);
	}

	//?DONE SIGNUP phone and code
	async signupWithPhoneAndCode(signupInput: SignupWithPhoneAndCodeInput): Promise<User> {
		await this.verificationsService.confirmCode(signupInput.phone, signupInput.code);

		const user = await this.usersService.findOneByPhone(signupInput.phone);

		if (user) {
			throw new BadRequestException(PHONE_EXISTS_ERROR);
		}

		const { code, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	//?DONE SIGNUP email and password and code
	async signupWithEmailAndPassAndCode(signupInput: SignupWithEmailAndPassAndCodeInput): Promise<User> {
		await this.verificationsService.confirmCode(signupInput.email, signupInput.code);

		const user = await this.usersService.findOneByEmail(signupInput.email);

		if (user) {
			throw new BadRequestException(EMAIL_EXISTS_ERROR);
		}

		const { code, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	//?DONE LOGIN login
	async login(user: User): Promise<LoginResponse> {
		const payload = { username: user.username, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}

	//?DONE LOGIN generate code for phone
	async generatePhoneCodeForLogin(phone: string): Promise<GenerateCodeResponse> {
		const user = await this.usersService.findOneByPhone(phone);

		if (!user) {
			throw new BadRequestException(PHONE_NOT_FOUND_ERROR);
		}

		return this.generatePhoneCode(phone);
	}

	//?DONE LOGIN phone and code
	async loginWithPhoneAndCode(phone: string, code: string): Promise<LoginResponse> {
		await this.verificationsService.confirmCode(phone, code);

		const user = await this.usersService.findOneByPhone(phone);

		if (!user) {
			throw new UnauthorizedException(PHONE_NOT_FOUND_ERROR);
		}

		return this.login(user);
	}

	//?DONE LOGIN phone and password
	async loginWithPhoneAndPass(phone: string, password: string): Promise<LoginResponse> {
		const existingUser = await this.usersService.findOneByPhone(phone);

		if (!existingUser) {
			throw new UnauthorizedException(PHONE_NOT_FOUND_ERROR);
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}

	//?DONE LOGIN email and password
	async loginWithEmailAndPass(email: string, password: string): Promise<LoginResponse> {
		const existingUser = await this.usersService.findOneByEmail(email);

		if (!existingUser) {
			throw new UnauthorizedException(EMAIL_NOT_FOUND_ERROR);
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}

	//?DONE LOGIN username and password
	async loginWithUsernameAndPass(username: string, password: string): Promise<LoginResponse> {
		const existingUser = await this.usersService.findOneByUsername(username);

		if (!existingUser) {
			throw new UnauthorizedException(USERNAME_NOT_FOUND_ERROR);
		}

		const validatedUser = await this.validatePassword(existingUser, password);

		return this.login(validatedUser);
	}
}
