import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

/**
 * Represents a follow relationship between users.
 *
 * This entity captures the details of a follower-following relationship,
 * including references to the follower and the followed user, along with
 * the creation timestamp and associated notifications.
 */
@Entity('follows')
@ObjectType()
export class Follow {
	/** Unique identifier for the follow relationship. */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/** Timestamp when the follow relationship was created. */
	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	/** The user who is following another user. */
	@ManyToOne(() => User, (user) => user.following)
	@Field(() => User)
	follower: User;

	/** The user who is being followed. */
	@ManyToOne(() => User, (user) => user.followers)
	@Field(() => User)
	following: User;

	/** Optional notification associated with this follow relationship. */
	@OneToOne(() => Notification, (notification) => notification.follow, { cascade: true, onDelete: 'CASCADE' })
	@Field(() => Notification, { nullable: true })
	notification?: Notification;
}
