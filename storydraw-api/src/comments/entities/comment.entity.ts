import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Entity({ name: 'comments' })
@ObjectType()
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column()
	@Field()
	content: string;

	@CreateDateColumn({ name: 'created_at' })
	@Field(() => Date)
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.comments)
	@Field(() => User)
	user: User;

	@ManyToOne(() => Story, (story) => story.comments)
	@Field(() => Story)
	story: Story;

	@ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
	parentComment?: Comment;

	@ManyToOne(() => Comment, (comment) => comment.childReplies, { nullable: true, onDelete: 'SET NULL' })
	parentReply?: Comment;

	@OneToMany(() => Comment, (comment) => comment.parentComment, { cascade: true, onDelete: 'CASCADE' })
	replies: Comment[];

	@OneToMany(() => Comment, (comment) => comment.parentReply, { cascade: true, onDelete: 'CASCADE' })
	childReplies: Comment[];

	@OneToMany(() => Like, (like) => like.comment, { cascade: true, onDelete: 'CASCADE' })
	likes: Like[];
}
