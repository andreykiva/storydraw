import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, IsNull, LessThan, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
	COMMENT_DELETE_ERROR,
	COMMENT_NOT_FOUND_ERROR,
	STORY_NOT_FOUND_ERROR,
} from 'src/common/constants/errors.constants';
import { Comment } from '../entities/comment.entity';
import { CreateCommentInput, CreateReplyInput } from '../dto/create-comment.input';
import { RepositoryService } from 'src/common/services/repository.service';
import { Story } from 'src/stories/entities/story.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { CommentsServiceInterface } from '../comments.service.interface';

/**
 * Service for managing comments, including creation, retrieval, and deletion.
 */
@Injectable()
export class CommentsService implements CommentsServiceInterface {
	constructor(
		@InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
		private readonly repositoryService: RepositoryService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * Creates a new comment for a specific story.
	 *
	 * @param createCommentInput - Data transfer object containing comment information.
	 * @param user - The user creating the comment.
	 * @returns The created Comment object.
	 */
	async createComment(createCommentInput: CreateCommentInput, user: User): Promise<Comment> {
		const { storyId, content } = createCommentInput;
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const newComment = this.commentsRepository.create({
			content,
			user,
			story,
		});

		const savedComment = await this.commentsRepository.save(newComment);

		this.eventEmitter.emit('comment.created', {
			user: story.user,
			initiator: user,
			comment: savedComment,
			story,
		});

		return savedComment;
	}

	/**
	 * Creates a reply to an existing comment.
	 *
	 * @param createReplyInput - Data transfer object containing reply information.
	 * @param user - The user creating the reply.
	 * @returns The created Reply object.
	 */
	async createReply(createReplyInput: CreateReplyInput, user: User): Promise<Comment> {
		const { commentId, content } = createReplyInput;

		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['story', 'parentComment', 'user'],
		});

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		const newReply = this.commentsRepository.create({
			content,
			user,
			story: comment.story,
			parentComment: comment,
		});

		if (comment.parentComment) {
			newReply.parentComment = comment.parentComment;
			newReply.parentReply = comment;
		}

		const savedReply = await this.commentsRepository.save(newReply);

		this.eventEmitter.emit('comment.created', {
			user: comment.user,
			initiator: user,
			comment: savedReply,
			story: comment.story,
		});

		return savedReply;
	}

	/**
	 * Removes a comment by its ID.
	 *
	 * @param commentId - The ID of the comment to remove.
	 * @param userId - The ID of the user attempting to remove the comment.
	 * @returns The removed Comment object.
	 */
	async remove(commentId: string, userId: string): Promise<Comment> {
		const comment = await this.findOneById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		const commentAuthor = await this.getCommentAuthor(commentId);

		if (commentAuthor.id !== userId) {
			throw new ConflictException(COMMENT_DELETE_ERROR);
		}

		return this.commentsRepository.remove(comment);
	}

	/**
	 * Retrieves the count of comments for a specific story.
	 *
	 * @param storyId - The ID of the story.
	 * @returns The count of comments for the story.
	 */
	async getCommentsCount(storyId: string): Promise<number> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		return this.commentsRepository.count({ where: { story: { id: storyId } } });
	}

	/**
	 * Retrieves the count of replies for a specific comment.
	 *
	 * @param commentId - The ID of the comment.
	 * @returns The count of replies for the comment.
	 */
	async getRepliesCount(commentId: string): Promise<number> {
		const comment = await this.findOneById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		return this.commentsRepository.count({ where: { parentComment: { id: commentId } } });
	}

	/**
	 * Retrieves comments for a specific story with pagination.
	 *
	 * @param storyId - The ID of the story.
	 * @param paginationInput - Pagination parameters.
	 * @returns The list of comments for the story.
	 */
	async getComments(storyId: string, paginationInput: PaginationInput): Promise<Comment[]> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Comment> = {
			story: { id: storyId },
			parentComment: IsNull(),
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.commentsRepository.find({
			order: { createdAt: 'DESC' },
			take: limit,
			where: whereCondition,
		});
	}

	/**
	 * Retrieves replies for a specific comment with pagination.
	 *
	 * @param commentId - The ID of the comment.
	 * @param paginationInput - Pagination parameters.
	 * @returns The list of replies for the comment.
	 */
	async getReplies(commentId: string, paginationInput: PaginationInput): Promise<Comment[]> {
		const comment = await this.findOneById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Comment> = {
			parentComment: { id: commentId },
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.commentsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
		});
	}

	/**
	 * Retrieves the author of a specific comment.
	 *
	 * @param commentId - The ID of the comment.
	 * @returns The User object of the comment's author.
	 */
	async getCommentAuthor(commentId: string): Promise<User> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['user'],
		});

		return comment.user;
	}

	/**
	 * Retrieves the parent comment of a specific comment.
	 *
	 * @param commentId - The ID of the comment.
	 * @returns The parent Comment object.
	 */
	async getParentComment(commentId: string): Promise<Comment> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['parentComment'],
		});

		return comment.parentComment;
	}

	/**
	 * Retrieves the parent reply of a specific comment.
	 *
	 * @param commentId - The ID of the comment.
	 * @returns The parent reply Comment object.
	 */
	async getParenReply(commentId: string): Promise<Comment> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['parentReply'],
		});

		return comment.parentReply;
	}

	/**
	 * Retrieves the story associated with a specific comment.
	 *
	 * @param commentId - The ID of the comment.
	 * @returns The Story object associated with the comment.
	 */
	async getCommentStory(commentId: string): Promise<Story> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['story'],
		});

		return comment.story;
	}

	/**
	 * Finds a comment by its ID.
	 *
	 * @param id - The ID of the comment.
	 * @returns The Comment object or null if not found.
	 */
	async findOneById(id: string): Promise<Comment | null> {
		return this.commentsRepository.findOneBy({ id });
	}
}
