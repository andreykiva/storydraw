import { Resolver, Context, Query, Subscription, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-jwt-auth.guard';
import { NotificationsService } from './services/notifications.service';
import {
	CommentNotification,
	FollowNotification,
	LikeNotification,
	MentionNotification,
	NotificationUnion,
} from './types/notification.type';
import { NotificationsCountSubscribe } from './dto/notifications-count.subscribe';
import { UpdateLastViewedDateResponse } from './dto/update-last-viewed-date-response';

@Resolver(() => NotificationUnion)
export class NotificationsResolver {
	constructor(
		private readonly notificationsService: NotificationsService,
		@Inject('PUB_SUB') private readonly pubSub: PubSub,
	) {}

	@Query(() => [NotificationUnion], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async allNotifications(@Context() context) {
		const userId = context.req.user.id;
		return this.notificationsService.getAllNotifications(userId);
	}

	@Query(() => [LikeNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async likesNotifications(@Context() context) {
		const userId = context.req.user.id;
		return this.notificationsService.getLikesNotifications(userId);
	}

	@Query(() => [CommentNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async commentsNotifications(@Context() context) {
		const userId = context.req.user.id;
		return this.notificationsService.getCommentsNotifications(userId);
	}

	@Query(() => [MentionNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async mentionsNotifications(@Context() context) {
		const userId = context.req.user.id;
		return this.notificationsService.getMentionsNotifications(userId);
	}

	@Query(() => [FollowNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async followsNotifications(@Context() context) {
		const userId = context.req.user.id;
		return this.notificationsService.getFollowsNotifications(userId);
	}

	@Query(() => Number)
	@UseGuards(JwtAuthGuard)
	async newNotificationsCount(@Context() context) {
		const userId = context.req.user.id;
		return this.notificationsService.getNewNotificationsCount(userId);
	}

	@Subscription(() => NotificationsCountSubscribe, {
		filter: (payload, variables, context) => {
			const userId = context.req.user.id;
			return payload.newNotificationsCountUpdated.userId === userId;
		},
	})
	@UseGuards(WsJwtAuthGuard)
	newNotificationsCountUpdated() {
		return this.pubSub.asyncIterator('newNotificationsCountUpdated');
	}

	@Mutation(() => UpdateLastViewedDateResponse)
	@UseGuards(JwtAuthGuard)
	async updateLastNotificationsViewed(@Context() context) {
		const userId = context.req.user.id;
		await this.notificationsService.updateLastNotificationsViewed(userId);
		return { success: true };
	}
}
