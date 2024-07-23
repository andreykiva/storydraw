import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
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

	@Mutation(() => AuthResponse)
	async signupWithPhoneAndCode(@Args('signupInput') signupInput: SignupWithPhoneAndCodeInput) {
		const user = await this.authService.signupWithPhoneAndCode(signupInput);
		return this.authService.login(user);
	}

	@Mutation(() => AuthResponse)
	async signupWithEmailAndPassAndCode(@Args('signupInput') signupInput: SignupWithEmailAndPassAndCodeInput) {
		const user = await this.authService.signupWithEmailAndPassAndCode(signupInput);
		return this.authService.login(user);
	}

	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForLogin(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		return this.authService.generatePhoneCodeForLogin(generateCodeInput.phone);
	}

	@Mutation(() => AuthResponse)
	async loginWithPhoneAndCode(@Args('loginInput') loginInput: LoginWithPhoneAndCodeInput) {
		return this.authService.loginWithPhoneAndCode(loginInput.phone, loginInput.code);
	}

	@Mutation(() => AuthResponse)
	async loginWithPhoneAndPass(@Args('loginInput') loginInput: LoginWithPhoneAndPassInput) {
		return this.authService.loginWithPhoneAndPass(loginInput.phone, loginInput.password);
	}

	@Mutation(() => AuthResponse)
	async loginWithEmailAndPass(@Args('loginInput') loginInput: LoginWithEmailAndPassInput) {
		return this.authService.loginWithEmailAndPass(loginInput.email, loginInput.password);
	}

	@Mutation(() => AuthResponse)
	async loginWithUsernameAndPass(@Args('loginInput') loginInput: LoginWithUsernameAndPassInput) {
		return this.authService.loginWithUsernameAndPass(loginInput.username, loginInput.password);
	}

	@Mutation(() => RefreshTokenResponse)
	async refreshToken(@Args('token') token: string) {
		return this.authService.refreshToken(token);
	}

	@Mutation(() => GenerateCodeResponse)
	async generatePhoneCodeForReset(@Args('generateCodeInput') generateCodeInput: GeneratePhoneCodeInput) {
		return this.authService.generatePhoneCodeForReset(generateCodeInput.phone);
	}

	@Mutation(() => GenerateCodeResponse)
	async generateEmailCodeForReset(@Args('generateCodeInput') generateCodeInput: GenerateEmailCodeInput) {
		return this.authService.generateEmailCodeForReset(generateCodeInput.email);
	}

	@Mutation(() => AuthResponse)
	async resetPasswordWithPhone(@Args('resetPasswordInput') resetPasswordInput: ResetWithPhoneInput) {
		const user = await this.authService.resetPasswordWithPhone(resetPasswordInput);
		return this.authService.login(user);
	}

	@Mutation(() => AuthResponse)
	async resetPasswordWithEmail(@Args('resetPasswordInput') resetPasswordInput: ResetWithEmailInput) {
		const user = await this.authService.resetPasswordWithEmail(resetPasswordInput);
		return this.authService.login(user);
	}
}
