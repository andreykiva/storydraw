/**
 * TokenServiceInterface - Interface for the token service.
 *
 * Describes methods for generating and verifying access and refresh tokens.
 */
export interface TokenServiceInterface {
	/**
	 * Generates a new access token based on the provided payload.
	 *
	 * @param payload - An object containing the subject identifier (`sub`), which is the user ID.
	 * @returns A string representing the generated access token.
	 */
	generateAccessToken(payload: { sub: string }): string;

	/**
	 * Generates a new refresh token based on the provided payload.
	 *
	 * @param payload - An object containing the subject identifier (`sub`), which is the user ID.
	 * @returns A string representing the generated refresh token.
	 */
	generateRefreshToken(payload: { sub: string }): string;

	/**
	 * Verifies the validity of the provided refresh token.
	 *
	 * @param token - The refresh token to be verified.
	 * @returns A Promise that resolves to an object containing the user ID if the token is valid.
	 * @throws An error if the token is invalid or expired.
	 */
	verifyRefreshToken(token: string): Promise<{ sub: string }>;
}
