import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { Like } from 'src/likes/entities/like.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Story } from 'src/stories/entities/story.entity';

/**
 * Represents a notification in the system.
 */
@Entity('notifications')
@ObjectType()
export class Notification {
	/**
	 * Unique identifier for the Notification record.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/**
	 * Type of the notification (e.g., like, comment, mention).
	 */
	@Column({
		type: 'enum',
		enum: NotificationType,
	})
	@Field()
	type: NotificationType;

	/**
	 * Timestamp of when the notification was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	/**
	 * The user who receives the notification.
	 * Establishes a many-to-one relationship with the User entity.
	 */
	@ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
	@Field(() => User)
	user: User;

	/**
	 * The user who initiated the action that triggered the notification.
	 * Establishes a many-to-one relationship with the User entity.
	 */
	@ManyToOne(() => User, (user) => user.initiatedNotifications, { onDelete: 'CASCADE' })
	@Field(() => User, { nullable: true })
	initiator: User;

	/**
	 * The story associated with the notification, if applicable.
	 * Establishes a many-to-one relationship with the Story entity.
	 */
	@ManyToOne(() => Story, (story) => story.notifications, { nullable: true, onDelete: 'CASCADE' })
	@Field(() => Story, { nullable: true })
	story: Story;

	/**
	 * The like associated with the notification, if applicable.
	 * Establishes a one-to-one relationship with the Like entity.
	 */
	@OneToOne(() => Like, (like) => like.notification, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	@Field(() => Like, { nullable: true })
	like: Like;

	/**
	 * The comment associated with the notification, if applicable.
	 * Establishes a many-to-one relationship with the Comment entity.
	 */
	@ManyToOne(() => Comment, (comment) => comment.notifications, { nullable: true, onDelete: 'CASCADE' })
	@Field(() => Comment, { nullable: true })
	comment: Comment;

	/**
	 * The follow action associated with the notification, if applicable.
	 * Establishes a one-to-one relationship with the Follow entity.
	 */
	@OneToOne(() => Follow, (follow) => follow.notification, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	@Field(() => Follow, { nullable: true })
	follow: Follow;
}
