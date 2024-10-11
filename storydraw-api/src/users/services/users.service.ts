import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersServiceInterface } from '../users.service.interface';
import { USERNAME_EXISTS_ERROR } from 'src/common/constants/errors.constants';
import { generateUsername } from 'src/common/utils/username.utils';
import { UpdateUserInput } from '../dto/update-user.input';
import { USER_METADATA_SERVICE } from 'src/common/constants/providers.constants';
import { UserMetadataServiceInterface } from 'src/user-metadata/user-metadata.service.interface';

/**
 * Service for managing user accounts, including creation, retrieval, and updates.
 */
@Injectable()
export class UsersService implements UsersServiceInterface {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
		@Inject(USER_METADATA_SERVICE) private readonly userMetadataService: UserMetadataServiceInterface,
	) {}

	/**
	 * Creates a new user account with optional username and hashed password.
	 *
	 * @param createUserDto - Data transfer object containing user information.
	 * @returns The created User object.
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {
		let hashedPassword = null;
		let username = null;

		if (createUserDto.password) {
			hashedPassword = await this.hashPassword(createUserDto.password);
		}

		if (!createUserDto.username) {
			username = generateUsername();
		}

		const newUser = this.usersRepository.create({
			...createUserDto,
			username,
			displayName: username,
			password: hashedPassword,
		});

		const savedUser = await this.usersRepository.save(newUser);
		await this.userMetadataService.create(savedUser);

		return savedUser;
	}

	/**
	 * Finds a user by their ID.
	 *
	 * @param id - The user's ID.
	 * @returns The User object or null if not found.
	 */
	findOneById(id: string): Promise<User | null> {
		return this.usersRepository.findOneBy({ id });
	}

	/**
	 * Finds a user by their username.
	 *
	 * @param username - The username to search for.
	 * @returns The User object or null if not found.
	 */
	findOneByUsername(username: string): Promise<User | null> {
		return this.usersRepository.findOneBy({ username });
	}

	/**
	 * Finds a user by their email address.
	 *
	 * @param email - The email address to search for.
	 * @returns The User object or null if not found.
	 */
	findOneByEmail(email: string): Promise<User | null> {
		return this.usersRepository.findOneBy({ email });
	}

	/**
	 * Finds a user by their phone number.
	 *
	 * @param phone - The phone number to search for.
	 * @returns The User object or null if not found.
	 */
	findOneByPhone(phone: string): Promise<User | null> {
		return this.usersRepository.findOneBy({ phone });
	}

	/**
	 * Hashes the provided password using bcrypt.
	 *
	 * @param password - The plain text password to hash.
	 * @returns The hashed password.
	 */
	hashPassword(password: string): Promise<string> {
		return hash(password, 10);
	}

	/**
	 * Compares a plain text password with a hashed password.
	 *
	 * @param enteredPassword - The plain text password.
	 * @param hashedPassword - The hashed password to compare against.
	 * @returns True if the passwords match, otherwise false.
	 */
	comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
		return compare(enteredPassword, hashedPassword);
	}

	/**
	 * Ensures the specified username does not already exist.
	 *
	 * @param username - The username to check.
	 * @returns True if the username is available; otherwise, throws an exception.
	 * @throws ConflictException if the username already exists.
	 */
	async ensureUsernameNotExists(username: string): Promise<boolean> {
		const user = await this.findOneByUsername(username);

		if (user) {
			throw new ConflictException({ username: USERNAME_EXISTS_ERROR });
		}

		return false;
	}

	/**
	 * Updates user details based on the provided input.
	 *
	 * @param user - The current user object to update.
	 * @param updateUserInput - The data for updating the user.
	 * @returns The updated User object.
	 */
	async update(user: User, updateUserInput: UpdateUserInput): Promise<User> {
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

	/**
	 * Updates the username of a user.
	 *
	 * @param user - The current user object.
	 * @param newUsername - The new username to set.
	 * @returns The updated User object.
	 */
	async updateUsername(user: User, newUsername: string): Promise<User> {
		await this.ensureUsernameNotExists(newUsername);
		user.username = newUsername;
		return this.usersRepository.save(user);
	}

	/**
	 * Updates the user's password to a new hashed value.
	 *
	 * @param user - The current user object.
	 * @param newPassword - The new plain text password.
	 * @returns The updated User object.
	 */
	async updatePassword(user: User, newPassword: string): Promise<User> {
		user.password = await this.hashPassword(newPassword);
		return this.usersRepository.save(user);
	}
}
