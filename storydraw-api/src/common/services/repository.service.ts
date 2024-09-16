import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { In, Repository } from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { Follow } from 'src/follows/entities/follow.entity';

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

	async getStoryById(storyId: string): Promise<Story> {
		return this.storiesRepository.findOne({ where: { id: storyId }, relations: ['user'] });
	}

	async getUserById(userId: string): Promise<User> {
		return this.usersRepository.findOneBy({ id: userId });
	}

	async getUsersByUsernames(usernames: string[]): Promise<User[]> {
		return this.usersRepository.find({
			where: {
				username: In(usernames),
			},
		});
	}

	async getCommentById(commentId: string): Promise<Comment> {
		return this.commentsRepository.findOne({ where: { id: commentId }, relations: ['user', 'story'] });
	}

	async getLikeById(likeId: string): Promise<Like> {
		return this.likesRepository.findOneBy({ id: likeId });
	}

	async getFollowById(followId: string): Promise<Follow> {
		return this.followsRepository.findOneBy({ id: followId });
	}
}
