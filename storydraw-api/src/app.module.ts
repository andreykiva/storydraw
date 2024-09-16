import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import { getOrmConfig } from './configs/orm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VerificationsModule } from './verifications/verifications.module';
import { StoriesModule } from './stories/stories.module';
import { LikesModule } from './likes/likes.module';
import { DrawingsModule } from './drawings/drawings.module';
import { CommentsModule } from './comments/comments.module';
import { FollowsModule } from './follows/follows.module';
import { FavoritesModule } from './favorites/favorites.module';
import { SharesModule } from './shares/shares.module';
import { CommonModule } from './common/common.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserMetadataModule } from './user-metadata/user-metadata.module';
import { graphqlConfig } from './configs/graphql.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getOrmConfig,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
		ScheduleModule.forRoot(),
		EventEmitterModule.forRoot(),
		UsersModule,
		AuthModule,
		VerificationsModule,
		StoriesModule,
		DrawingsModule,
		FollowsModule,
		CommentsModule,
		LikesModule,
		FavoritesModule,
		SharesModule,
		CommonModule,
		NotificationsModule,
		UserMetadataModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
