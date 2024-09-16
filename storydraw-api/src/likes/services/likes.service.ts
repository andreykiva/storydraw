import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import {
	COMMENT_NOT_FOUND_ERROR,
	STORY_NOT_FOUND_ERROR,
	LIKE_NOT_FOUND_ERROR,
	ALREADY_LIKED_STORY_ERROR,
	ALREADY_LIKED_COMMENT_ERROR,
	USER_NOT_FOUND_ERROR,
} from 'src/common/constants/errors.constants';
import { EntityType } from '../enums/entity-type.enum';
import { RepositoryService } from 'src/common/services/repository.service';
import { Story } from 'src/stories/entities/story.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class LikesService {
	constructor(
		@InjectRepository(Like)
		private readonly likesRepository: Repository<Like>,
		private readonly repositoryService: RepositoryService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async likeStory(storyId: string, user: User): Promise<Like> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const like = await this.findStoryLike(storyId, user.id);

		if (like) {
			throw new ConflictException(ALREADY_LIKED_STORY_ERROR);
		}

		const newLike = this.likesRepository.create({
			entityType: EntityType.STORY,
			user,
			story,
		});

		const createdLike = await this.likesRepository.save(newLike);

		this.eventEmitter.emit('like.created', {
			user: story.user,
			initiator: user,
			like: createdLike,
			story,
		});

		return createdLike;
	}

	async likeComment(commentId: string, user: User): Promise<Like> {
		const comment = await this.repositoryService.getCommentById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		const like = await this.findCommentLike(commentId, user.id);

		if (like) {
			throw new ConflictException(ALREADY_LIKED_COMMENT_ERROR);
		}

		const newLike = this.likesRepository.create({
			entityType: EntityType.COMMENT,
			user,
			comment,
		});

		const createdLike = await this.likesRepository.save(newLike);

		this.eventEmitter.emit('like.created', {
			user: comment.user,
			initiator: user,
			like: createdLike,
			story: comment.story,
		});

		return this.likesRepository.save(createdLike);
	}

	async unlikeStory(storyId: string, userId: string): Promise<Like> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const like = await this.findStoryLike(storyId, userId);

		if (!like) {
			throw new NotFoundException(LIKE_NOT_FOUND_ERROR);
		}

		return this.likesRepository.remove(like);
	}

	async unlikeComment(commentId: string, userId: string): Promise<Like> {
		const comment = await this.repositoryService.getCommentById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		const like = await this.findCommentLike(commentId, userId);

		if (!like) {
			throw new NotFoundException(LIKE_NOT_FOUND_ERROR);
		}

		return this.likesRepository.remove(like);
	}

	async findStoryLike(storyId: string, userId: string): Promise<Like> {
		return this.likesRepository.findOne({
			where: {
				entityType: EntityType.STORY,
				story: { id: storyId },
				user: { id: userId },
			},
		});
	}

	async findCommentLike(commentId: string, userId: string): Promise<Like> {
		return this.likesRepository.findOne({
			where: {
				entityType: EntityType.COMMENT,
				comment: { id: commentId },
				user: { id: userId },
			},
		});
	}

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

	async hasStoryLiked(storyId: string, userId: string): Promise<boolean> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const like = await this.findStoryLike(storyId, userId);

		return !!like;
	}

	async hasCommentLiked(commentId: string, userId: string): Promise<boolean> {
		// const comment = await this.repositoryService.getCommentById(commentId);

		// if (!comment) {
		// 	throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		// }

		const like = await this.findCommentLike(commentId, userId);

		return !!like;
	}

	async getUserStoryLikes(userId: string): Promise<Like[]> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return this.likesRepository.find({
			where: {
				entityType: EntityType.STORY,
				user: { id: userId },
			},
			relations: ['story'],
		});
	}

	async getLikedStory(likeId: string): Promise<Story> {
		const like = await this.likesRepository.findOne({
			where: {
				id: likeId,
			},
			relations: ['story'],
		});

		return like.story;
	}

	async getLikedComment(likeId: string): Promise<Comment> {
		const like = await this.likesRepository.findOne({
			where: {
				id: likeId,
			},
			relations: ['comment'],
		});

		return like.comment;
	}

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
