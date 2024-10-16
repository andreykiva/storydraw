import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';
import { CommentCreatedEvent } from '../dto/comment-created.event';
import { MentionsService } from 'src/common/services/mentions.service';
import { StoriesService } from 'src/stories/services/stories.service';

/**
 * Listener for handling comment creation events.
 *
 * This class listens for the `comment.created` event and handles the
 * creation of notifications related to comments. It notifies users
 * when comments are created and extracts mentions from the comment content.
 */
@Injectable()
export class CommentCreatedListener {
	constructor(
		private readonly notificationsService: NotificationsService,
		private readonly mentionsService: MentionsService,
		private readonly eventEmitter: EventEmitter2,
		private readonly storiesService: StoriesService,
	) {}

	/**
	 * Handles the comment created event.
	 *
	 * @param payload - The payload containing the user, initiator, comment, and story related to the event.
	 *
	 * This method performs the following actions:
	 * - Sends a notification to the user if they are different from the initiator.
	 * - Sends a notification to the story author if they are not the user or initiator.
	 * - Extracts mentions from the comment content and emits a `mention.created` event for each mentioned user.
	 */
	@OnEvent('comment.created')
	async handleCommentCreatedEvent(payload: CommentCreatedEvent) {
		const { user, initiator, comment, story } = payload;

		// Create a notification for the user if they are not the initiator
		if (user.id !== initiator.id) {
			await this.notificationsService.create({
				type: NotificationType.COMMENT,
				user,
				initiator,
				comment,
				story,
			});
		}

		// Get the author of the story
		const storyAuthor = await this.storiesService.getStoryAuthor(story.id);

		// Create a notification for the story author if they are not the user or initiator
		if (user.id !== storyAuthor.id && initiator.id !== storyAuthor.id) {
			await this.notificationsService.create({
				type: NotificationType.COMMENT,
				user: storyAuthor,
				initiator,
				comment,
				story,
			});
		}

		// Extract mentions from the comment content
		const extractMentions = this.mentionsService.extractMentions(comment.content);

		// If mentions are found, emit a mention.created event for each mentioned user
		if (extractMentions.length > 0) {
			const mentionedUsers = await this.mentionsService.getMentionedUsers(extractMentions);

			mentionedUsers.forEach((mentionedUser) => {
				// Skip emitting an event for the initiator
				if (mentionedUser.id === initiator.id) return;

				this.eventEmitter.emit('mention.created', {
					user: mentionedUser,
					initiator: initiator,
					comment,
					story,
				});
			});
		}
	}
}
