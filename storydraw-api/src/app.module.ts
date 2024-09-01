import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import * as depthLimit from 'graphql-depth-limit';
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

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getOrmConfig,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'src/schema.gql',
			validationRules: [depthLimit(4)],
			fieldResolverEnhancers: ['guards'],
		}),
		ScheduleModule.forRoot(),
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
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
