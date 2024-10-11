import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

/**
 * UsersServiceInterface - Interface for the user service.
 *
 * Describes methods for creating, finding, and updating users,
 * as well as for handling passwords and usernames.
 */
export interface UsersServiceInterface {
	/**
	 * Creates a new user.
	 *
	 * @param createUserDto - DTO containing data for creating a user.
	 * @returns A Promise that resolves to the created User object.
	 */
	create(createUserDto: CreateUserDto): Promise<User>;

	/**
	 * Finds a user by their ID.
	 *
	 * @param id - ID of the user to find.
	 * @returns A Promise that resolves to the User object or null if not found.
	 */
	findOneById(id: string): Promise<User | null>;

	/**
	 * Finds a user by their username.
	 *
	 * @param username - Username of the user to find.
	 * @returns A Promise that resolves to the User object or null if not found.
	 */
	findOneByUsername(username: string): Promise<User | null>;

	/**
	 * Finds a user by their email address.
	 *
	 * @param email - Email address of the user to find.
	 * @returns A Promise that resolves to the User object or null if not found.
	 */
	findOneByEmail(email: string): Promise<User | null>;

	/**
	 * Finds a user by their phone number.
	 *
	 * @param phone - Phone number of the user to find.
	 * @returns A Promise that resolves to the User object or null if not found.
	 */
	findOneByPhone(phone: string): Promise<User | null>;

	/**
	 * Hashes a password.
	 *
	 * @param password - The password to hash.
	 * @returns A Promise that resolves to the hashed password.
	 */
	hashPassword(password: string): Promise<string>;

	/**
	 * Compares the entered password with a hashed password.
	 *
	 * @param enteredPassword - The password entered by the user.
	 * @param hashedPassword - The hashed password for comparison.
	 * @returns A Promise that resolves to true if the passwords match, otherwise false.
	 */
	comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean>;

	/**
	 * Checks if a username already exists.
	 *
	 * @param username - The username to check.
	 * @returns A Promise that resolves to true if the username exists, otherwise false.
	 */
	ensureUsernameNotExists(username: string): Promise<boolean>;

	/**
	 * Updates user data.
	 *
	 * @param user - The user to update.
	 * @param updateUserInput - DTO containing new data for the user.
	 * @returns A Promise that resolves to the updated User object.
	 */
	update(user: User, updateUserInput: UpdateUserInput): Promise<User>;

	/**
	 * Updates the username of a user.
	 *
	 * @param user - The user whose username needs to be updated.
	 * @param newUsername - The new username.
	 * @returns A Promise that resolves to the updated User object.
	 */
	updateUsername(user: User, newUsername: string): Promise<User>;

	/**
	 * Updates the password of a user.
	 *
	 * @param user - The user whose password needs to be updated.
	 * @param newPassword - The new password.
	 * @returns A Promise that resolves to the updated User object.
	 */
	updatePassword(user: User, newPassword: string): Promise<User>;
}
