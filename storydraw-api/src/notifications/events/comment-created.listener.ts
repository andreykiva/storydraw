import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../enums/entity-type.enum';
import { CommentCreatedEvent } from '../dto/comment-created.event';
import { MentionsService } from 'src/common/services/mentions.service';
import { StoriesService } from 'src/stories/services/stories.service';

@Injectable()
export class CommentCreatedListener {
	constructor(
		private readonly notificationsService: NotificationsService,
		private readonly mentionsService: MentionsService,
		private readonly eventEmitter: EventEmitter2,
		private readonly storiesService: StoriesService,
	) {}

	@OnEvent('comment.created')
	async handleCommentCreatedEvent(payload: CommentCreatedEvent) {
		const { user, initiator, comment, story } = payload;

		if (user.id !== initiator.id) {
			await this.notificationsService.createNotification({
				type: NotificationType.COMMENT,
				user,
				initiator,
				comment,
				story,
			});
		}

		const storyAuthor = await this.storiesService.getStoryAuthor(story.id);

		if (user.id !== storyAuthor.id && initiator.id !== storyAuthor.id) {
			await this.notificationsService.createNotification({
				type: NotificationType.COMMENT,
				user: storyAuthor,
				initiator,
				comment,
				story,
			});
		}

		const extractMentions = this.mentionsService.extractMentions(comment.content);

		if (extractMentions.length > 0) {
			const mentionedUsers = await this.mentionsService.getMentionedUsers(extractMentions);

			mentionedUsers.forEach((mentionedUser) => {
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
