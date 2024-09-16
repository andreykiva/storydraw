import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
		private readonly repositoryService: RepositoryService,
		private readonly eventEmitter: EventEmitter2,
	) {}

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

	async deleteComment(commentId: string, userId: string): Promise<Comment> {
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

	async getCommentsCount(storyId: string): Promise<number> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		return this.commentsRepository.count({ where: { story: { id: storyId } } });
	}

	async getRepliesCount(commentId: string): Promise<number> {
		const comment = await this.findOneById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		return this.commentsRepository.count({ where: { parentComment: { id: commentId } } });
	}

	async getComments(storyId: string): Promise<Comment[]> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		return this.commentsRepository.find({
			where: {
				story: { id: storyId },
				parentComment: IsNull(),
			},
		});
	}

	async getReplies(commentId: string): Promise<Comment[]> {
		const comment = await this.findOneById(commentId);

		if (!comment) {
			throw new NotFoundException(COMMENT_NOT_FOUND_ERROR);
		}

		return this.commentsRepository.find({ where: { parentComment: { id: commentId } } });
	}

	async getCommentAuthor(commentId: string): Promise<User> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['user'],
		});

		return comment.user;
	}

	async getParentComment(commentId: string): Promise<Comment> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['parentComment'],
		});

		return comment.parentComment;
	}

	async getParenReply(commentId: string): Promise<Comment> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['parentReply'],
		});

		return comment.parentReply;
	}

	async getCommentStory(commentId: string): Promise<Story> {
		const comment = await this.commentsRepository.findOne({
			where: {
				id: commentId,
			},
			relations: ['story'],
		});

		return comment.story;
	}

	async findOneById(id: string): Promise<Comment> {
		return this.commentsRepository.findOneBy({ id });
	}
}
