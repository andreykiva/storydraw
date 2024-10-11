import { Verification } from './entities/verification.entity';
import { IdentifierType } from './enums/Identifier-type.enum';

/**
 * VerificationsServiceInterface - Interface for managing verification codes.
 *
 * Describes methods for creating, confirming, and managing verification codes
 * specifically for user identifiers, such as phone numbers and email addresses.
 */
export interface VerificationsServiceInterface {
	/**
	 * Creates a new verification entry for the specified identifier.
	 *
	 * @param identifier - The identifier (phone number or email) for which the verification is created.
	 * @param identifierType - The type of identifier, which must be either 'phone' or 'email'.
	 * @returns A Promise resolving to the newly created Verification object.
	 * @throws BadRequestException if a verification already exists for the identifier.
	 */
	create(identifier: string, identifierType: IdentifierType): Promise<Verification>;

	/**
	 * Confirms the provided verification code for the specified identifier.
	 *
	 * @param identifier - The identifier (phone number or email) associated with the verification.
	 * @param code - The verification code to confirm.
	 * @returns A Promise resolving when the code is confirmed.
	 * @throws BadRequestException if the verification is not found or the code is invalid.
	 */
	confirmCode(identifier: string, code: string): Promise<void>;

	/**
	 * Finds a verification entry by its identifier.
	 *
	 * @param identifier - The identifier (phone number or email) to search for.
	 * @returns A Promise resolving to the found Verification object or null if not found.
	 */
	findOneByIdentifier(identifier: string): Promise<Verification | null>;

	/**
	 * Removes a verification entry from the repository.
	 *
	 * @param verification - The Verification object to remove.
	 * @returns A Promise resolving when the verification is removed.
	 */
	remove(verification: Verification): Promise<void>;

	/**
	 * Removes verification entries older than one minute.
	 *
	 * @returns A Promise resolving when old verifications are removed.
	 */
	removeOld(): Promise<void>;
}
