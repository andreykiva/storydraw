import { Injectable } from '@nestjs/common';
import { MentionsService } from 'src/common/services/mentions.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { StoryCreatedEvent } from '../../stories/dto/story-created.event';

@Injectable()
export class StoryCreatedListener {
	constructor(
		private readonly mentionsService: MentionsService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@OnEvent('story.created')
	async handleStoryCreatedEvent(payload: StoryCreatedEvent) {
		const { story, user } = payload;

		const extractMentions = this.mentionsService.extractMentions(story.description);

		if (extractMentions.length > 0) {
			const mentionedUsers = await this.mentionsService.getMentionedUsers(extractMentions);

			mentionedUsers.forEach((mentionedUser) => {
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
