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
import { FollowsServiceInterface } from '../follows.service.interface';

/**
 * Service for managing user follow relationships.
 */
@Injectable()
export class FollowsService implements FollowsServiceInterface {
	constructor(
		@InjectRepository(Follow)
		private readonly followsRepository: Repository<Follow>,
		private readonly repositoryService: RepositoryService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * Creates a new follow relationship.
	 *
	 * @param followingUserId - The ID of the user to be followed.
	 * @param follower - The user who is following.
	 * @returns The created Follow entity.
	 * @throws ConflictException if a user tries to follow themselves.
	 * @throws NotFoundException if the user to be followed does not exist.
	 */
	async create(followingUserId: string, follower: User): Promise<Follow> {
		if (followingUserId === follower.id) {
			throw new ConflictException(CANNOT_FOLLOW_SELF_ERROR);
		}

		const followingUser = await this.repositoryService.getUserById(followingUserId);

		if (!followingUser) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const follow = await this.findOneByFollowerAndFollowing(follower.id, followingUserId);

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

	/**
	 * Removes an existing follow relationship.
	 *
	 * @param unfollowingUserId - The ID of the user to be unfollowed.
	 * @param unfollower - The user who is unfollowing.
	 * @returns The removed Follow entity or true if it didn't exist.
	 * @throws ConflictException if a user tries to unfollow themselves.
	 * @throws NotFoundException if the user to be unfollowed does not exist.
	 */
	async remove(unfollowingUserId: string, unfollower: User): Promise<Follow | boolean> {
		if (unfollowingUserId === unfollower.id) {
			throw new ConflictException(CANNOT_UNFOLLOW_SELF_ERROR);
		}

		const unfollowingUser = await this.repositoryService.getUserById(unfollowingUserId);

		if (!unfollowingUser) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const follow = await this.findOneByFollowerAndFollowing(unfollower.id, unfollowingUserId);

		if (!follow) {
			return true;
		}

		return this.followsRepository.remove(follow);
	}

	/**
	 * Retrieves all followers of a user.
	 *
	 * @param userId - The ID of the user whose followers are to be retrieved.
	 * @param paginationInput - Pagination parameters (limit and cursor).
	 * @returns A list of Follow entities representing the followers.
	 * @throws NotFoundException if the user does not exist.
	 */
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

	/**
	 * Retrieves all users that a specified user is following.
	 *
	 * @param userId - The ID of the user whose following list is to be retrieved.
	 * @param paginationInput - Pagination parameters (limit and cursor).
	 * @returns A list of Follow entities representing the following users.
	 * @throws NotFoundException if the user does not exist.
	 */
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

	/**
	 * Retrieves friends of a user, i.e., users who follow each other.
	 *
	 * @param userId - The ID of the user whose friends are to be retrieved.
	 * @param paginationInput - Pagination parameters (limit and cursor).
	 * @returns A list of Follow entities representing mutual follow relationships.
	 */
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

	/**
	 * Counts the number of followers for a specified user.
	 *
	 * @param userId - The ID of the user whose follower count is to be retrieved.
	 * @returns The number of followers.
	 * @throws NotFoundException if the user does not exist.
	 */
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

	/**
	 * Counts the number of users that a specified user is following.
	 *
	 * @param userId - The ID of the user whose following count is to be retrieved.
	 * @returns The number of users followed.
	 * @throws NotFoundException if the user does not exist.
	 */
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

	/**
	 * Counts the number of mutual friends for a specified user.
	 *
	 * @param userId - The ID of the user whose friends count is to be retrieved.
	 * @returns The number of mutual friends.
	 */
	async getFriendsCount(userId: string): Promise<number> {
		const friendsCount = await this.followsRepository
			.createQueryBuilder('f1')
			.innerJoin(Follow, 'f2', 'f1.followerId = f2.followingId')
			.where('f1.followingId = :userId', { userId })
			.andWhere('f2.followerId = :userId', { userId })
			.getCount();

		return friendsCount;
	}

	/**
	 * Checks if a follower has followed a specific user.
	 *
	 * @param followerId - The ID of the user who is following.
	 * @param followingUserId - The ID of the user being followed.
	 * @returns True if the follower has followed the user, otherwise false.
	 */
	async hasFollowed(followerId: string, followingUserId: string): Promise<boolean> {
		if (followerId === followingUserId) {
			return false;
		}

		const follower = await this.repositoryService.getUserById(followerId);
		const followingUser = await this.repositoryService.getUserById(followingUserId);

		if (!follower || !followingUser) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}

		const follow = await this.findOneByFollowerAndFollowing(followerId, followingUserId);

		return !!follow;
	}

	/**
	 * Finds a follow relationship by follower and following user IDs.
	 *
	 * @param followerId - The ID of the follower.
	 * @param followingUserId - The ID of the user being followed.
	 * @returns The Follow entity or null if not found.
	 */
	async findOneByFollowerAndFollowing(followerId: string, followingUserId: string): Promise<Follow | null> {
		return this.followsRepository.findOne({
			where: {
				follower: { id: followerId },
				following: { id: followingUserId },
			},
		});
	}
}
