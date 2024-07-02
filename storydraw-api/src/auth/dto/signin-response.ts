import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class SigninResponse {
	@Field()
	access_token: string;

	@Field(() => User)
	user: User;
}
