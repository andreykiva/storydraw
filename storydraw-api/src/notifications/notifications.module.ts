import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Notification } from './entities/notification.entity';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './services/notifications.service';
import { CommentCreatedListener } from './events/comment-created.listener';
import { LikeCreatedListener } from './events/like-created.listener';
import { FollowCreatedListener } from './events/follow-created.listener';
import { MentionCreatedListener } from './events/mention-created.listener';
import { StoryCreatedListener } from './events/story-created.listener';
import { StoriesModule } from 'src/stories/stories.module';
import { CommonModule } from 'src/common/common.module';
import { UserMetadataModule } from 'src/user-metadata/user-metadata.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forFeature([Notification]),
		StoriesModule,
		CommonModule,
		UserMetadataModule,
		JwtModule,
		ConfigModule,
	],
	providers: [
		NotificationsResolver,
		NotificationsService,
		CommentCreatedListener,
		LikeCreatedListener,
		FollowCreatedListener,
		MentionCreatedListener,
		StoryCreatedListener,
		{
			provide: 'PUB_SUB',
			useValue: new PubSub(),
		},
	],
	exports: [NotificationsService],
})
export class NotificationsModule {}
