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
import { StoriesServiceInterface } from '../stories.service.interface';

/**
 * Service for managing stories within the application.
 */
@Injectable()
export class StoriesService implements StoriesServiceInterface {
	constructor(
		@InjectRepository(Story) private readonly storiesRepository: Repository<Story>,
		private readonly drawingsService: DrawingsService,
		private readonly repositoryService: RepositoryService,
		private readonly favoritesService: FavoritesService,
		private readonly likesService: LikesService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * Creates a new story and associated drawing.
	 * @param createStoryInput - The input data for creating the story.
	 * @param user - The user creating the story.
	 * @returns The newly created story.
	 */
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

		// Emit an event after the story is created.
		this.eventEmitter.emit('story.created', {
			story: savedStory,
			user,
		});

		// Create the associated drawing for the story.
		await this.drawingsService.create(newDrawing, user);

		return savedStory;
	}

	/**
	 * Retrieves all stories with optional pagination.
	 * @param paginationInput - The pagination input specifying limit and cursor.
	 * @returns An array of stories.
	 */
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

	/**
	 * Retrieves a single story by its ID.
	 * @param id - The ID of the story to retrieve.
	 * @returns The story if found, otherwise null.
	 */
	async findOneById(id: string): Promise<Story | null> {
		return this.storiesRepository.findOneBy({ id });
	}

	/**
	 * Retrieves all stories created by a specific user with optional pagination.
	 * @param userId - The ID of the user whose stories to retrieve.
	 * @param paginationInput - The pagination input specifying limit and cursor.
	 * @returns An array of stories created by the user.
	 * @throws NotFoundException if the user does not exist.
	 */
	async findAllByUserId(userId: string, paginationInput: PaginationInput): Promise<Story[]> {
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

	/**
	 * Retrieves the author of a specific story.
	 * @param storyId - The ID of the story whose author to retrieve.
	 * @returns The user who authored the story.
	 */
	async getStoryAuthor(storyId: string): Promise<User> {
		const story = await this.storiesRepository.findOne({
			where: {
				id: storyId,
			},
			relations: ['user'],
		});

		return story.user;
	}
}
