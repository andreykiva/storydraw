import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { EntityType } from '../enums/entity-type.enum';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

/**
 * Entity representing a like in the system.
 */
@Entity('likes')
@ObjectType()
export class Like {
	/** Unique identifier for the like. */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/** Type of the entity being liked (story, comment, etc.). */
	@Column({
		type: 'enum',
		enum: EntityType,
		name: 'entity_type',
	})
	@Field()
	entityType: EntityType;

	/** Date when the like was created. */
	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	/** User who created the like. */
	@ManyToOne(() => User, (user) => user.likes)
	@Field(() => User)
	user: User;

	/** Story associated with the like, if applicable. */
	@ManyToOne(() => Story, (story) => story.likes, { nullable: true })
	@Field(() => Story, { nullable: true })
	story: Story;

	/** Comment associated with the like, if applicable. */
	@ManyToOne(() => Comment, (comment) => comment.likes, { nullable: true, onDelete: 'CASCADE' })
	@Field(() => Comment, { nullable: true })
	comment: Comment;

	/** Notification generated for the like, if applicable. */
	@OneToOne(() => Notification, (notification) => notification.like, { cascade: true, onDelete: 'CASCADE' })
	notification: Notification;
}
