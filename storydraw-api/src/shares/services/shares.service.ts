import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { STORY_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';
import { Share } from '../entities/share.entity';
import { RepositoryService } from 'src/common/services/repository.service';
import { SharesServiceInterface } from '../shares.service.interface';

/**
 * Service for managing shares of stories.
 */
@Injectable()
export class SharesService implements SharesServiceInterface {
	constructor(
		@InjectRepository(Share) private readonly sharesRepository: Repository<Share>,
		private readonly repositoryService: RepositoryService,
	) {}

	/**
	 * Creates a new share for the specified story by the user.
	 *
	 * @param storyId - The ID of the story to be shared.
	 * @param user - The user sharing the story.
	 * @returns A Promise resolving to the newly created Share object.
	 * @throws NotFoundException if the story with the specified ID does not exist.
	 */
	async create(storyId: string, user: User): Promise<Share> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const newShare = this.sharesRepository.create({
			user,
			story,
		});

		return this.sharesRepository.save(newShare);
	}

	/**
	 * Retrieves the total number of shares for the specified story.
	 *
	 * @param storyId - The ID of the story for which to count shares.
	 * @returns A Promise resolving to the number of shares for the story.
	 * @throws NotFoundException if the story with the specified ID does not exist.
	 */
	async getSharesCount(storyId: string): Promise<number> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		return this.sharesRepository.count({
			where: {
				story: { id: storyId },
			},
		});
	}

	/**
	 * Checks if the specified user has shared the given story.
	 *
	 * @param storyId - The ID of the story to check.
	 * @param userId - The ID of the user to check.
	 * @returns A Promise resolving to a boolean indicating whether the user has shared the story.
	 * @throws NotFoundException if the story with the specified ID does not exist.
	 */
	async hasShared(storyId: string, userId: string): Promise<boolean> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		// const user = await this.usersService.findOneById(userId);

		// if (!user) {
		// 	throw new NotFoundException(USER_NOT_FOUND_ERROR);
		// }

		const share = await this.findOneByStoryIdAndUserId(storyId, userId);

		return !!share;
	}

	/**
	 * Finds a share entry associated with the specified story ID and user ID.
	 *
	 * @param storyId - The ID of the story to check for shares.
	 * @param userId - The ID of the user whose share entry is to be retrieved.
	 * @returns A Promise resolving to the found Share object or null if not found.
	 */
	async findOneByStoryIdAndUserId(storyId: string, userId: string): Promise<Share | null> {
		return this.sharesRepository.findOne({
			where: {
				story: { id: storyId },
				user: { id: userId },
			},
		});
	}
}
