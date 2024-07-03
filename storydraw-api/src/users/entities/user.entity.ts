import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Column({ unique: true })
	@Field()
	username: string;

	@Column({ name: 'display_name' })
	@Field()
	displayName: string;

	@Column({ default: '' })
	@Field()
	bio: string;

	@Column({ name: 'image_url', nullable: true })
	@Field({ nullable: true })
	imageUrl?: string;

	@Column({ nullable: true, unique: true })
	email?: string;

	@Column({ nullable: true, unique: true })
	phone?: string;

	@Column({ nullable: true })
	password?: string;

	@Column({ name: 'date_of_birth', type: 'date' })
	dateOfBirth: Date;

	@Column({ name: 'receive_email_updates', default: false })
	receiveEmailUpdates: boolean;
}
