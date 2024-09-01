import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

@Injectable()
export class FavoritesService {
	constructor(
		@InjectRepository(Favorite) private readonly favoritesRepository: Repository<Favorite>,
		private readonly repositoryService: RepositoryService,
		private readonly usersService: UsersService,
	) {}

	async addFavorite(storyId: string, user: User): Promise<Favorite> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const favorite = await this.findOne(storyId, user.id);

		if (favorite) {
			throw new ConflictException(ALREADY_FAVORITED_STORY_ERROR);
		}

		const newFavorite = this.favoritesRepository.create({
			user,
			story,
		});

		return this.favoritesRepository.save(newFavorite);
	}

	async removeFavorite(storyId: string, userId: string): Promise<Favorite> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const favorite = await this.findOne(storyId, userId);

		if (!favorite) {
			throw new NotFoundException(FAVORITE_NOT_FOUND_ERROR);
		}

		return this.favoritesRepository.remove(favorite);
	}

	async getFavorites(userId: string): Promise<Favorite[]> {
		const user = await this.usersService.findOneById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return this.favoritesRepository.find({
			where: {
				user: { id: userId },
			},
			relations: ['story'],
		});
	}

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

	async hasFavorited(storyId: string, userId: string): Promise<boolean> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		// const user = await this.usersService.findOneById(userId);

		// if (!user) {
		// 	throw new NotFoundException(USER_NOT_FOUND_ERROR);
		// }

		const favorite = await this.findOne(storyId, userId);

		return !!favorite;
	}

	async findOne(storyId: string, userId: string): Promise<Favorite> {
		return this.favoritesRepository.findOne({
			where: {
				story: { id: storyId },
				user: { id: userId },
			},
		});
	}
}
