/**
 * Data Transfer Object for creating a new user.
 */
export class CreateUserDto {
	/**
	 * The desired username for the new user.
	 */
	username?: string;

	/**
	 * The email address of the new user.
	 */
	email?: string;

	/**
	 * The phone number of the new user.
	 */
	phone?: string;

	/**
	 * The password for the new user account.
	 */
	password?: string;

	/**
	 * The date of birth of the new user.
	 */
	dateOfBirth?: Date;

	/**
	 * Indicates whether the user wants to receive email updates.
	 */
	receiveEmailUpdates?: boolean;
}
