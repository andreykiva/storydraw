import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
	@Field({ nullable: true })
	username?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	phone?: string;

	@Field({ nullable: true })
	password?: string;

	@Field({ nullable: true })
	dateOfBirth?: Date;

	@Field({ nullable: true })
	receiveEmailUpdates?: boolean;
}
