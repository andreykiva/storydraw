import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { UsernameService } from './services/username.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersResolver, UsersService, UsernameService],
	exports: [UsersService],
})
export class UsersModule {}
