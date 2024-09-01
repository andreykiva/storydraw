import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { STORY_NOT_FOUND_ERROR, USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';
import { Share } from '../entities/share.entity';
import { RepositoryService } from 'src/common/services/repository.service';

@Injectable()
export class SharesService {
	constructor(
		@InjectRepository(Share) private readonly sharesRepository: Repository<Share>,
		private readonly repositoryService: RepositoryService,
		private readonly usersService: UsersService,
	) {}

	async share(storyId: string, user: User): Promise<Share> {
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

	async hasShared(storyId: string, userId: string): Promise<boolean> {
		const story = await this.repositoryService.getStoryById(storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		// const user = await this.usersService.findOneById(userId);

		// if (!user) {
		// 	throw new NotFoundException(USER_NOT_FOUND_ERROR);
		// }

		const share = await this.findOne(storyId, userId);

		return !!share;
	}

	async findOne(storyId: string, userId: string): Promise<Share> {
		return this.sharesRepository.findOne({
			where: {
				story: { id: storyId },
				user: { id: userId },
			},
		});
	}
}
