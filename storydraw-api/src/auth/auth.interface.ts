import { User } from 'src/users/entities/user.entity';
import { GenerateCodeResponse } from './dto/generate-code-response';
import { LoginResponse } from './dto/login-response';
import { SignupWithEmailAndPassAndCodeInput, SignupWithPhoneAndCodeInput } from './dto/signup-user.input';

export interface IAuthService {
	validatePassword(user: User, enteredPassword: string): Promise<User>;
	generatePhoneCode(phone: string): Promise<GenerateCodeResponse>;
	generateEmailCode(email: string): Promise<GenerateCodeResponse>;
	generatePhoneCodeForSignup(phone: string): Promise<GenerateCodeResponse>;
	generateEmailCodeForSignup(email: string): Promise<GenerateCodeResponse>;
	signupWithPhoneAndCode(signupInput: SignupWithPhoneAndCodeInput): Promise<User>;
	signupWithEmailAndPassAndCode(signupInput: SignupWithEmailAndPassAndCodeInput): Promise<User>;
	login(user: User): Promise<LoginResponse>;
	generatePhoneCodeForLogin(phone: string): Promise<GenerateCodeResponse>;
	loginWithPhoneAndCode(phone: string, code: string): Promise<LoginResponse>;
	loginWithPhoneAndPass(phone: string, password: string): Promise<LoginResponse>;
	loginWithEmailAndPass(email: string, password: string): Promise<LoginResponse>;
	loginWithUsernameAndPass(username: string, password: string): Promise<LoginResponse>;
}
