import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Share } from './entities/share.entity';
import { SharesService } from './services/shares.service';
import { ShareInput } from './dto/share.input';
import { SharesCountResponse } from './dto/shares-count-response';
import { GetSharesCountInput } from './dto/get-shares-count.input';

/**
 * Resolver for GraphQL queries and mutations related to shares.
 */
@Resolver(() => Share)
export class SharesResolver {
	constructor(private readonly sharesService: SharesService) {}

	/**
	 * Shares a story for the authenticated user.
	 *
	 * @param context - The GraphQL context containing the request object.
	 * @param shareInput - The input data for sharing a story.
	 * @returns A Promise resolving to the created Share object.
	 */
	@Mutation(() => Share)
	@UseGuards(JwtAuthGuard)
	async share(@Context() context, @Args('shareInput') shareInput: ShareInput): Promise<Share> {
		const user = context.req.user; // Extracts user information from the request context
		return this.sharesService.create(shareInput.storyId, user);
	}

	/**
	 * Retrieves the share count for a specific story.
	 *
	 * @param getSharesCountInput - The input data containing the story ID to get the share count.
	 * @returns A Promise resolving to a SharesCountResponse object containing the share count.
	 */
	@Query(() => SharesCountResponse)
	async getSharesCount(@Args('getSharesCountInput') getSharesCountInput: GetSharesCountInput) {
		const count = await this.sharesService.getSharesCount(getSharesCountInput.storyId);
		return { count };
	}
}
