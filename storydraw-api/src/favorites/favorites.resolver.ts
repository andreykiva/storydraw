import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './services/favorites.service';
import { AddFavoriteInput } from './dto/add-to-favorites.input';
import { GetFavoritesCountInput } from './dto/get-favorites-count.input';
import { FavoritesCountResponse } from './dto/favorites-count-response';
import { RemoveFavoriteResponse } from './dto/remove-favorite-response';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { GetUserFavoritesInput } from './dto/get-user-favorites.input';

/**
 * Resolver for handling operations related to user favorites.
 */
@Resolver(() => Favorite)
export class FavoritesResolver {
	constructor(private readonly favoritesService: FavoritesService) {}

	/**
	 * Adds a story to the user's favorites.
	 *
	 * @param context - The GraphQL context containing the request object.
	 * @param addFavoriteInput - The input data for adding a favorite story.
	 * @returns A Promise resolving to the newly created Favorite object.
	 */
	@Mutation(() => Favorite)
	@UseGuards(JwtAuthGuard)
	async addFavorite(@Context() context, @Args('addFavoriteInput') addFavoriteInput: AddFavoriteInput) {
		const user = context.req.user;
		return this.favoritesService.create(addFavoriteInput.storyId, user);
	}

	/**
	 * Removes a story from the user's favorites.
	 *
	 * @param context - The GraphQL context containing the request object.
	 * @param removeFavoriteInput - The input data for removing a favorite story.
	 * @returns A Promise resolving to a response object indicating success.
	 */
	@Mutation(() => RemoveFavoriteResponse)
	@UseGuards(JwtAuthGuard)
	async removeFavorite(@Context() context, @Args('removeFavoriteInput') removeFavoriteInput: AddFavoriteInput) {
		const userId = context.req.user.id;
		await this.favoritesService.remove(removeFavoriteInput.storyId, userId);
		return { success: true };
	}

	/**
	 * Retrieves all favorite stories for a specified user, with optional pagination.
	 *
	 * @param getUserFavoritesInput - The input data containing the user ID.
	 * @param paginationInput - Optional pagination parameters.
	 * @returns A Promise resolving to an array of Favorite objects.
	 */
	@Query(() => [Favorite])
	async getUserFavorites(
		@Args('getUserFavoritesInput') getUserFavoritesInput: GetUserFavoritesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.favoritesService.findAllByUserId(getUserFavoritesInput.userId, { limit, cursor });
	}

	/**
	 * Retrieves the count of favorites for a specific story.
	 *
	 * @param getFavoritesCountInput - The input data containing the story ID.
	 * @returns A Promise resolving to an object containing the count of favorites.
	 */
	@Query(() => FavoritesCountResponse)
	async getFavoritesCount(@Args('getFavoritesCountInput') getFavoritesCountInput: GetFavoritesCountInput) {
		const count = await this.favoritesService.getFavoritesCount(getFavoritesCountInput.storyId);
		return { count };
	}
}
