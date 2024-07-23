import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { ConflictException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindOneByUsernameInput } from './dto/find-user.input';
import { UpdateUsernameInput } from './dto/update-user.input';
import { CheckUserExistsResponse } from './dto/user-response';
import { USERNAME_EXISTS_ERROR } from './constants/users.constants';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => [User], { name: 'users' })
	@UseGuards(JwtAuthGuard)
	findAll() {
		return this.usersService.findAll();
	}

	@Query(() => User || null)
	findOneByUsername(@Args('usernameInput') usernameInput: FindOneByUsernameInput) {
		return this.usersService.findOneByUsername(usernameInput.username);
	}

	@Mutation(() => User)
	@UseGuards(JwtAuthGuard)
	async updateUsername(@Context() context, @Args('usernameInput') usernameInput: UpdateUsernameInput) {
		const user = context.req.user;

		const findedUser = await this.usersService.findOneByUsername(usernameInput.username);

		if (findedUser) {
			throw new ConflictException({ username: USERNAME_EXISTS_ERROR });
		}

		return this.usersService.updateUsername(user, usernameInput.username);
	}

	@Query(() => User)
	@UseGuards(JwtAuthGuard)
	getMe(@Context() context) {
		return context.req.user;
	}

	@Query(() => CheckUserExistsResponse)
	async ensureUsernameNotExists(@Args('usernameInput') usernameInput: FindOneByUsernameInput) {
		const user = await this.usersService.findOneByUsername(usernameInput.username);

		if (user) {
			throw new ConflictException({ username: USERNAME_EXISTS_ERROR });
		}

		return { exists: false };
	}
}
