import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

export interface IUsersService {
	create(createUserInput: CreateUserInput): Promise<User>;
	findAll(): Promise<User[]>;
	findOneByUsername(username: string): Promise<User>;
	findOneByEmail(email: string): Promise<User>;
	findOneByPhone(phone: string): Promise<User>;
	hashPassword(password: string): Promise<string>;
	comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean>;
}
