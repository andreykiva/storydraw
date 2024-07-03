import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SigninWithPhoneAndCodeInput } from './dto/signin-user.input';
import { VerificationsService } from 'src/verifications/services/verifications.service';
import { SmsService } from 'src/sms/sms.service';
import {
	PHONE_EXISTS_ERROR,
	EMAIL_EXISTS_ERROR,
	EMAIL_NOT_FOUND_ERROR,
	PHONE_NOT_FOUND_ERROR,
	USERNAME_NOT_FOUND_ERROR,
	GENERATE_CODE_EMAIL_MESSAGE,
	GENERATE_CODE_PHONE_MESSAGE,
	INVALID_CODE_ERROR,
	INVALID_PASSWORD_ERROR,
	TRY_LATER_ERROR,
	CODE_EXPIRED_ERROR,
} from './constants/auth.constants';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from './dto/signup-user.input';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private smsService: SmsService,
		private emailService: EmailService,
		private verificationsService: VerificationsService,
	) {}

	async validatePassword(user: User, password: string) {
		const passwordHasMatch = await compare(password, user.password);

		if (passwordHasMatch) {
			const { password, ...result } = user;
			return result;
		}

		throw new UnauthorizedException(INVALID_PASSWORD_ERROR);
	}

	async validateUserByEmailAndPass(email: string, password: string) {
		const user = await this.usersService.findUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException(EMAIL_NOT_FOUND_ERROR);
		}

		return this.validatePassword(user, password);
	}

	async validateUserByPhoneAndPass(phone: string, password: string) {
		const user = await this.usersService.findUserByPhone(phone);

		if (!user) {
			throw new UnauthorizedException(PHONE_NOT_FOUND_ERROR);
		}

		return this.validatePassword(user, password);
	}

	async validateUserByUsernameAndPass(username: string, password: string) {
		const user = await this.usersService.findUserByUsername(username);

		if (!user) {
			throw new UnauthorizedException(USERNAME_NOT_FOUND_ERROR);
		}

		return this.validatePassword(user, password);
	}

	async signin(user: User) {
		const payload = { username: user.username, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}

	async generatePhoneCode(phone: string) {
		const verification = await this.verificationsService.findVerification(phone);

		if (verification) {
			throw new BadRequestException(TRY_LATER_ERROR);
		}

		const newVerification = await this.verificationsService.createVerification(phone);
		// await this.smsService.sendSms(phone, `Your verification code: ${newVerification.code}`);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_PHONE_MESSAGE,
		};
	}

	async generateEmailCode(email: string) {
		const verification = await this.verificationsService.findVerification(email);

		if (verification) {
			throw new BadRequestException(TRY_LATER_ERROR);
		}

		const newVerification = await this.verificationsService.createVerification(email);
		// await this.emailService.sendVerificationCode(email, newVerification.code);
		console.log(newVerification.code);
		return {
			success: true,
			message: GENERATE_CODE_EMAIL_MESSAGE,
		};
	}

	async confirmVerificationCode(identifier: string, code: string) {
		const verification = await this.verificationsService.findVerification(identifier);

		if (!verification) {
			throw new BadRequestException(CODE_EXPIRED_ERROR);
		}

		await this.verificationsService.deleteVerification(verification);

		if (verification.code !== code) {
			throw new BadRequestException(INVALID_CODE_ERROR);
		}
	}

	async signupWithPhoneAndCode(signupInput: SignupWithPhoneAndCodeInput) {
		await this.confirmVerificationCode(signupInput.phone, signupInput.code);

		const user = await this.usersService.findUserByPhone(signupInput.phone);

		if (user) {
			throw new BadRequestException(PHONE_EXISTS_ERROR);
		}

		const { code, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	async signupWithEmailAndPassAndCode(signupInput: SignupWithEmailAndPassAndCodeInput) {
		await this.confirmVerificationCode(signupInput.email, signupInput.code);

		const user = await this.usersService.findUserByEmail(signupInput.email);

		if (user) {
			throw new BadRequestException(EMAIL_EXISTS_ERROR);
		}

		const { code, ...userDetails } = signupInput;

		return this.usersService.create(userDetails);
	}

	async signinWithPhoneAndCode(signinInput: SigninWithPhoneAndCodeInput) {
		await this.confirmVerificationCode(signinInput.phone, signinInput.code);

		const user = await this.usersService.findUserByPhone(signinInput.phone);

		if (!user) {
			throw new UnauthorizedException(PHONE_NOT_FOUND_ERROR);
		}

		return this.signin(user);
	}
}
