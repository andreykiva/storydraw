import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/stories/entities/story.entity';
import { Drawing } from 'src/drawings/entities/drawing.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Share } from 'src/shares/entities/share.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { UserMetadata } from 'src/user-metadata/entities/user-metadata.entity';

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
	stories: Story[];

	@OneToMany(() => Like, (like) => like.user)
	likes: Like[];

	@OneToMany(() => Drawing, (drawing) => drawing.user)
	drawings: Drawing[];

	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];

	@OneToMany(() => Follow, (follow) => follow.follower)
	following: Follow[];

	@OneToMany(() => Follow, (follow) => follow.following)
	followers: Follow[];

	@OneToMany(() => Favorite, (favorite) => favorite.user)
	favorites: Favorite[];

	@OneToMany(() => Share, (share) => share.user)
	shares: Share[];

	@OneToMany(() => Notification, (notification) => notification.user, { cascade: true, onDelete: 'CASCADE' })
	notifications: Notification[];

	@OneToMany(() => Notification, (notification) => notification.initiator, { cascade: true, onDelete: 'CASCADE' })
	initiatedNotifications: Notification[];

	@OneToOne(() => UserMetadata, (metadata) => metadata.user, { cascade: true, onDelete: 'CASCADE' })
	metadata: UserMetadata;
}
