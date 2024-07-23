import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/stories/entities/story.entity';
import { Drawing } from 'src/drawings/entities/drawing.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

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

	@Column({ name: 'date_of_birth', type: 'date', nullable: true })
	dateOfBirth?: Date;

	@Column({ name: 'receive_email_updates', default: false })
	receiveEmailUpdates: boolean;

	@OneToMany(() => Story, (story) => story.user)
	@Field(() => [Story])
	stories: Story[];

	@OneToMany(() => Drawing, (drawing) => drawing.user)
	@Field(() => [Drawing])
	drawings: Drawing[];
}
