import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import {
	COMMENT_NOT_FOUND_ERROR,
	STORY_NOT_FOUND_ERROR,
	USER_NOT_FOUND_ERROR,
} from 'src/common/constants/errors.constants';
import { EntityType } from '../enums/entity-type.enum';
import { RepositoryService } from 'src/common/services/repository.service';
import { Story } from 'src/stories/entities/story.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { LikesServiceInterface } from '../likes.service.interface';

/**
 * Service for managing likes on stories and comments, including creation, retrieval, and deletion.
 */
@Injectable()
export class LikesService implements LikesServiceInterface {
	constructor(
		@InjectRepository(Like)
		private readonly likesRepository: Repository<Like>,
		private readonly repositoryService: RepositoryService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * Creates a like for a story by a user.
	 * @param storyId - The ID of the story to be liked.
	 * @param user - The user who is liking the story.
	 * @returns The created Like object.
	 */
	async createStoryLike(storyId: string, user: User): Promise<Like> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const existingLike = await this.findStoryLike(storyId, user.id);

		if (existingLike) {
			return existingLike;
		}

		const newLike = this.likesRepository.create({
			entityType: EntityType.STORY,
			user,
			story,
		});

		const createdLike = await this.likesRepository.save(newLike);

		// Emit an event after creating a like
		this.eventEmitter.emit('like.created', {
			user: story.user,
			initiator: user,
			like: createdLike,
			story,
		});

		return createdLike;
	}

	/**
	 * Creates a like for a comment by a user.
	 * @param commentId - The ID of the comment to be liked.
	 * @param user - The user who is liking the comment.
	 * @returns The created Like object.
	 */
	async createCommentLike(commentId: string, user: User): Promise<Like> {
		const comment = await this.repositoryService.getCommentById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		const existingLike = await this.findCommentLike(commentId, user.id);

		if (existingLike) {
			return existingLike;
		}

		const newLike = this.likesRepository.create({
			entityType: EntityType.COMMENT,
			user,
			comment,
		});

		const createdLike = await this.likesRepository.save(newLike);

		// Emit an event after creating a like
		this.eventEmitter.emit('like.created', {
			user: comment.user,
			initiator: user,
			like: createdLike,
			story: comment.story,
		});

		return createdLike;
	}

	/**
	 * Removes a like from a story.
	 * @param storyId - The ID of the story to remove the like from.
	 * @param userId - The ID of the user who unlikes the story.
	 * @returns A boolean indicating whether the like was successfully removed.
	 */
	async removeStoryLike(storyId: string, userId: string): Promise<Like | boolean> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const like = await this.findStoryLike(storyId, userId);

		if (!like) {
			return true;
		}

		return this.likesRepository.remove(like);
	}

	/**
	 * Removes a like from a comment.
	 * @param commentId - The ID of the comment to remove the like from.
	 * @param userId - The ID of the user who unlikes the comment.
	 * @returns A boolean indicating whether the like was successfully removed.
	 */
	async removeCommentLike(commentId: string, userId: string): Promise<Like | boolean> {
		const comment = await this.repositoryService.getCommentById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		const like = await this.findCommentLike(commentId, userId);

		if (!like) {
			return true;
		}

		return this.likesRepository.remove(like);
	}

	/**
	 * Finds a like for a story based on storyId and userId.
	 * @param storyId - The ID of the story.
	 * @param userId - The ID of the user.
	 * @returns The found Like object or null if not found.
	 */
	async findStoryLike(storyId: string, userId: string): Promise<Like | null> {
		return this.likesRepository.findOne({
			where: {
				entityType: EntityType.STORY,
				story: { id: storyId },
				user: { id: userId },
			},
		});
	}

	/**
	 * Finds a like for a comment based on commentId and userId.
	 * @param commentId - The ID of the comment.
	 * @param userId - The ID of the user.
	 * @returns The found Like object or null if not found.
	 */
	async findCommentLike(commentId: string, userId: string): Promise<Like | null> {
		return this.likesRepository.findOne({
			where: {
				entityType: EntityType.COMMENT,
				comment: { id: commentId },
				user: { id: userId },
			},
		});
	}

	/**
	 * Counts the number of likes for a story.
	 * @param storyId - The ID of the story.
	 * @returns The count of likes for the story.
	 */
	async getStoryLikesCount(storyId: string): Promise<number> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		return this.likesRepository.count({
			where: {
				entityType: EntityType.STORY,
				story: {
					id: storyId,
				},
			},
		});
	}

	/**
	 * Counts the number of likes for a comment.
	 * @param commentId - The ID of the comment.
	 * @returns The count of likes for the comment.
	 */
	async getCommentLikesCount(commentId: string): Promise<number> {
		const comment = await this.repositoryService.getCommentById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		return this.likesRepository.count({
			where: {
				entityType: EntityType.COMMENT,
				comment: {
					id: commentId,
				},
			},
		});
	}

	/**
	 * Counts the total number of likes by a user.
	 * @param userId - The ID of the user.
	 * @returns The count of likes made by the user.
	 */
	async getUserLikesCount(userId: string): Promise<number> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return this.likesRepository.count({
			where: {
				entityType: EntityType.STORY,
				user: {
					id: user.id,
				},
			},
		});
	}

	/**
	 * Checks if a user has liked a specific story.
	 * @param storyId - The ID of the story.
	 * @param userId - The ID of the user.
	 * @returns A boolean indicating if the story has been liked by the user.
	 */
	async hasStoryLiked(storyId: string, userId: string): Promise<boolean> {
		const like = await this.findStoryLike(storyId, userId);
		return !!like;
	}

	/**
	 * Checks if a user has liked a specific comment.
	 * @param commentId - The ID of the comment.
	 * @param userId - The ID of the user.
	 * @returns A boolean indicating if the comment has been liked by the user.
	 */
	async hasCommentLiked(commentId: string, userId: string): Promise<boolean> {
		const like = await this.findCommentLike(commentId, userId);
		return !!like;
	}

	/**
	 * Retrieves the likes made by a user for stories with pagination support.
	 * @param userId - The ID of the user.
	 * @param paginationInput - The pagination input containing limit and cursor.
	 * @returns An array of Like objects.
	 */
	async getUserStoryLikes(userId: string, paginationInput: PaginationInput): Promise<Like[]> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Like> = {
			entityType: EntityType.STORY,
			user: { id: userId },
		};

		// Add pagination cursor if provided
		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.likesRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['story'],
		});
	}

	/**
	 * Retrieves the story associated with a specific like.
	 * @param likeId - The ID of the like.
	 * @returns The Story object associated with the like.
	 */
	async getLikedStory(likeId: string): Promise<Story> {
		const like = await this.likesRepository.findOne({
			where: {
				id: likeId,
			},
			relations: ['story'],
		});

		return like.story;
	}

	/**
	 * Retrieves the comment associated with a specific like.
	 * @param likeId - The ID of the like.
	 * @returns The Comment object associated with the like.
	 */
	async getLikedComment(likeId: string): Promise<Comment> {
		const like = await this.likesRepository.findOne({
			where: {
				id: likeId,
			},
			relations: ['comment'],
		});

		return like.comment;
	}

	/**
	 * Retrieves the user who created a specific like.
	 * @param likeId - The ID of the like.
	 * @returns The User object who created the like.
	 */
	async getLikeUser(likeId: string): Promise<User> {
		const like = await this.likesRepository.findOne({
			where: {
				id: likeId,
			},
			relations: ['user'],
		});

		return like.user;
	}
}
