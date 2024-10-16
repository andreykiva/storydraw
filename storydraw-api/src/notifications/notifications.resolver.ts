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
import { PUB_SUB } from 'src/common/constants/providers.constants';

/**
 * Resolver for handling notifications related queries and subscriptions.
 */
@Resolver(() => NotificationUnion)
export class NotificationsResolver {
	constructor(
		private readonly notificationsService: NotificationsService,
		@Inject(PUB_SUB) private readonly pubSub: PubSub,
	) {}

	/**
	 * Retrieves all notifications for the authenticated user with optional pagination.
	 *
	 * @param context - The GraphQL execution context containing request information.
	 * @param paginationInput - Optional pagination input for limiting and cursoring results.
	 * @returns A promise that resolves to an array of NotificationUnion or null.
	 */
	@Query(() => [NotificationUnion], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async getAllNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.findAllByUserId(userId, { limit, cursor });
	}

	/**
	 * Retrieves like notifications for the authenticated user with optional pagination.
	 *
	 * @param context - The GraphQL execution context containing request information.
	 * @param paginationInput - Optional pagination input for limiting and cursoring results.
	 * @returns A promise that resolves to an array of LikeNotification or null.
	 */
	@Query(() => [LikeNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async getLikesNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.findLikesNotifications(userId, { limit, cursor });
	}

	/**
	 * Retrieves comment notifications for the authenticated user with optional pagination.
	 *
	 * @param context - The GraphQL execution context containing request information.
	 * @param paginationInput - Optional pagination input for limiting and cursoring results.
	 * @returns A promise that resolves to an array of CommentNotification or null.
	 */
	@Query(() => [CommentNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async getCommentsNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.findCommentsNotifications(userId, { limit, cursor });
	}

	/**
	 * Retrieves mention notifications for the authenticated user with optional pagination.
	 *
	 * @param context - The GraphQL execution context containing request information.
	 * @param paginationInput - Optional pagination input for limiting and cursoring results.
	 * @returns A promise that resolves to an array of MentionNotification or null.
	 */
	@Query(() => [MentionNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async getMentionsNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.findMentionsNotifications(userId, { limit, cursor });
	}

	/**
	 * Retrieves follow notifications for the authenticated user with optional pagination.
	 *
	 * @param context - The GraphQL execution context containing request information.
	 * @param paginationInput - Optional pagination input for limiting and cursoring results.
	 * @returns A promise that resolves to an array of FollowNotification or null.
	 */
	@Query(() => [FollowNotification], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async getFollowsNotifications(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.notificationsService.findFollowsNotifications(userId, { limit, cursor });
	}

	/**
	 * Retrieves the count of new notifications for the authenticated user.
	 *
	 * @param context - The GraphQL execution context containing request information.
	 * @returns A promise that resolves to the count of new notifications.
	 */
	@Query(() => Number)
	@UseGuards(JwtAuthGuard)
	async getNewNotificationsCount(@Context() context) {
		const userId = context.req.user.id;
		return this.notificationsService.getNewNotificationsCount(userId);
	}

	/**
	 * Subscription for receiving updates on new notifications count for the authenticated user.
	 *
	 * @returns An async iterator that emits new notifications count updates.
	 */
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

	/**
	 * Updates the last viewed date of notifications for the authenticated user.
	 *
	 * @param context - The GraphQL execution context containing request information.
	 * @returns A promise that resolves to an UpdateLastViewedDateResponse indicating success.
	 */
	@Mutation(() => UpdateLastViewedDateResponse)
	@UseGuards(JwtAuthGuard)
	async updateLastNotificationsViewed(@Context() context) {
		const userId = context.req.user.id;
		await this.notificationsService.updateLastNotificationsViewed(userId);
		return { success: true };
	}
}
