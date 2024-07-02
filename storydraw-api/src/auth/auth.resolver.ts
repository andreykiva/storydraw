import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { GenerateCodeResponse } from './dto/generate-code-response';
import { GenerateEmailCodeInput, GeneratePhoneCodeInput } from './dto/generate-code.input';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from './dto/signup-user.input';
import { SigninResponse } from './dto/signin-response';
import {
	SigninWithEmailAndPassInput,
	SigninWithPhoneAndCodeInput,
	SigninWithPhoneAndPassInput,
	SigninWithUsernameAndPassInput,
} from './dto/signin-user.input';
import { UsersService } from 'src/users/users.service';
import { BadRequestException } from '@nestjs/common';
import {
	EMAIL_EXISTS_ERROR,
	EMAIL_NOT_FOUND_ERROR,
	PHONE_EXISTS_ERROR,
	PHONE_NOT_FOUND_ERROR,
} from './constants/auth.constants';

@Resolver()
export class AuthResolver {
	constructor(
		private authService: AuthService,
		private usersService: UsersService,
	) {}

	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForSignup(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		const user = await this.usersService.findUserByPhoneNumber(generateCodeInput.phoneNumber);

		if (user) {
			throw new BadRequestException(PHONE_EXISTS_ERROR);
		}

		return this.authService.generatePhoneNumberCode(generateCodeInput.phoneNumber);
	}

	@Mutation(() => GenerateCodeResponse)
	async generateEmailCodeForSignup(@Args('generateCodeInput') generateCodeInput: GenerateEmailCodeInput) {
		const user = await this.usersService.findUserByEmail(generateCodeInput.email);

		if (user) {
			throw new BadRequestException(EMAIL_EXISTS_ERROR);
		}

		return this.authService.generateEmailCode(generateCodeInput.email);
	}

	@Mutation(() => User)
	async signupWithPhoneAndCode(@Args('signupInput') signupInput: SignupWithPhoneAndCodeInput) {
		return this.authService.signupWithPhoneAndCode(signupInput);
	}

	@Mutation(() => User)
	async signupWithEmailAndPassAndCode(@Args('signupInput') signupInput: SignupWithEmailAndPassAndCodeInput) {
		return this.authService.signupWithEmailAndPassAndCode(signupInput);
	}

	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForSignin(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		const user = await this.usersService.findUserByPhoneNumber(generateCodeInput.phoneNumber);

		if (!user) {
			throw new BadRequestException(PHONE_NOT_FOUND_ERROR);
		}

		return this.authService.generatePhoneNumberCode(generateCodeInput.phoneNumber);
	}

	@Mutation(() => SigninResponse)
	async signinWithPhoneAndCode(@Args('signinInput') signinInput: SigninWithPhoneAndCodeInput) {
		return this.authService.signinWithPhoneAndCode(signinInput);
	}

	@Mutation(() => SigninResponse)
	async signinWithPhoneAndPass(@Args('signinInput') signinInput: SigninWithPhoneAndPassInput) {
		return this.authService.signinWithPhoneAndPass(signinInput);
	}

	@Mutation(() => SigninResponse)
	async signinWithEmailAndPass(@Args('signinInput') signinInput: SigninWithEmailAndPassInput) {
		return this.authService.signinWithEmailAndPass(signinInput);
	}

	@Mutation(() => SigninResponse)
	async signinWithUsernameAndPass(@Args('signinInput') signinInput: SigninWithUsernameAndPassInput) {
		return this.authService.signinWithUsernameAndPass(signinInput);
	}
}
