import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { IUsersService } from '../users.interface';
import { UsernameService } from './username.service';

@Injectable()
export class UsersService implements IUsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
		private usernameService: UsernameService,
	) {}

	async create(createUserInput: CreateUserInput): Promise<User> {
		let hashedPassword = null;
		let username = null;

		if (createUserInput.password) {
			hashedPassword = await this.hashPassword(createUserInput.password);
		}

		if (!createUserInput.username) {
			username = this.usernameService.generateUsername();
		}

		const newUser = this.usersRepository.create({
			...createUserInput,
			username,
			displayName: username,
			password: hashedPassword,
		});

		return this.usersRepository.save(newUser);
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOneById(id: string) {
		return this.usersRepository.findOneBy({ id });
	}

	findOneByUsername(username: string): Promise<User> {
		return this.usersRepository.findOneBy({ username });
	}

	findOneByEmail(email: string): Promise<User> {
		return this.usersRepository.findOneBy({ email });
	}

	findOneByPhone(phone: string): Promise<User> {
		return this.usersRepository.findOneBy({ phone });
	}

	hashPassword(password: string): Promise<string> {
		return hash(password, 10);
	}

	comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
		return compare(enteredPassword, hashedPassword);
	}

	async updateUsername(user: User, newUsername: string): Promise<User> {
		user.username = newUsername;

		return this.usersRepository.save(user);
	}

	async updatePassword(user: User, newPassword: string): Promise<User> {
		user.password = await this.hashPassword(newPassword);

		return this.usersRepository.save(user);
	}
}
