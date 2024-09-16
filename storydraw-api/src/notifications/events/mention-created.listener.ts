import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MentionCreatedEvent } from './../dto/mention-created.event';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';

@Injectable()
export class MentionCreatedListener {
	constructor(private readonly notificationsService: NotificationsService) {}

	@OnEvent('mention.created')
	async handleMentionCreatedEvent(payload: MentionCreatedEvent) {
		await this.notificationsService.createNotification({
			type: NotificationType.MENTION,
			...payload,
		});
	}
}
