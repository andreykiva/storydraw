import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserMetadataService } from './services/user-metadata.service';
import { UserMetadata } from './entities/user-metadata.entity';

@Resolver(() => UserMetadata)
export class UserMetadataResolver {
	constructor(private readonly userMetadataService: UserMetadataService) {}

	@Mutation(() => UserMetadata)
	@UseGuards(JwtAuthGuard)
	async updateLastNotificationsViewed(@Context() context): Promise<UserMetadata> {
		const userId = context.req.user.id;
		return this.userMetadataService.updateLastNotificationsViewed(userId);
	}
}
