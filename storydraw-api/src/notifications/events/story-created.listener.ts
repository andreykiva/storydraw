import { Injectable } from '@nestjs/common';
import { MentionsService } from 'src/common/services/mentions.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { StoryCreatedEvent } from '../dto/story-created.event';

/**
 * Listener for handling story creation events.
 *
 * This class listens for the `story.created` event and processes mentions
 * found in the story description, emitting a mention event for each mentioned user.
 */
@Injectable()
export class StoryCreatedListener {
	constructor(
		private readonly mentionsService: MentionsService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * Handles the story created event.
	 *
	 * @param payload - The payload containing the story and the user who created it.
	 *
	 * This method extracts mentions from the story's description and emits
	 * a `mention.created` event for each user that is mentioned, except for the user
	 * who created the story.
	 */
	@OnEvent('story.created')
	async handleStoryCreatedEvent(payload: StoryCreatedEvent) {
		const { story, user } = payload;

		// Extract mentions from the story description
		const extractMentions = this.mentionsService.extractMentions(story.description);

		if (extractMentions.length > 0) {
			// Get the users who were mentioned
			const mentionedUsers = await this.mentionsService.getMentionedUsers(extractMentions);

			// Emit mention events for each mentioned user
			mentionedUsers.forEach((mentionedUser) => {
				// Skip the user who created the story
				if (mentionedUser.id === user.id) return;

				this.eventEmitter.emit('mention.created', {
					user: mentionedUser,
					initiator: user,
					story,
				});
			});
		}
	}
}
