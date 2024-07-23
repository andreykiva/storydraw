import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Story } from './entities/story.entity';
import { StoriesService } from './services/stories.service';
import { CreateStoryInput } from './dto/create-story.input';
import { Drawing } from './entities/drawing.entity';
import { DrawingsService } from './services/drawings.service';
import { CreateDrawingInput } from './dto/create-drawing.input';

@Resolver(() => Story)
export class StoriesResolver {
	constructor(
		private readonly storiesService: StoriesService,
		private readonly drawingsService: DrawingsService,
	) {}

	@Mutation(() => Story)
	@UseGuards(JwtAuthGuard)
	async createStory(@Context() context, @Args('createStoryInput') createStoryInput: CreateStoryInput) {
		const user = context.req.user;

		return this.storiesService.create(createStoryInput, user);
	}

	@Mutation(() => Drawing)
	@UseGuards(JwtAuthGuard)
	async createDrawing(@Context() context, @Args('createDrawingInput') createDrawingInput: CreateDrawingInput) {
		const user = context.req.user;

		return this.drawingsService.create(createDrawingInput, user);
	}
}
