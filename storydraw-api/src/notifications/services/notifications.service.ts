import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { RepositoryService } from 'src/common/services/repository.service';

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationsRepository: Repository<Notification>,
		private readonly repositoryService: RepositoryService,
	) {}

	async getNotifications(type: NotificationType, userId: string): Promise<Notification[]> {
		return this.notificationsRepository.find({
			where: {
				user: { id: userId },
			},
			relations: ['like'],
		});
	}

	async createNotification(createNotificationDto: CreateNotificationDto) {
		const { type, user, entityId } = createNotificationDto;

		const notification = this.notificationsRepository.create({
			type,
			user,
		});

		if (type === NotificationType.LIKE) {
			const like = await this.repositoryService.getLikeById(entityId);

			notification.like = like;
		}

		return this.notificationsRepository.save(notification);
	}
}
