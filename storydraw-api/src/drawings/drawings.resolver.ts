import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Drawing } from './entities/drawing.entity';
import { CreateDrawingInput } from './dto/create-drawing.input';
import { DrawingsService } from './services/drawings.service';

/**
 * Resolver for GraphQL queries and mutations related to drawings.
 */
@Resolver(() => Drawing)
export class DrawingsResolver {
	constructor(private readonly drawingsService: DrawingsService) {}

	/**
	 * Creates a new drawing associated with a specific story.
	 *
	 * @param context - The GraphQL context containing the request object, which includes user information.
	 * @param createDrawingInput - Input data for creating the drawing, including the story ID and image URL.
	 * @returns A Promise resolving to the newly created Drawing object.
	 */
	@Mutation(() => Drawing)
	@UseGuards(JwtAuthGuard)
	async createDrawing(@Context() context, @Args('createDrawingInput') createDrawingInput: CreateDrawingInput) {
		const user = context.req.user;

		return this.drawingsService.create(createDrawingInput, user);
	}
}
