import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, Repository } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import {
	ALREADY_FAVORITED_STORY_ERROR,
	FAVORITE_NOT_FOUND_ERROR,
	STORY_NOT_FOUND_ERROR,
	USER_NOT_FOUND_ERROR,
} from 'src/common/constants/errors.constants';
import { RepositoryService } from 'src/common/services/repository.service';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { FavoritesServiceInterface } from '../favorites.service.interface';

/**
 * Service for managing user favorites for stories.
 */
@Injectable()
export class FavoritesService implements FavoritesServiceInterface {
	constructor(
		@InjectRepository(Favorite) private readonly favoritesRepository: Repository<Favorite>,
		private readonly repositoryService: RepositoryService,
		private readonly usersService: UsersService,
	) {}

	/**
	 * Adds a story to the user's favorites.
	 *
	 * @param storyId - The ID of the story to favorite.
	 * @param user - The user who is adding the favorite.
	 * @returns A Promise resolving to the created Favorite object.
	 * @throws NotFoundException if the story does not exist.
	 * @throws ConflictException if the story has already been favorited by the user.
	 */
	async create(storyId: string, user: User): Promise<Favorite> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const favorite = await this.findOneByStoryIdAndUserId(storyId, user.id);

		if (favorite) {
			throw new ConflictException(ALREADY_FAVORITED_STORY_ERROR);
		}

		const newFavorite = this.favoritesRepository.create({
			user,
			story,
		});

		return this.favoritesRepository.save(newFavorite);
	}

	/**
	 * Removes a story from the user's favorites.
	 *
	 * @param storyId - The ID of the story to remove from favorites.
	 * @param userId - The ID of the user removing the favorite.
	 * @returns A Promise resolving to the removed Favorite object.
	 * @throws NotFoundException if the story or favorite does not exist.
	 */
	async remove(storyId: string, userId: string): Promise<Favorite> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const favorite = await this.findOneByStoryIdAndUserId(storyId, userId);

		if (!favorite) {
			throw new NotFoundException(FAVORITE_NOT_FOUND_ERROR);
		}

		return this.favoritesRepository.remove(favorite);
	}

	/**
	 * Retrieves all favorites for a specified user with pagination.
	 *
	 * @param userId - The ID of the user whose favorites are to be retrieved.
	 * @param paginationInput - Pagination parameters to limit results.
	 * @returns A Promise resolving to an array of Favorite objects.
	 * @throws NotFoundException if the user does not exist.
	 */
	async findAllByUserId(userId: string, paginationInput: PaginationInput): Promise<Favorite[]> {
		const user = await this.usersService.findOneById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Favorite> = {
			user: { id: userId },
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.favoritesRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['story'],
		});
	}

	/**
	 * Retrieves the count of favorites for a specific story.
	 *
	 * @param storyId - The ID of the story for which to count favorites.
	 * @returns A Promise resolving to the count of favorites.
	 * @throws NotFoundException if the story does not exist.
	 */
	async getFavoritesCount(storyId: string): Promise<number> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		return this.favoritesRepository.count({
			where: {
				story: { id: storyId },
			},
		});
	}

	/**
	 * Checks if a user has favorited a specific story.
	 *
	 * @param storyId - The ID of the story to check.
	 * @param userId - The ID of the user to check.
	 * @returns A Promise resolving to a boolean indicating if the story is favorited.
	 * @throws NotFoundException if the story does not exist.
	 */
	async hasFavorited(storyId: string, userId: string): Promise<boolean> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		// const user = await this.usersService.findOneById(userId);

		// if (!user) {
		// 	throw new NotFoundException(USER_NOT_FOUND_ERROR);
		// }

		const favorite = await this.findOneByStoryIdAndUserId(storyId, userId);

		return !!favorite;
	}

	/**
	 * Finds a favorite by story ID and user ID.
	 *
	 * @param storyId - The ID of the story.
	 * @param userId - The ID of the user.
	 * @returns A Promise resolving to the Favorite object or null if not found.
	 */
	async findOneByStoryIdAndUserId(storyId: string, userId: string): Promise<Favorite | null> {
		return this.favoritesRepository.findOne({
			where: {
				story: { id: storyId },
				user: { id: userId },
			},
		});
	}
}
