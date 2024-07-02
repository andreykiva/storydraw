import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column({ default: 'testuser' })
	@Field()
	username: string;

	@Column({ default: 'test bio' })
	@Field()
	displayName: string;

	@Column({ default: '' })
	@Field()
	bio: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	image?: string;

	@Column({ nullable: true, unique: true })
	email?: string;

	@Column({ nullable: true, unique: true })
	phoneNumber?: string;

	@Column({ nullable: true })
	password?: string;

	@Column({ type: 'date' })
	dateOfBirth: Date;

	@Column({ default: false })
	receiveEmailUpdates: boolean;
}
