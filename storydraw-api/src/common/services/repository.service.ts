import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { In, Repository } from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { Follow } from 'src/follows/entities/follow.entity';

/**
 * Service for managing database interactions for stories, users, comments, likes, and follows.
 * This service abstracts the access to the repositories for various entities.
 */
@Injectable()
export class RepositoryService {
	constructor(
		@InjectRepository(Story)
		private readonly storiesRepository: Repository<Story>,
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		@InjectRepository(Comment)
		private readonly commentsRepository: Repository<Comment>,
		@InjectRepository(Like)
		private readonly likesRepository: Repository<Like>,
		@InjectRepository(Follow)
		private readonly followsRepository: Repository<Follow>,
	) {}

	/**
	 * Retrieves a story by its ID.
	 *
	 * @param storyId - The ID of the story to retrieve.
	 * @returns A promise that resolves to the Story entity, including its user relation.
	 */
	async getStoryById(storyId: string): Promise<Story> {
		return this.storiesRepository.findOne({ where: { id: storyId }, relations: ['user'] });
	}

	/**
	 * Retrieves a user by their ID.
	 *
	 * @param userId - The ID of the user to retrieve.
	 * @returns A promise that resolves to the User entity.
	 */
	async getUserById(userId: string): Promise<User> {
		return this.usersRepository.findOneBy({ id: userId });
	}

	/**
	 * Retrieves users by their usernames.
	 *
	 * @param usernames - An array of usernames to look for.
	 * @returns A promise that resolves to an array of User entities matching the given usernames.
	 */
	async getUsersByUsernames(usernames: string[]): Promise<User[]> {
		return this.usersRepository.find({
			where: {
				username: In(usernames),
			},
		});
	}

	/**
	 * Retrieves a comment by its ID.
	 *
	 * @param commentId - The ID of the comment to retrieve.
	 * @returns A promise that resolves to the Comment entity, including its user and story relations.
	 */
	async getCommentById(commentId: string): Promise<Comment> {
		return this.commentsRepository.findOne({ where: { id: commentId }, relations: ['user', 'story'] });
	}

	/**
	 * Retrieves a like by its ID.
	 *
	 * @param likeId - The ID of the like to retrieve.
	 * @returns A promise that resolves to the Like entity.
	 */
	async getLikeById(likeId: string): Promise<Like> {
		return this.likesRepository.findOneBy({ id: likeId });
	}

	/**
	 * Retrieves a follow by its ID.
	 *
	 * @param followId - The ID of the follow relationship to retrieve.
	 * @returns A promise that resolves to the Follow entity.
	 */
	async getFollowById(followId: string): Promise<Follow> {
		return this.followsRepository.findOneBy({ id: followId });
	}
}
