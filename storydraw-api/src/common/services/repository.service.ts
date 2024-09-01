import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Repository } from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';

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
	) {}

	async getStoryById(storyId: string): Promise<Story> {
		return this.storiesRepository.findOne({ where: { id: storyId }, relations: ['user'] });
	}

	async getUserById(userId: string): Promise<User> {
		return this.usersRepository.findOneBy({ id: userId });
	}

	async getCommentById(commentId: string): Promise<Comment> {
		return this.commentsRepository.findOneBy({ id: commentId });
	}

	async getLikeById(likeId: string): Promise<Like> {
		return this.likesRepository.findOneBy({ id: likeId });
	}
}
