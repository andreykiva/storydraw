import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
import { User } from 'src/users/entities/user.entity';
import {
	CANNOT_FOLLOW_SELF_ERROR,
	CANNOT_UNFOLLOW_SELF_ERROR,
	USER_NOT_FOUND_ERROR,
} from 'src/common/constants/errors.constants';
import { RepositoryService } from 'src/common/services/repository.service';
import { PaginationInput } from 'src/common/dto/pagination.dto';

@Injectable()
export class FollowsService {
	constructor(
		@InjectRepository(Follow)
		private readonly followsRepository: Repository<Follow>,
		private readonly repositoryService: RepositoryService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async follow(followingUserId: string, follower: User): Promise<Follow> {
		if (followingUserId === follower.id) {
			throw new ConflictException(CANNOT_FOLLOW_SELF_ERROR);
		}

		const followingUser = await this.repositoryService.getUserById(followingUserId);

		if (!followingUser) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const follow = await this.findOne(follower.id, followingUserId);

		if (follow) {
			return follow;
		}

		const newFollow = this.followsRepository.create({
			follower,
			following: followingUser,
		});

		const createdFollow = await this.followsRepository.save(newFollow);

		this.eventEmitter.emit('follow.created', {
			user: followingUser,
			initiator: follower,
			follow: createdFollow,
		});

		return createdFollow;
	}

	async unfollow(unfollowingUserId: string, unfollower: User): Promise<Follow | boolean> {
		if (unfollowingUserId === unfollower.id) {
			throw new ConflictException(CANNOT_UNFOLLOW_SELF_ERROR);
		}

		const unfollowingUser = await this.repositoryService.getUserById(unfollowingUserId);

		if (!unfollowingUser) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const follow = await this.findOne(unfollower.id, unfollowingUserId);

		if (!follow) {
			return true;
		}

		return this.followsRepository.remove(follow);
	}

	async getFollowers(userId: string, paginationInput: PaginationInput): Promise<Follow[]> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Follow> = {
			following: { id: userId },
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.followsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['follower'],
		});
	}

	async getFollowing(userId: string, paginationInput: PaginationInput): Promise<Follow[]> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Follow> = {
			follower: { id: userId },
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.followsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['following'],
		});
	}

	async getFriends(userId: string, paginationInput: PaginationInput): Promise<Follow[]> {
		const { limit, cursor } = paginationInput;

		const friendsQuery = this.followsRepository
			.createQueryBuilder('f1')
			.innerJoinAndSelect('f1.following', 'following')
			.innerJoin('follows', 'f2', 'f1.followerId = f2.followingId AND f1.followingId = f2.followerId')
			.where('f1.followerId = :userId', { userId });

		if (cursor) {
			friendsQuery.andWhere('f1.createdAt < :cursor', { cursor });
		}

		friendsQuery.orderBy('f1.createdAt', 'DESC');
		friendsQuery.take(limit);

		return friendsQuery.getMany();
	}

	async getFollowersCount(userId: string): Promise<number> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return this.followsRepository.count({
			where: {
				following: { id: userId },
			},
		});
	}

	async getFollowingCount(userId: string): Promise<number> {
		const user = await this.repositoryService.getUserById(userId);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		return this.followsRepository.count({
			where: {
				follower: { id: userId },
			},
		});
	}

	async getFriendsCount(userId: string): Promise<number> {
		const friendsCount = await this.followsRepository
			.createQueryBuilder('f1')
			.innerJoin(Follow, 'f2', 'f1.followerId = f2.followingId')
			.where('f1.followingId = :userId', { userId })
			.andWhere('f2.followerId = :userId', { userId })
			.getCount();

		return friendsCount;
	}

	async hasFollowed(followerId: string, followingUserId: string): Promise<boolean> {
		if (followerId === followingUserId) {
			return false;
		}

		const follower = await this.repositoryService.getUserById(followerId);
		const followingUser = await this.repositoryService.getUserById(followingUserId);

		if (!follower || !followingUser) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const follow = await this.findOne(followerId, followingUserId);

		return !!follow;
	}

	async findOne(followerId: string, followingUserId: string): Promise<Follow> {
		return this.followsRepository.findOne({
			where: {
				follower: { id: followerId },
				following: { id: followingUserId },
			},
		});
	}
}
