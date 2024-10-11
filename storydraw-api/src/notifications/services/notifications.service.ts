import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../entities/notification.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { PUB_SUB, USER_METADATA_SERVICE } from 'src/common/constants/providers.constants';
import { UserMetadataServiceInterface } from 'src/user-metadata/user-metadata.service.interface';
import { USER_METADATA_NOT_FOUND } from 'src/common/constants/errors.constants';
import { PaginationInput } from 'src/common/dto/pagination.dto';

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationsRepository: Repository<Notification>,
		@Inject(USER_METADATA_SERVICE) private readonly userMetadataService: UserMetadataServiceInterface,
		@Inject(PUB_SUB) private readonly pubSub: PubSub,
	) {}

	async getAllNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
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

	async getLikesNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
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

	async getCommentsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
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

	async getMentionsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
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

	async getFollowsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]> {
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

	async createNotification(createNotificationDto: CreateNotificationDto) {
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
