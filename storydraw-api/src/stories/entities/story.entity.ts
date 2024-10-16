import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Drawing } from 'src/drawings/entities/drawing.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Share } from 'src/shares/entities/share.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

/**
 * Represents a story entity in the system.
 */
@Entity({ name: 'stories' })
@ObjectType()
export class Story {
	/** Unique identifier for the story */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/** Optional ID linking to a music track associated with the story */
	@Column({ name: 'music_id', nullable: true })
	@Field({ nullable: true })
	musicId?: string;

	/** Title of the story */
	@Column({ default: '' })
	@Field()
	title: string;

	/** Brief description of the story */
	@Column({ default: '' })
	@Field()
	description: string;

	/** Date and time when the story was created */
	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	/** User who authored the story */
	@ManyToOne(() => User, (user) => user.stories)
	@Field(() => User)
	user: User;

	/** List of drawings associated with the story */
	@OneToMany(() => Drawing, (drawing) => drawing.story)
	drawings: Drawing[];

	/** List of likes associated with the story */
	@OneToMany(() => Like, (like) => like.story)
	likes: Like[];

	/** List of comments associated with the story */
	@OneToMany(() => Comment, (comment) => comment.story)
	comments: Comment[];

	/** List of favorites associated with the story */
	@OneToMany(() => Favorite, (favorite) => favorite.story)
	favorites: Favorite[];

	/** List of shares associated with the story */
	@OneToMany(() => Share, (share) => share.story)
	shares: Share[];

	/** List of notifications related to the story */
	@OneToMany(() => Notification, (notification) => notification.story, { cascade: true, onDelete: 'CASCADE' })
	notifications: Notification[];
}
