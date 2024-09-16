import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';
import { FollowCreatedEvent } from '../dto/follow-created.event';

@Injectable()
export class FollowCreatedListener {
	constructor(private readonly notificationsService: NotificationsService) {}

	@OnEvent('follow.created')
	async handleFollowCreatedEvent(payload: FollowCreatedEvent) {
		const { user, initiator, follow } = payload;

		await this.notificationsService.createNotification({
			type: NotificationType.FOLLOW,
			user,
			initiator,
			follow,
		});
	}
}
