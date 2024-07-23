import { User } from 'src/users/entities/user.entity';
import { GenerateCodeResponse } from './dto/generate-code-response';
import { AuthResponse, RefreshTokenResponse } from './dto/auth-response';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from './dto/signup-user.input';
import { ResetWithEmailInput, ResetWithPhoneInput } from './dto/reset-password.input';

export interface IAuthService {
	validatePassword(user: User, enteredPassword: string): Promise<User>;
	generatePhoneCode(phone: string): Promise<GenerateCodeResponse>;
	generateEmailCode(email: string): Promise<GenerateCodeResponse>;
	generatePhoneCodeForSignup(phone: string): Promise<GenerateCodeResponse>;
	generateEmailCodeForSignup(email: string): Promise<GenerateCodeResponse>;
	signupWithPhoneAndCode(signupInput: SignupWithPhoneAndCodeInput): Promise<User>;
	signupWithEmailAndPassAndCode(signupInput: SignupWithEmailAndPassAndCodeInput): Promise<User>;
	login(user: User): Promise<AuthResponse>;
	generatePhoneCodeForLogin(phone: string): Promise<GenerateCodeResponse>;
	loginWithPhoneAndCode(phone: string, code: string): Promise<AuthResponse>;
	loginWithPhoneAndPass(phone: string, password: string): Promise<AuthResponse>;
	loginWithEmailAndPass(email: string, password: string): Promise<AuthResponse>;
	loginWithUsernameAndPass(username: string, password: string): Promise<AuthResponse>;
	refreshToken(token: string): Promise<RefreshTokenResponse>;
	generatePhoneCodeForReset(phone: string): Promise<GenerateCodeResponse>;
	generateEmailCodeForReset(email: string): Promise<GenerateCodeResponse>;
	resetPasswordWithPhone(resetPasswordInput: ResetWithPhoneInput): Promise<User>;
	resetPasswordWithEmail(resetPasswordInput: ResetWithEmailInput): Promise<User>;
}
