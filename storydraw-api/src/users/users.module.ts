import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { LikesModule } from 'src/likes/likes.module';
import { FollowsModule } from 'src/follows/follows.module';
import { UserMetadataModule } from 'src/user-metadata/user-metadata.module';
import { USERS_SERVICE } from 'src/common/constants/providers.constants';

@Module({
	imports: [TypeOrmModule.forFeature([User]), LikesModule, FollowsModule, UserMetadataModule],
	providers: [
		UsersResolver,
		{
			provide: USERS_SERVICE,
			useClass: UsersService,
		},
	],
	exports: [USERS_SERVICE],
})
export class UsersModule {}
