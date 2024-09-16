import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { Like } from 'src/likes/entities/like.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Story } from 'src/stories/entities/story.entity';

@Entity('notifications')
@ObjectType()
export class Notification {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({
		type: 'enum',
		enum: NotificationType,
	})
	@Field()
	type: NotificationType;

	@ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
	@Field(() => User)
	user: User;

	@ManyToOne(() => User, (user) => user.initiatedNotifications, { onDelete: 'CASCADE' })
	@Field(() => User, { nullable: true })
	initiator: User;

	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	@ManyToOne(() => Story, (story) => story.notifications, { nullable: true, onDelete: 'CASCADE' })
	@Field(() => Story, { nullable: true })
	story: Story;

	@OneToOne(() => Like, (like) => like.notification, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	@Field(() => Like, { nullable: true })
	like: Like;

	@ManyToOne(() => Comment, (comment) => comment.notifications, { nullable: true, onDelete: 'CASCADE' })
	@Field(() => Comment, { nullable: true })
	comment: Comment;

	@OneToOne(() => Follow, (follow) => follow.notification, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	@Field(() => Follow, { nullable: true })
	follow: Follow;
}
