import { Resolver, Context, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NotificationsService } from './services/notifications.service';
import { GetNotificationsInput } from './dto/get-notifications.input';
import { NotificationUnion } from './types/notification.type';

@Resolver(() => NotificationUnion)
export class NotificationsResolver {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Query(() => [NotificationUnion], { nullable: true })
	@UseGuards(JwtAuthGuard)
	async notifications(@Context() context, @Args('notificationsInput') notificationsInput: GetNotificationsInput) {
		const userId = context.req.user.id;
		return this.notificationsService.getNotifications(notificationsInput.type, userId);
	}
}
