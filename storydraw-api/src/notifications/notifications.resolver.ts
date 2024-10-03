import { Resolver, Context, Query, Subscription, Mutation, Args } from '@nestjs/graphql';
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
import { PaginationInput } from 'src/common/dto/pagination.dto';

@Resolver(() => NotificationUnion)
export class NotificationsResolver {
	constructor(
		private readonly notificationsService: NotificationsService,
		@Inject('PUB_SUB') private readonly pubSub: PubSub,
	) {}

	@Query(() => [NotificationUnion], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async allNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.getAllNotifications(userId, { limit, cursor });
	}

	@Query(() => [LikeNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async likesNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.getLikesNotifications(userId, { limit, cursor });
	}

	@Query(() => [CommentNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async commentsNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.getCommentsNotifications(userId, { limit, cursor });
	}

	@Query(() => [MentionNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async mentionsNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.getMentionsNotifications(userId, { limit, cursor });
	}

	@Query(() => [FollowNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async followsNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.getFollowsNotifications(userId, { limit, cursor });
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
