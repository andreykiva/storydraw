import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { LikesModule } from 'src/likes/likes.module';
import { FollowsModule } from 'src/follows/follows.module';
import { UserMetadataModule } from 'src/user-metadata/user-metadata.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), LikesModule, FollowsModule, UserMetadataModule],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
