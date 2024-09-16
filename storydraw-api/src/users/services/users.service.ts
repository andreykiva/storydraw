import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { IUsersService } from '../users.interface';
import { UsernameService } from './username.service';
import { USERNAME_EXISTS_ERROR } from 'src/common/constants/errors.constants';
import { UpdateUserInput } from '../dto/update-user.input';
import { UserMetadataService } from 'src/user-metadata/services/user-metadata.service';

@Injectable()
export class UsersService implements IUsersService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
		private readonly usernameService: UsernameService,
		private readonly userMetadataService: UserMetadataService,
	) {}

	async createUser(createUserInput: CreateUserInput): Promise<User> {
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

		const savedUser = await this.usersRepository.save(newUser);

		await this.userMetadataService.createUserMetadata(savedUser);

		return savedUser;
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
		await this.ensureUsernameNotExists(newUsername);

		user.username = newUsername;

		return this.usersRepository.save(user);
	}

	async updatePassword(user: User, newPassword: string): Promise<User> {
		user.password = await this.hashPassword(newPassword);

		return this.usersRepository.save(user);
	}

	async ensureUsernameNotExists(username: string): Promise<boolean> {
		const user = await this.findOneByUsername(username);

		if (user) {
			throw new ConflictException({ username: USERNAME_EXISTS_ERROR });
		}

		return false;
	}

	async updateUser(user: User, updateUserInput: UpdateUserInput): Promise<User> {
		if (updateUserInput.username && user.username !== updateUserInput.username) {
			await this.ensureUsernameNotExists(updateUserInput.username);

			user.username = updateUserInput.username;
		}

		if (updateUserInput.displayName) {
			user.displayName = updateUserInput.displayName;
		}

		if (updateUserInput.bio !== undefined) {
			user.bio = updateUserInput.bio;
		}

		return this.usersRepository.save(user);
	}
}
