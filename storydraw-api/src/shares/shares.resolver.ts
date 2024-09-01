import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Share } from './entities/share.entity';
import { SharesService } from './services/shares.service';
import { ShareInput } from './dto/share.input';
import { SharesCountResponse } from './dto/shares-count-response';
import { SharesCountInput } from './dto/shares-count.input';

@Resolver(() => Share)
export class SharesResolver {
	constructor(private readonly sharesService: SharesService) {}

	@Mutation(() => Share)
	@UseGuards(JwtAuthGuard)
	async share(@Context() context, @Args('shareInput') shareInput: ShareInput) {
		const user = context.req.user;
		return this.sharesService.share(shareInput.storyId, user);
	}

	@Query(() => SharesCountResponse)
	async sharesCount(@Args('favoritesCountInput') favoritesCountInput: SharesCountInput) {
		const count = await this.sharesService.getSharesCount(favoritesCountInput.storyId);
		return { count };
	}
}
