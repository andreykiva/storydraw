import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { Like } from 'src/likes/entities/like.entity';

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

	@Column({ default: false })
	@Field()
	isRead: boolean;

	@ManyToOne(() => User, (user) => user.notifications)
	@Field(() => User)
	user: User;

	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	@ManyToOne(() => Like, (like) => like.notifications, { nullable: true })
	@Field(() => Like, { nullable: true })
	like: Like;

	// @ManyToOne(() => Comment, (comment) => comment.notifications, { nullable: true })
	// @Field(() => Comment, { nullable: true })
	// comment: Comment;

	// @ManyToOne(() => Follow, (follow) => follow.notifications, { nullable: true })
	// @Field(() => Follow, { nullable: true })
	// follow: Follow;
}
