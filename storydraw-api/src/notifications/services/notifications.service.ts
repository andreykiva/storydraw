import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../entities/notification.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { PUB_SUB } from 'src/common/constants/providers.constants';
import { UserMetadataService } from 'src/user-metadata/services/user-metadata.service';
import { USER_METADATA_NOT_FOUND } from 'src/common/constants/errors.constants';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { NotificationsServiceInterface } from '../notifications.service.interface';

/**
 * Service for managing user notifications, including creation, retrieval, and updates.
 */
@Injectable()
export class NotificationsService implements NotificationsServiceInterface {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationsRepository: Repository<Notification>,
		private readonly userMetadataService: UserMetadataService,
		@Inject(PUB_SUB) private readonly pubSub: PubSub,
	) {}

	/**
	 * Retrieves all notifications for a specific user, with optional pagination.
	 *
	 * @param userId - The ID of the user whose notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of notifications.
	 */
	async findAllByUserId(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Notification> = {
			user: { id: userId },
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.notificationsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['initiator', 'story', 'like', 'comment', 'follow'],
		});
	}

	/**
	 * Retrieves like notifications for a specific user, with optional pagination.
	 *
	 * @param userId - The ID of the user whose like notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of like notifications.
	 */
	async findLikesNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Notification> = {
			user: { id: userId },
			type: NotificationType.LIKE,
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.notificationsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['initiator', 'story', 'like'],
		});
	}

	/**
	 * Retrieves comment notifications for a specific user, with optional pagination.
	 *
	 * @param userId - The ID of the user whose comment notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of comment notifications.
	 */
	async findCommentsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Notification> = {
			user: { id: userId },
			type: NotificationType.COMMENT,
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.notificationsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['initiator', 'story', 'comment'],
		});
	}

	/**
	 * Retrieves mention notifications for a specific user, with optional pagination.
	 *
	 * @param userId - The ID of the user whose mention notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of mention notifications.
	 */
	async findMentionsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Notification> = {
			user: { id: userId },
			type: NotificationType.MENTION,
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.notificationsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['initiator', 'story', 'comment'],
		});
	}

	/**
	 * Retrieves follow notifications for a specific user, with optional pagination.
	 *
	 * @param userId - The ID of the user whose follow notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of follow notifications.
	 */
	async findFollowsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
		const { limit, cursor } = paginationInput;

		const whereCondition: FindOptionsWhere<Notification> = {
			user: { id: userId },
			type: NotificationType.FOLLOW,
		};

		if (cursor) {
			whereCondition.createdAt = LessThan(cursor);
		}

		return this.notificationsRepository.find({
			where: whereCondition,
			order: {
				createdAt: 'DESC',
			},
			take: limit,
			relations: ['initiator', 'follow'],
		});
	}

	/**
	 * Creates a new notification and publishes an event with the updated notifications count.
	 *
	 * @param createNotificationDto - The data transfer object containing notification details.
	 * @returns A promise that resolves to the created notification.
	 */
	async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
		const newNotification = this.notificationsRepository.create(createNotificationDto);
		const savedNotification = await this.notificationsRepository.save(newNotification);

		const newNotificationsCount = await this.getNewNotificationsCount(savedNotification.user.id);

		this.pubSub.publish('newNotificationsCountUpdated', {
			newNotificationsCountUpdated: {
				count: newNotificationsCount,
				userId: savedNotification.user.id,
			},
		});

		return savedNotification;
	}

	/**
	 * Retrieves the count of new notifications for a specific user based on their last viewed date.
	 *
	 * @param userId - The ID of the user whose new notifications count is to be retrieved.
	 * @returns A promise that resolves to the count of new notifications.
	 */
	async getNewNotificationsCount(userId: string): Promise<number> {
		const userMetadata = await this.userMetadataService.findOneByUserId(userId);

		if (!userMetadata) {
			throw new NotFoundException(USER_METADATA_NOT_FOUND);
		}

		const { lastNotificationsViewed } = userMetadata;

		const whereClause = lastNotificationsViewed
			? { user: { id: userId }, createdAt: MoreThan(lastNotificationsViewed) }
			: { user: { id: userId } };

		return this.notificationsRepository.count({
			where: whereClause,
		});
	}

	/**
	 * Updates the last viewed date of notifications for a specific user and publishes an event with updated count.
	 *
	 * @param userId - The ID of the user whose last viewed notifications date is to be updated.
	 * @returns A promise that resolves to a boolean indicating success.
	 */
	async updateLastNotificationsViewed(userId: string): Promise<boolean> {
		await this.userMetadataService.updateLastNotificationsViewed(userId);

		this.pubSub.publish('newNotificationsCountUpdated', {
			newNotificationsCountUpdated: {
				count: 0,
				userId,
			},
		});

		return true;
	}
}
