import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MentionCreatedEvent } from './../dto/mention-created.event';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';

/**
 * Listener for handling mention creation events.
 *
 * This class listens for the `mention.created` event and creates notifications
 * for users when they are mentioned in comments.
 */
@Injectable()
export class MentionCreatedListener {
	constructor(private readonly notificationsService: NotificationsService) {}

	/**
	 * Handles the mention created event.
	 *
	 * @param payload - The payload containing the user, initiator, comment, and story related to the event.
	 *
	 * This method creates a notification for the user who was mentioned
	 * in a comment, passing the relevant information from the payload.
	 */
	@OnEvent('mention.created')
	async handleMentionCreatedEvent(payload: MentionCreatedEvent) {
		await this.notificationsService.create({
			type: NotificationType.MENTION,
			...payload,
		});
	}
}
