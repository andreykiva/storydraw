import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/story.entity';
import { DrawingsService } from 'src/drawings/services/drawings.service';
import { CreateStoryInput } from '../dto/create-story.input';
import { User } from 'src/users/entities/user.entity';
import { RepositoryService } from 'src/common/services/repository.service';
import { USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';
import { FavoritesService } from 'src/favorites/services/favorites.service';
import { LikesService } from 'src/likes/services/likes.service';

@Injectable()
export class StoriesService {
	constructor(
		@InjectRepository(Story) private readonly storiesRepository: Repository<Story>,
		private readonly drawingsService: DrawingsService,
		private readonly repositoryService: RepositoryService,
		private readonly favoritesService: FavoritesService,
		private readonly likesService: LikesService,
	) {}

	async create(createStoryInput: CreateStoryInput, user: User): Promise<Story> {
		const newStory = this.storiesRepository.create({
			...createStoryInput,
			user,
		});

		await this.storiesRepository.save(newStory);

		const newDrawing = {
			imageUrl: createStoryInput.drawing.imageUrl,
			storyId: newStory.id,
		};

		await this.drawingsService.create(newDrawing, user);

		return newStory;
	}

	async findAll(): Promise<Story[]> {
		return this.storiesRepository.find({
			order: {
				createdAt: 'DESC',
			},
		});
	}

	async findOneById(id: string): Promise<Story> {
		return this.storiesRepository.findOneBy({ id });
	}

	async getStoryAuthor(storyId: string): Promise<User> {
		const story = await this.storiesRepository.findOne({
			where: {
				id: storyId,
			},
			relations: ['user'],
		});
		return story.user;
	}

	async getUserStories(userId: string): Promise<Story[]> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return this.storiesRepository.find({
			where: {
				user: { id: userId },
			},
		});
	}

	async getFavoriteStories(userId: string): Promise<Story[]> {
		const favorites = await this.favoritesService.getFavorites(userId);
		return favorites.map((favorite) => favorite.story);
	}

	async getLikedStories(userId: string): Promise<Story[]> {
		const likes = await this.likesService.getUserStoryLikes(userId);
		return likes.map((like) => like.story);
	}
}
