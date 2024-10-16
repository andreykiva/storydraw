import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Represents a drawing associated with a user and a story.
 */
@Entity({ name: 'drawings' })
@ObjectType()
export class Drawing {
	/**
	 * Unique identifier for the Drawing record.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/**
	 * URL of the image associated with the drawing.
	 */
	@Column({ name: 'image_url' })
	@Field()
	imageUrl: string;

	/**
	 * Timestamp of when the Drawing record was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	/**
	 * The user who created the drawing.
	 * Establishes a many-to-one relationship with the User entity.
	 */
	@ManyToOne(() => User, (user) => user.drawings)
	@Field(() => User)
	user: User;

	/**
	 * The story associated with the drawing.
	 * Establishes a many-to-one relationship with the Story entity.
	 */
	@ManyToOne(() => Story, (story) => story.drawings)
	story: Story;
}
