import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';

/**
 * Represents a share action for a story by a user.
 * Contains information about the user who shared the story and the story itself.
 */
@Entity('shares')
@ObjectType()
export class Share {
	/**
	 * Unique identifier for the Share record.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/**
	 * Timestamp of when the share record was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	/**
	 * The user who shared the story.
	 * This establishes a many-to-one relationship with the User entity.
	 */
	@ManyToOne(() => User, (user) => user.shares)
	@Field(() => User)
	user: User;

	/**
	 * The story that has been shared.
	 * This establishes a many-to-one relationship with the Story entity.
	 */
	@ManyToOne(() => Story, (story) => story.shares)
	@Field(() => Story)
	story: Story;
}
