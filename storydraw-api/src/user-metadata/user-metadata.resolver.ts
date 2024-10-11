import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { USER_METADATA_SERVICE } from 'src/common/constants/providers.constants';
import { UserMetadataServiceInterface } from './user-metadata.service.interface';
import { UserMetadata } from './entities/user-metadata.entity';

/**
 * Resolver for GraphQL queries and mutations related to user metadata.
 */
@Resolver(() => UserMetadata)
export class UserMetadataResolver {
	constructor(@Inject(USER_METADATA_SERVICE) private readonly userMetadataService: UserMetadataServiceInterface) {}

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
