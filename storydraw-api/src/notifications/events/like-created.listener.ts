import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LikeCreatedEvent } from '../dto/like-created.event';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';

@Injectable()
export class LikeCreatedListener {
	constructor(private readonly notificationsService: NotificationsService) {}

	@OnEvent('like.created')
	async handleLikeCreatedEvent(payload: LikeCreatedEvent) {
		const { user, initiator, like, story } = payload;

		if (user.id === initiator.id) return;

		await this.notificationsService.createNotification({
			type: NotificationType.LIKE,
			user,
			initiator,
			like,
			story,
		});
	}
}
