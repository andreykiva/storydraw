import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

/**
 * Entity representing a comment in the system, including its content,
 * relationships with users, stories, and other comments.
 */
@Entity({ name: 'comments' })
@ObjectType()
export class Comment {
	/**
	 * Unique identifier for the comment, generated automatically.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/**
	 * Content of the comment.
	 */
	@Column()
	@Field()
	content: string;

	/**
	 * Timestamp of when the comment was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	@Field(() => Date)
	createdAt: Date;

	/**
	 * User who made the comment.
	 */
	@ManyToOne(() => User, (user) => user.comments)
	@Field(() => User)
	user: User;

	/**
	 * Story to which the comment is associated.
	 */
	@ManyToOne(() => Story, (story) => story.comments)
	@Field(() => Story)
	story: Story;

	/**
	 * Parent comment if this comment is a reply to another comment.
	 */
	@ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
	parentComment?: Comment;

	/**
	 * Parent reply if this comment is a reply to another reply.
	 */
	@ManyToOne(() => Comment, (comment) => comment.childReplies, { nullable: true, onDelete: 'SET NULL' })
	parentReply?: Comment;

	/**
	 * Replies to this comment.
	 */
	@OneToMany(() => Comment, (comment) => comment.parentComment, { cascade: true, onDelete: 'CASCADE' })
	replies: Comment[];

	/**
	 * Child replies to this comment.
	 */
	@OneToMany(() => Comment, (comment) => comment.parentReply, { cascade: true, onDelete: 'CASCADE' })
	childReplies: Comment[];

	/**
	 * Likes given to this comment.
	 */
	@OneToMany(() => Like, (like) => like.comment, { cascade: true, onDelete: 'CASCADE' })
	likes: Like[];

	/**
	 * Notifications related to this comment.
	 */
	@OneToMany(() => Notification, (notification) => notification.comment, { cascade: true, onDelete: 'CASCADE' })
	notifications: Notification[];
}
