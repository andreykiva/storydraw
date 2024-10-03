import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, Repository } from 'typeorm';
import { Story } from '../entities/story.entity';
import { DrawingsService } from 'src/drawings/services/drawings.service';
import { CreateStoryInput } from '../dto/create-story.input';
import { User } from 'src/users/entities/user.entity';
import { RepositoryService } from 'src/common/services/repository.service';
import { USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';
import { FavoritesService } from 'src/favorites/services/favorites.service';
import { LikesService } from 'src/likes/services/likes.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationInput } from 'src/common/dto/pagination.dto';

@Injectable()
export class StoriesService {
	constructor(
		@InjectRepository(Story) private readonly storiesRepository: Repository<Story>,
		private readonly drawingsService: DrawingsService,
		private readonly repositoryService: RepositoryService,
		private readonly favoritesService: FavoritesService,
		private readonly likesService: LikesService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async create(createStoryInput: CreateStoryInput, user: User): Promise<Story> {
		const newStory = this.storiesRepository.create({
			...createStoryInput,
			user,
		});

		const savedStory = await this.storiesRepository.save(newStory);

		const newDrawing = {
			imageUrl: createStoryInput.drawing.imageUrl,
			storyId: savedStory.id,
		};

		this.eventEmitter.emit('story.created', {
			story: savedStory,
			user,
		});

		await this.drawingsService.create(newDrawing, user);

		return savedStory;
	}

	async findAll(paginationInput: PaginationInput): Promise<Story[]> {
		const { limit, cursor } = paginationInput;
		const whereCondition = cursor ? { createdAt: LessThan(cursor) } : {};

		return this.storiesRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
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

	async getUserStories(userId: string, paginationInput: PaginationInput): Promise<Story[]> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Story> = {
			user: { id: userId },
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.storiesRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
		});
	}
}
