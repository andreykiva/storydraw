import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from '../entities/notification.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UserMetadataService } from 'src/user-metadata/services/user-metadata.service';
import { USER_METADATA_NOT_FOUND } from 'src/common/constants/errors.constants';

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationsRepository: Repository<Notification>,
		private readonly userMetadataService: UserMetadataService,
		@Inject('PUB_SUB') private readonly pubSub: PubSub,
	) {}

	async getAllNotifications(userId: string): Promise<Notification[]> {
		return this.notificationsRepository.find({
			where: {
				user: { id: userId },
			},
			relations: ['initiator', 'story', 'like', 'comment', 'follow'],
		});
	}

	async getLikesNotifications(userId: string): Promise<Notification[]> {
		return this.notificationsRepository.find({
			where: {
				user: { id: userId },
				type: NotificationType.LIKE,
			},
			relations: ['initiator', 'story', 'like'],
		});
	}

	async getCommentsNotifications(userId: string): Promise<Notification[]> {
		return this.notificationsRepository.find({
			where: {
				user: { id: userId },
				type: NotificationType.COMMENT,
			},
			relations: ['initiator', 'story', 'comment'],
		});
	}

	async getMentionsNotifications(userId: string): Promise<Notification[]> {
		return this.notificationsRepository.find({
			where: {
				user: { id: userId },
				type: NotificationType.MENTION,
			},
			relations: ['initiator', 'story', 'comment'],
		});
	}

	async getFollowsNotifications(userId: string): Promise<Notification[]> {
		return this.notificationsRepository.find({
			where: {
				user: { id: userId },
				type: NotificationType.FOLLOW,
			},
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
		const userMetadata = await this.userMetadataService.getUserMetadata(userId);

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
