import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';
import { FollowCreatedEvent } from '../dto/follow-created.event';

/**
 * Listener for handling follow creation events.
 *
 * This class listens for the `follow.created` event and creates notifications
 * for users when they follow someone.
 */
@Injectable()
export class FollowCreatedListener {
	constructor(private readonly notificationsService: NotificationsService) {}

	/**
	 * Handles the follow created event.
	 *
	 * @param payload - The payload containing the user, initiator, and follow related to the event.
	 *
	 * This method creates a notification for the user who has been followed,
	 * including the initiator of the follow action.
	 */
	@OnEvent('follow.created')
	async handleFollowCreatedEvent(payload: FollowCreatedEvent) {
		const { user, initiator, follow } = payload;

		await this.notificationsService.create({
			type: NotificationType.FOLLOW,
			user,
			initiator,
			follow,
		});
	}
}
