import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LikeCreatedEvent } from '../dto/like-created.event';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';

/**
 * Listener for handling like creation events.
 *
 * This class listens for the `like.created` event and creates notifications
 * for users when they receive likes on their content.
 */
@Injectable()
export class LikeCreatedListener {
	constructor(private readonly notificationsService: NotificationsService) {}

	/**
	 * Handles the like created event.
	 *
	 * @param payload - The payload containing the user, initiator, like, and story related to the event.
	 *
	 * This method creates a notification for the user who received the like,
	 * as long as the user is not the same as the initiator of the like action.
	 */
	@OnEvent('like.created')
	async handleLikeCreatedEvent(payload: LikeCreatedEvent) {
		const { user, initiator, like, story } = payload;

		// Prevent self-notification when the user likes their own content
		if (user.id === initiator.id) return;

		await this.notificationsService.create({
			type: NotificationType.LIKE,
			user,
			initiator,
			like,
			story,
		});
	}
}
