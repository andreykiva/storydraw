import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './services/favorites.service';
import { AddFavoriteInput } from './dto/add-to-favorites.input';
import { FavoritesCountInput } from './dto/favorites-count.input';
import { FavoritesCountResponse } from './dto/favorites-count-response';
import { RemoveFavoriteResponse } from './dto/remove-favorite-response';

@Resolver(() => Favorite)
export class FavoritesResolver {
	constructor(private readonly favoritesService: FavoritesService) {}

	@Mutation(() => Favorite)
	@UseGuards(JwtAuthGuard)
	async addFavorite(@Context() context, @Args('addFavoriteInput') addFavoriteInput: AddFavoriteInput) {
		const user = context.req.user;
		return this.favoritesService.addFavorite(addFavoriteInput.storyId, user);
	}

	@Mutation(() => RemoveFavoriteResponse)
	@UseGuards(JwtAuthGuard)
	async removeFavorite(@Context() context, @Args('removeFavoriteInput') removeFavoriteInput: AddFavoriteInput) {
		const userId = context.req.user.id;
		await this.favoritesService.removeFavorite(removeFavoriteInput.storyId, userId);
		return { success: true };
	}

	@Query(() => FavoritesCountResponse)
	async favoritesCount(@Args('favoritesCountInput') favoritesCountInput: FavoritesCountInput) {
		const count = await this.favoritesService.getFavoritesCount(favoritesCountInput.storyId);
		return { count };
	}
}
