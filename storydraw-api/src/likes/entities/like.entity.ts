import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { EntityType } from '../enums/entity-type.enum';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity('likes')
@ObjectType()
export class Like {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({
		type: 'enum',
		enum: EntityType,
		name: 'entity_type',
	})
	@Field()
	entityType: EntityType;

	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.likes)
	@Field(() => User)
	user: User;

	@ManyToOne(() => Story, (story) => story.likes, { nullable: true })
	@Field(() => Story, { nullable: true })
	story: Story;

	@ManyToOne(() => Comment, (comment) => comment.likes, { nullable: true, onDelete: 'CASCADE' })
	@Field(() => Comment, { nullable: true })
	comment: Comment;

	@OneToOne(() => Notification, (notification) => notification.like, { cascade: true, onDelete: 'CASCADE' })
	notification: Notification;
}
