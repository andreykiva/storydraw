import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/stories/entities/story.entity';
import { Drawing } from 'src/drawings/entities/drawing.entity';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Share } from 'src/shares/entities/share.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { UserMetadata } from 'src/user-metadata/entities/user-metadata.entity';

/**
 * Entity representing a user in the system, including personal details and relationships with other entities.
 */
@Entity({ name: 'users' })
@ObjectType()
export class User {
	/**
	 * Unique identifier for the user, generated automatically.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/**
	 * Unique username for the user.
	 */
	@Column({ unique: true })
	@Field()
	username: string;

	/**
	 * Display name of the user.
	 */
	@Column({ name: 'display_name' })
	@Field()
	displayName: string;

	/**
	 * Short biography of the user.
	 */
	@Column({ default: '' })
	@Field()
	bio: string;

	/**
	 * URL of the user's profile image.
	 */
	@Column({ name: 'image_url', nullable: true })
	@Field({ nullable: true })
	imageUrl?: string;

	/**
	 * User's email address, unique if provided.
	 */
	@Column({ nullable: true, unique: true })
	email?: string;

	/**
	 * User's phone number, unique if provided.
	 */
	@Column({ nullable: true, unique: true })
	phone?: string;

	/**
	 * User's hashed password.
	 */
	@Column({ nullable: true })
	password?: string;

	/**
	 * User's date of birth.
	 */
	@Column({ name: 'date_of_birth', type: 'date', nullable: true })
	dateOfBirth?: Date;

	/**
	 * Flag indicating if the user wants to receive email updates.
	 */
	@Column({ name: 'receive_email_updates', default: false })
	receiveEmailUpdates: boolean;

	/**
	 * Timestamp of when the user was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	/**
	 * Stories created by the user.
	 */
	@OneToMany(() => Story, (story) => story.user)
	stories: Story[];

	/**
	 * Likes given by the user.
	 */
	@OneToMany(() => Like, (like) => like.user)
	likes: Like[];

	/**
	 * Drawings created by the user.
	 */
	@OneToMany(() => Drawing, (drawing) => drawing.user)
	drawings: Drawing[];

	/**
	 * Comments made by the user.
	 */
	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];

	/**
	 * Follows initiated by the user.
	 */
	@OneToMany(() => Follow, (follow) => follow.follower)
	following: Follow[];

	/**
	 * Followers of the user.
	 */
	@OneToMany(() => Follow, (follow) => follow.following)
	followers: Follow[];

	/**
	 * Favorites added by the user.
	 */
	@OneToMany(() => Favorite, (favorite) => favorite.user)
	favorites: Favorite[];

	/**
	 * Shares made by the user.
	 */
	@OneToMany(() => Share, (share) => share.user)
	shares: Share[];

	/**
	 * Notifications related to the user.
	 */
	@OneToMany(() => Notification, (notification) => notification.user, { cascade: true, onDelete: 'CASCADE' })
	notifications: Notification[];

	/**
	 * Notifications initiated by the user.
	 */
	@OneToMany(() => Notification, (notification) => notification.initiator, { cascade: true, onDelete: 'CASCADE' })
	initiatedNotifications: Notification[];

	/**
	 * Metadata associated with the user.
	 */
	@OneToOne(() => UserMetadata, (metadata) => metadata.user, { cascade: true, onDelete: 'CASCADE' })
	metadata: UserMetadata;
}
