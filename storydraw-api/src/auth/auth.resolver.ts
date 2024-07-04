import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { User } from 'src/users/entities/user.entity';
import { GenerateCodeResponse } from './dto/generate-code-response';
import { GenerateEmailCodeInput, GeneratePhoneCodeInput } from './dto/generate-code.input';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from './dto/signup-user.input';
import { LoginResponse } from './dto/login-response';
import {
	LoginWithEmailAndPassInput,
	LoginWithPhoneAndCodeInput,
	LoginWithPhoneAndPassInput,
	LoginWithUsernameAndPassInput,
} from './dto/login-user.input';

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService) {}

	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForSignup(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		return this.authService.generatePhoneCodeForSignup(generateCodeInput.phone);
	}

	@Mutation(() => GenerateCodeResponse)
	async generateEmailCodeForSignup(@Args('generateCodeInput') generateCodeInput: GenerateEmailCodeInput) {
		return this.authService.generateEmailCodeForSignup(generateCodeInput.email);
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
	async generatePhoneCodeForLogin(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		return this.authService.generatePhoneCodeForLogin(generateCodeInput.phone);
	}

	@Mutation(() => LoginResponse)
	async loginWithPhoneAndCode(@Args('loginInput') loginInput: LoginWithPhoneAndCodeInput) {
		return this.authService.loginWithPhoneAndCode(loginInput.phone, loginInput.code);
	}

	@Mutation(() => LoginResponse)
	async loginWithPhoneAndPass(@Args('loginInput') loginInput: LoginWithPhoneAndPassInput) {
		return this.authService.loginWithPhoneAndPass(loginInput.phone, loginInput.password);
	}

	@Mutation(() => LoginResponse)
	async loginWithEmailAndPass(@Args('loginInput') loginInput: LoginWithEmailAndPassInput) {
		return this.authService.loginWithEmailAndPass(loginInput.email, loginInput.password);
	}

	@Mutation(() => LoginResponse)
	async loginWithUsernameAndPass(@Args('loginInput') loginInput: LoginWithUsernameAndPassInput) {
		return this.authService.loginWithUsernameAndPass(loginInput.username, loginInput.password);
	}
}
