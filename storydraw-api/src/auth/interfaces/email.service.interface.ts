/**
 * EmailServiceInterface - Interface for the email service.
 *
 * Describes methods for sending emails, such as verification codes.
 */
export interface EmailServiceInterface {
	/**
	 * Sends a verification code to the specified email address.
	 *
	 * @param email - The email address where the verification code will be sent.
	 * @param code - The verification code to be sent to the user.
	 * @returns A Promise that resolves when the email has been successfully sent.
	 */
	sendVerificationCode(email: string, code: string): Promise<void>;
}
