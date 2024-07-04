import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => [User], { name: 'users' })
	@UseGuards(JwtAuthGuard)
	findAll() {
		return this.usersService.findAll();
	}

	@Query(() => User, { name: 'user' })
	findOne(@Args('username') username: string) {
		return this.usersService.findOneByUsername(username);
	}
}
