import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Drawing } from 'src/drawings/entities/drawing.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Share } from 'src/shares/entities/share.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity({ name: 'stories' })
@ObjectType()
export class Story {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({ name: 'music_id', nullable: true })
	@Field({ nullable: true })
	musicId?: string;

	@Column({ default: '' })
	@Field()
	title: string;

	@Column({ default: '' })
	@Field()
	description: string;

	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.stories)
	@Field(() => User)
	user: User;

	@OneToMany(() => Drawing, (drawing) => drawing.story)
	drawings: Drawing[];

	@OneToMany(() => Like, (like) => like.story)
	likes: Like[];

	@OneToMany(() => Comment, (comment) => comment.story)
	comments: Comment[];

	@OneToMany(() => Favorite, (favorite) => favorite.story)
	favorites: Favorite[];

	@OneToMany(() => Share, (share) => share.story)
	shares: Share[];

	@OneToMany(() => Notification, (notification) => notification.story, { cascade: true, onDelete: 'CASCADE' })
	notifications: Notification[];
}
