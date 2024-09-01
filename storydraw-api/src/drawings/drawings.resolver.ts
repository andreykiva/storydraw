import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Drawing } from './entities/drawing.entity';
import { DrawingsService } from './services/drawings.service';
import { CreateDrawingInput } from './dto/create-drawing.input';

@Resolver(() => Drawing)
export class DrawingsResolver {
	constructor(private readonly drawingsService: DrawingsService) {}

	@Mutation(() => Drawing)
	@UseGuards(JwtAuthGuard)
	async createDrawing(@Context() context, @Args('createDrawingInput') createDrawingInput: CreateDrawingInput) {
		const user = context.req.user;

		return this.drawingsService.create(createDrawingInput, user);
	}
}
