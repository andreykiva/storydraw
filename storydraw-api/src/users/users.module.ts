import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { UsernameService } from './services/username.service';
import { LikesModule } from 'src/likes/likes.module';
import { FollowsModule } from 'src/follows/follows.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), LikesModule, FollowsModule],
	providers: [UsersResolver, UsersService, UsernameService],
	exports: [UsersService],
})
export class UsersModule {}
