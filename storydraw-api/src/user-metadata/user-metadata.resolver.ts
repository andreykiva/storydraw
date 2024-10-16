import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMetadata } from './entities/user-metadata.entity';
import { UserMetadataService } from './services/user-metadata.service';

/**
 * Resolver for GraphQL queries and mutations related to user metadata.
 */
@Resolver(() => UserMetadata)
export class UserMetadataResolver {
	constructor(private readonly userMetadataService: UserMetadataService) {}

	/**
	 * Updates the timestamp for the last notifications viewed by the authenticated user.
	 *
	 * @param context - The GraphQL context containing the request object.
	 * @returns A Promise resolving to the updated UserMetadata object.
	 * @throws UnauthorizedException if the user is not authenticated.
	 */
	@Mutation(() => UserMetadata)
	@UseGuards(JwtAuthGuard)
	async updateLastNotificationsViewed(@Context() context): Promise<UserMetadata> {
		const userId = context.req.user.id; // Extracts user ID from the request context
		return this.userMetadataService.updateLastNotificationsViewed(userId);
	}
}
