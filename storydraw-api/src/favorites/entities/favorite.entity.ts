import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';

/**
 * Represents a user's favorite story.
 * This entity tracks the relationship between a user and a story that has been marked as a favorite.
 */
@Entity('favorites')
@ObjectType()
export class Favorite {
	/**
	 * Unique identifier for the Favorite record.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/**
	 * Timestamp of when the favorite was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	/**
	 * The user who marked the story as favorite.
	 * Establishes a many-to-one relationship with the User entity.
	 */
	@ManyToOne(() => User, (user) => user.favorites)
	@Field(() => User)
	user: User;

	/**
	 * The story that has been marked as favorite by the user.
	 * Establishes a many-to-one relationship with the Story entity.
	 */
	@ManyToOne(() => Story, (story) => story.favorites)
	@Field(() => Story)
	story: Story;
}
